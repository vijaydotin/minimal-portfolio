"use client";

import { useRef, useEffect, useState, Suspense, memo, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

/* ═══════════════════════════════════════════════════
   Constants
   ═══════════════════════════════════════════════════ */

const MODEL_PATH = "/models/macbook.glb";

const ANIM = {
  floatSpeed: 0.8,
  floatAmp: 0.12,
  autoRotSpeed: 0.2,
  autoRotAmp: 0.06,
  wobbleSpeed: 0.4,
  wobbleAmp: 0.008,
  mouseMax: 0.12,
  mouseDamp: 3,
  floatDamp: 4,
  scrollDamp: 4,
  scrollTiltX: 0.4,
  scrollPosY: -0.8,
  scrollPosZ: -1.5,
  scrollRotY: 0.3,
  scrollScaleMin: 0.85,
  baseRotX: -0.15,
  baseRotY: 0.3,
} as const;

/* ═══════════════════════════════════════════════════
   MacBook Pro Model
   ═══════════════════════════════════════════════════ */

function MacBookModel({
  mouse,
  scroll,
}: {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
  scroll: React.MutableRefObject<number>;
}) {
  const { scene } = useGLTF(MODEL_PATH);
  const groupRef = useRef<THREE.Group>(null!);
  const modelRef = useRef<THREE.Group>(null!);
  const time = useRef(0);
  const { viewport } = useThree();
  const isMobile = viewport.width < 6;

  // Clone scene safely
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  // Optimize all meshes — downgrade to cheaper MeshStandardMaterial
  useEffect(() => {
    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.frustumCulled = true;
        mesh.matrixAutoUpdate = false;
        mesh.updateMatrix();

        // Downgrade MeshPhysicalMaterial → MeshStandardMaterial (much cheaper)
        if (mesh.material && (mesh.material as any).isMeshPhysicalMaterial) {
          const old = mesh.material as THREE.MeshPhysicalMaterial;
          const cheap = new THREE.MeshStandardMaterial({
            map: old.map,
            normalMap: old.normalMap,
            roughnessMap: old.roughnessMap,
            metalnessMap: old.metalnessMap,
            emissiveMap: old.emissiveMap,
            emissive: old.emissive,
            emissiveIntensity: old.emissiveIntensity,
            color: old.color,
            metalness: old.metalness,
            roughness: old.roughness,
            side: old.side,
            transparent: old.transparent,
            opacity: old.opacity,
          });
          old.dispose();
          mesh.material = cheap;
        }
      }
    });
  }, [clonedScene]);

  // Center and scale
  useEffect(() => {
    if (!modelRef.current) return;

    const box = new THREE.Box3().setFromObject(modelRef.current);
    const size = new THREE.Vector3();
    box.getSize(size);

    const maxDim = Math.max(size.x, size.y, size.z);
    const targetSize = isMobile ? 1.8 : 2.5;
    modelRef.current.scale.setScalar(targetSize / maxDim);

    const scaledBox = new THREE.Box3().setFromObject(modelRef.current);
    const scaledCenter = new THREE.Vector3();
    scaledBox.getCenter(scaledCenter);
    modelRef.current.position.sub(scaledCenter);
    modelRef.current.updateMatrix();
  }, [clonedScene, isMobile]);

  // Smooth state
  const smooth = useRef({ rotX: 0, rotY: 0, posY: 0, scroll: 0 });

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const dt = Math.min(delta, 0.1);
    time.current += dt;
    const t = time.current;
    const s = smooth.current;

    // Smooth scroll
    s.scroll = THREE.MathUtils.damp(s.scroll, scroll.current, ANIM.scrollDamp, dt);

    // Idle animations
    const floatY = Math.sin(t * ANIM.floatSpeed) * ANIM.floatAmp;
    const autoRotY = Math.sin(t * ANIM.autoRotSpeed) * ANIM.autoRotAmp;
    const wobbleZ = Math.sin(t * ANIM.wobbleSpeed) * ANIM.wobbleAmp;

    // Mouse parallax
    const mx = isMobile ? 0 : mouse.current.x;
    const my = isMobile ? 0 : mouse.current.y;

    s.rotX = THREE.MathUtils.damp(s.rotX, my * ANIM.mouseMax * -0.5, ANIM.mouseDamp, dt);
    s.rotY = THREE.MathUtils.damp(s.rotY, mx * ANIM.mouseMax, ANIM.mouseDamp, dt);
    s.posY = THREE.MathUtils.damp(s.posY, floatY, ANIM.floatDamp, dt);

    // Scroll effects
    const sc = s.scroll;
    const scrollScale = 1 - sc * (1 - ANIM.scrollScaleMin);

    // Apply transforms
    const g = groupRef.current;
    g.position.y = s.posY + sc * ANIM.scrollPosY;
    g.position.z = sc * ANIM.scrollPosZ;
    g.rotation.x = ANIM.baseRotX + s.rotX + sc * ANIM.scrollTiltX;
    g.rotation.y = ANIM.baseRotY + autoRotY + s.rotY + sc * ANIM.scrollRotY;
    g.rotation.z = wobbleZ;
    g.scale.setScalar(scrollScale);
  });

  return (
    <group ref={groupRef}>
      <group ref={modelRef}>
        <primitive object={clonedScene} />
      </group>
    </group>
  );
}

/* ═══════════════════════════════════════════════════
   Lighting — Minimal (2 lights only)
   ═══════════════════════════════════════════════════ */

const MinimalLighting = memo(function MinimalLighting() {
  return (
    <>
      {/* Single hemisphere light replaces ambient + multiple fills */}
      <hemisphereLight color="#ffffff" groundColor="#d0d0d8" intensity={1.2} />

      {/* One key directional for definition */}
      <directionalLight position={[4, 6, 5]} intensity={0.9} />
    </>
  );
});

/* ═══════════════════════════════════════════════════
   Loading Fallback
   ═══════════════════════════════════════════════════ */

const LoadingFallback = memo(function LoadingFallback() {
  const meshRef = useRef<THREE.Mesh>(null!);
  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.5;
  });
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1.5, 0.08, 1]} />
      <meshBasicMaterial color="#d4d4d8" transparent opacity={0.3} />
    </mesh>
  );
});

/* ═══════════════════════════════════════════════════
   Scene
   ═══════════════════════════════════════════════════ */

const HeroScene = memo(function HeroScene({
  mouse,
  scroll,
}: {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
  scroll: React.MutableRefObject<number>;
}) {
  return (
    <>
      <MinimalLighting />
      <Suspense fallback={<LoadingFallback />}>
        <MacBookModel mouse={mouse} scroll={scroll} />
      </Suspense>
    </>
  );
});

/* ═══════════════════════════════════════════════════
   Mobile Fallback — Pure CSS MacBook (zero GPU cost)
   ═══════════════════════════════════════════════════ */

function MobileMacBook() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div
        className="relative"
        style={{ animation: "macFloat 4s ease-in-out infinite" }}
      >
        {/* Screen / Lid */}
        <div
          className="relative w-[220px] h-[145px] rounded-t-lg overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #c8c8d0 0%, #a8a8b4 100%)",
            boxShadow: "0 -1px 4px rgba(0,0,0,0.06)",
            transform: "perspective(600px) rotateX(2deg)",
          }}
        >
          {/* Bezel */}
          <div className="absolute inset-[6px] rounded-[4px] overflow-hidden bg-[#1a1a2e]">
            {/* Screen content */}
            <div className="w-full h-full p-2 font-mono text-[6px] leading-[1.6] text-emerald-400/70">
              <span className="text-purple-400/80">import</span>{" "}
              <span className="text-blue-400/80">{"{ motion }"}</span>{" "}
              <span className="text-purple-400/80">from</span>{" "}
              <span className="text-green-400/80">{'"framer-motion"'}</span>
              <br />
              <br />
              <span className="text-purple-400/80">export default</span>{" "}
              <span className="text-blue-400/80">function</span>{" "}
              <span className="text-yellow-400/80">Hero</span>
              <span className="text-neutral-400">{"() {"}</span>
              <br />
              {"  "}
              <span className="text-purple-400/80">return</span>{" "}
              <span className="text-neutral-400">(</span>
              <br />
              {"    "}
              <span className="text-blue-400/80">{"<section>"}</span>
              <br />
              {"      "}
              <span className="text-blue-400/80">{"<h1>"}</span>
              <span className="text-neutral-300">Hello, Vijay</span>
              <span className="text-blue-400/80">{"</h1>"}</span>
              <br />
              {"    "}
              <span className="text-blue-400/80">{"</section>"}</span>
              <br />
              {"  "}
              <span className="text-neutral-400">)</span>
              <br />
              <span className="text-neutral-400">{"}"}</span>
            </div>
            {/* Camera notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-[5px] bg-[#0a0a0c] rounded-b-md" />
          </div>
        </div>

        {/* Hinge */}
        <div
          className="w-[228px] h-[5px] mx-auto rounded-b-sm"
          style={{
            background: "linear-gradient(to bottom, #b0b0b8, #9a9aa2)",
            marginLeft: "-4px",
          }}
        />

        {/* Base / Keyboard body */}
        <div
          className="w-[240px] h-[8px] mx-auto rounded-b-lg"
          style={{
            background: "linear-gradient(to bottom, #c0c0c8, #b0b0b8)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.06)",
            marginLeft: "-10px",
          }}
        />

        {/* Base edge lip */}
        <div
          className="w-[250px] h-[3px] mx-auto rounded-b-xl"
          style={{
            background: "linear-gradient(to bottom, #b8b8c0, #a8a8b0)",
            marginLeft: "-15px",
          }}
        />

      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   Container
   ═══════════════════════════════════════════════════ */

export default function HeroVisual3D() {
  const mouse = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Detect mobile (< 768px)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  // Scroll tracking (rAF-throttled, desktop only)
  useEffect(() => {
    if (isMobile) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        scroll.current = Math.min(window.scrollY / window.innerHeight, 1);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile]);

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window);
  }, []);

  // Mouse tracking (rAF-throttled, desktop only)
  useEffect(() => {
    if (isTouchDevice || isMobile) return;
    let ticking = false;
    const onMove = (e: MouseEvent) => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
        mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
        ticking = false;
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [isTouchDevice, isMobile]);

  // Pause 3D when off-screen (desktop only)
  useEffect(() => {
    if (isMobile || !containerRef.current) return;
    const obs = new IntersectionObserver(
      ([e]) => setIsVisible(e.isIntersecting),
      { threshold: 0.05 }
    );
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, [isMobile]);

  // Reduced motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // ── Reduced motion fallback ──
  if (reducedMotion) {
    return (
      <div ref={containerRef} className="w-full h-full flex items-center justify-center">
        <div className="w-48 h-32 md:w-64 md:h-44 rounded-xl bg-gradient-to-br from-neutral-200 to-neutral-300/60 border border-neutral-200/40 shadow-lg" />
      </div>
    );
  }

  // ── Mobile: pure CSS MacBook (no WebGL) ──
  if (isMobile) {
    return (
      <div ref={containerRef} className="w-full h-full">
        <MobileMacBook />
      </div>
    );
  }

  // ── Desktop: full 3D Canvas ──
  return (
    <div ref={containerRef} className="w-full h-full">
      {isVisible && (
        <Canvas
          camera={{ position: [0, 0.8, 4.5], fov: 32 }}
          frameloop="always"
          dpr={[1, 1.5]}
          gl={{
            antialias: false,
            alpha: true,
            powerPreference: "high-performance",
            toneMapping: THREE.NoToneMapping,
          }}
          style={{ background: "transparent" }}
          flat
        >
          <HeroScene mouse={mouse} scroll={scroll} />
        </Canvas>
      )}
    </div>
  );
}

useGLTF.preload(MODEL_PATH);
