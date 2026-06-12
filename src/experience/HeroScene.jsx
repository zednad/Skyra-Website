// ─────────────────────────────────────────────────────────────────────────────
//  HeroScene — the Three.js "dawn" behind the hero.
//  A GPU particle field ripples like an energy grid while the SkyRa sun sits
//  on the horizon and climbs as you scroll. The camera drifts gently toward
//  the pointer. Everything is shader-driven points + one glow plane, so it
//  stays cheap on mobile (reduced particle count, capped DPR).
//  Callers must not mount this under prefers-reduced-motion or without WebGL —
//  use `supportsWebGL()` and render the static gradient fallback instead.
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { seededRandom } from './webgl'

/* Scroll progress through the first viewport, eased — drives the sunrise. */
function scrollEase() {
  const p = Math.min(1, Math.max(0, window.scrollY / window.innerHeight))
  return 1 - Math.pow(1 - p, 2)
}

/* ── Rippling energy field ────────────────────────────────────────────────── */
const FIELD_VERT = /* glsl */ `
  uniform float uTime;
  uniform float uLift;
  uniform float uPx;
  attribute float aRand;
  varying float vH;
  varying float vA;
  void main () {
    vec3 p = position;
    float t = uTime * 0.55;
    float wave =
        sin(p.x * 0.42 + t)       * cos(p.z * 0.32 + t * 0.7) * 0.5
      + sin(p.x * 0.16 - t * 0.6) * 0.4
      + sin(p.z * 0.50 + t * 1.1) * 0.22;
    p.y += wave * (1.0 + uLift * 0.7);
    vH = wave;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (1.4 + aRand * 2.4) * uPx * (16.0 / -mv.z);
    float depthFade = smoothstep(46.0, 9.0, -mv.z);
    float edgeFade  = 1.0 - smoothstep(13.0, 23.0, abs(p.x));
    vA = depthFade * edgeFade * (0.35 + aRand * 0.65);
  }
`
const FIELD_FRAG = /* glsl */ `
  varying float vH;
  varying float vA;
  void main () {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.05, d);
    vec3 col = mix(vec3(0.04, 0.32, 0.58), vec3(0.49, 0.83, 0.99), smoothstep(-0.7, 0.9, vH));
    col = mix(col, vec3(0.98, 0.75, 0.22), smoothstep(0.55, 1.3, vH));
    gl_FragColor = vec4(col, a * vA);
  }
`

function EnergyField({ mobile }) {
  const mat = useRef()
  const { positions, rands } = useMemo(() => {
    const cols = mobile ? 110 : 170
    const rows = mobile ? 46 : 66
    const width = 46
    const depth = 30
    const positions = new Float32Array(cols * rows * 3)
    const rands = new Float32Array(cols * rows)
    const rand = seededRandom(7)
    let i = 0
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        positions[i * 3 + 0] = (c / (cols - 1) - 0.5) * width
        positions[i * 3 + 1] = 0
        positions[i * 3 + 2] = 3 - (r / (rows - 1)) * depth
        rands[i] = rand()
        i++
      }
    }
    return { positions, rands }
  }, [mobile])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uLift: { value: 0 },
      uPx: { value: Math.min(window.devicePixelRatio, 1.75) },
    }),
    [],
  )

  useFrame((state) => {
    if (!mat.current) return
    mat.current.uniforms.uTime.value = state.clock.elapsedTime
    mat.current.uniforms.uLift.value = scrollEase()
  })

  return (
    <points position={[0, -1.7, 0]} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aRand" args={[rands, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={mat}
        vertexShader={FIELD_VERT}
        fragmentShader={FIELD_FRAG}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/* ── Rising sun — radial glow plane on the horizon ────────────────────────── */
const SUN_FRAG = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;
  void main () {
    float d = length(vUv - 0.5) * 2.0;
    float pulse = 1.0 + sin(uTime * 0.8) * 0.03;
    float core = smoothstep(0.30 * pulse, 0.0, d);
    float glow = exp(-d * 2.4) * 0.85;
    vec3 col = vec3(0.99, 0.78, 0.26) * glow + vec3(1.0, 0.93, 0.62) * core;
    gl_FragColor = vec4(col, clamp(glow + core, 0.0, 1.0));
  }
`
const SUN_VERT = /* glsl */ `
  varying vec2 vUv;
  void main () {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

function Sun() {
  const mesh = useRef()
  const mat = useRef()
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), [])
  useFrame((state) => {
    if (!mesh.current) return
    mat.current.uniforms.uTime.value = state.clock.elapsedTime
    // Dawn: the sun climbs from the horizon as the visitor scrolls.
    mesh.current.position.y = THREE.MathUtils.lerp(-1.2, 5.5, scrollEase())
  })
  return (
    <mesh ref={mesh} position={[0, -1.2, -30]}>
      <planeGeometry args={[30, 30]} />
      <shaderMaterial
        ref={mat}
        vertexShader={SUN_VERT}
        fragmentShader={SUN_FRAG}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

/* ── Twinkling stars in the upper sky ─────────────────────────────────────── */
const STAR_VERT = /* glsl */ `
  uniform float uTime;
  uniform float uPx;
  attribute float aPhase;
  varying float vA;
  void main () {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (1.0 + fract(aPhase * 7.31) * 1.6) * uPx;
    vA = 0.25 + 0.75 * (0.5 + 0.5 * sin(uTime * (0.6 + fract(aPhase * 3.7)) + aPhase * 40.0));
  }
`
const STAR_FRAG = /* glsl */ `
  varying float vA;
  void main () {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.1, d);
    gl_FragColor = vec4(vec3(0.85, 0.93, 1.0), a * vA * 0.8);
  }
`

function Stars({ mobile }) {
  const mat = useRef()
  const { positions, phases } = useMemo(() => {
    const n = mobile ? 180 : 320
    const positions = new Float32Array(n * 3)
    const phases = new Float32Array(n)
    const rand = seededRandom(42)
    for (let i = 0; i < n; i++) {
      positions[i * 3 + 0] = (rand() - 0.5) * 70
      positions[i * 3 + 1] = 2 + rand() * 18
      positions[i * 3 + 2] = -18 - rand() * 26
      phases[i] = rand()
    }
    return { positions, phases }
  }, [mobile])
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPx: { value: Math.min(window.devicePixelRatio, 1.75) },
    }),
    [],
  )
  useFrame((state) => {
    if (mat.current) mat.current.uniforms.uTime.value = state.clock.elapsedTime
  })
  return (
    <points frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aPhase" args={[phases, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={mat}
        vertexShader={STAR_VERT}
        fragmentShader={STAR_FRAG}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/* ── Camera rig — gentle pointer parallax ─────────────────────────────────── */
function Rig() {
  const target = useRef({ x: 0, y: 0 })
  useEffect(() => {
    const onMove = (e) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1
      target.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])
  useFrame((state, dt) => {
    const cam = state.camera
    const k = Math.min(1, dt * 2.2)
    cam.position.x += (target.current.x * 0.8 - cam.position.x) * k
    cam.position.y += (2.4 - target.current.y * 0.4 - cam.position.y) * k
    cam.lookAt(0, 1.0, -16)
  })
  return null
}

export default function HeroScene() {
  const mobile = window.innerWidth < 768
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ fov: 55, position: [0, 2.4, 9], near: 0.1, far: 90 }}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0 }}
      aria-hidden="true"
    >
      <Rig />
      <Stars mobile={mobile} />
      <Sun />
      <EnergyField mobile={mobile} />
    </Canvas>
  )
}
