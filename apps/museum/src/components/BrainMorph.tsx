import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// Scale morph: crossfade the three real brain meshes fly -> mouse -> human,
// each framed to fill the view so you read its shape, while a "true scale"
// strip and the size/neuron labels carry the honest size story (the fly is a
// speck; each brain fills the frame only because we blow it up to match).

const STAGES = [
  {
    key: "fly",
    name: "Fruit fly",
    mesh: "fly-brain.glb",
    color: "#ffc861",
    neurons: "139,255 neurons",
    size: "brain under 1 mm",
    widthMm: 0.6,
    flip: true,
  },
  {
    key: "mouse",
    name: "Mouse",
    mesh: "mouse-brain.glb",
    color: "#7ee0ff",
    neurons: "~71 million neurons",
    size: "brain about 1 cm",
    widthMm: 12,
    flip: false,
  },
  {
    key: "human",
    name: "Human",
    mesh: "human-brain.glb",
    color: "#b78bff",
    neurons: "86 billion neurons",
    size: "brain about 14 cm",
    widthMm: 140,
    flip: false,
  },
] as const;

const loader = new GLTFLoader();

export default function BrainMorph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const activeRef = useRef(0);
  activeRef.current = active;

  // three.js scene lives across renders; React only drives `active`.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const w = container.clientWidth;
    const h = container.clientHeight;
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.01, 100);
    camera.position.set(0, 0, 2.6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const key = new THREE.DirectionalLight(0xffffff, 0.9);
    key.position.set(2, 4, 5);
    scene.add(key);

    type Entry = { group: THREE.Group; mats: THREE.Material[]; fade: number };
    const entries: (Entry | null)[] = [null, null, null];
    let frameId = 0;
    let cancelled = false;

    STAGES.forEach((stage, idx) => {
      loader.load(
        `${import.meta.env.BASE_URL}meshes/${stage.mesh}`,
        (gltf) => {
          if (cancelled) return;
          const group = new THREE.Group();
          const color = new THREE.Color(stage.color);
          const mats: THREE.Material[] = [];

          const meshes: THREE.Mesh[] = [];
          gltf.scene.traverse((o) => {
            if (o instanceof THREE.Mesh) meshes.push(o);
          });

          const bbox = new THREE.Box3().setFromObject(gltf.scene);
          const center = new THREE.Vector3();
          bbox.getCenter(center);
          const size = new THREE.Vector3();
          bbox.getSize(size);
          const maxDim = Math.max(size.x, size.y, size.z) || 1;

          for (const o of meshes) {
            o.geometry.translate(-center.x, -center.y, -center.z);
            const mat = new THREE.MeshStandardMaterial({
              color,
              emissive: color.clone().multiplyScalar(0.2),
              metalness: 0.15,
              roughness: 0.55,
              transparent: true,
              opacity: 0,
              side: THREE.DoubleSide,
            });
            mats.push(mat);
            const mesh = new THREE.Mesh(o.geometry, mat);
            group.add(mesh);
            const wireMat = new THREE.MeshBasicMaterial({
              color,
              wireframe: true,
              transparent: true,
              opacity: 0,
              blending: THREE.AdditiveBlending,
              depthWrite: false,
            });
            mats.push(wireMat);
            group.add(new THREE.Mesh(o.geometry, wireMat));
          }

          group.scale.setScalar(1.6 / maxDim);
          group.rotation.x = stage.flip ? Math.PI - 0.12 : -0.08;
          scene.add(group);
          entries[idx] = { group, mats, fade: 0 };
        },
        undefined,
        (err) => console.error("BrainMorph load failed", stage.mesh, err),
      );
    });

    // Show exactly ONE brain at a time: when the selection changes, fade the
    // outgoing brain fully out before the incoming one fades in. Crossfading
    // translucent meshes of different sizes just looks muddy.
    let displayed = 0;
    const animate = () => {
      const t = performance.now() / 1000;
      const act = activeRef.current;
      if (displayed !== act) {
        const cur = entries[displayed];
        if (!cur || cur.fade < 0.04) displayed = act;
      }
      entries.forEach((e, idx) => {
        if (!e) return;
        const target = idx === displayed && displayed === act ? 1 : 0;
        e.fade += (target - e.fade) * 0.16;
        e.group.visible = e.fade > 0.02;
        for (const m of e.mats) {
          const base = (m as THREE.MeshBasicMaterial).wireframe ? 0.14 : 0.92;
          m.opacity = base * e.fade;
        }
        if (idx === displayed) e.group.rotation.y = t * 0.16;
      });
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      const w2 = container.clientWidth;
      const h2 = container.clientHeight;
      camera.aspect = w2 / h2;
      camera.updateProjectionMatrix();
      renderer.setSize(w2, h2);
    };
    const observer = new ResizeObserver(onResize);
    observer.observe(container);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frameId);
      observer.disconnect();
      entries.forEach((e) => {
        if (!e) return;
        e.group.traverse((o) => {
          if (o instanceof THREE.Mesh) o.geometry.dispose();
        });
        e.mats.forEach((m) => m.dispose());
      });
      renderer.dispose();
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
    };
  }, []);

  // Auto-advance fly -> mouse -> human -> loop, until the user takes over.
  useEffect(() => {
    if (!auto) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % STAGES.length), 3200);
    return () => window.clearInterval(id);
  }, [auto]);

  const stage = STAGES[active];
  // True-scale strip: dot diameter tracks real brain width. The fly ends up a
  // speck next to the human, which is exactly the point; floor it so it stays
  // visible.
  const maxWidth = STAGES[STAGES.length - 1].widthMm;

  return (
    <div className="rounded-[1.75rem] glass p-5 sm:p-7">
      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div className="relative order-2 lg:order-1 mx-auto aspect-square w-full max-w-[420px]">
          <div ref={containerRef} className="absolute inset-0" />
        </div>

        <div className="order-1 lg:order-2">
          <p className="mb-2 text-[11px] uppercase tracking-[0.32em] text-white/45">Scale morph</p>
          <h3 className="font-display text-[clamp(1.8rem,3vw,2.6rem)] font-light leading-tight">
            <span style={{ color: stage.color }}>{stage.name}</span>
          </h3>
          <p className="mt-1 font-display text-lg text-white/85">{stage.neurons}</p>
          <p className="text-sm text-white/55">{stage.size}</p>

          {/* Segmented control */}
          <div className="mt-5 inline-flex rounded-full border border-white/12 bg-white/[0.04] p-1">
            {STAGES.map((s, i) => (
              <button
                key={s.key}
                onClick={() => {
                  setAuto(false);
                  setActive(i);
                }}
                className="rounded-full px-4 py-1.5 text-sm transition"
                style={
                  i === active
                    ? { background: `${s.color}22`, color: s.color, boxShadow: `inset 0 0 0 1px ${s.color}66` }
                    : { color: "rgba(255,255,255,0.55)" }
                }
              >
                {s.name}
              </button>
            ))}
          </div>

          {/* True-scale strip */}
          <div className="mt-6">
            <p className="mb-2 text-[11px] uppercase tracking-[0.24em] text-white/40">At true scale</p>
            <div className="flex items-end gap-4" style={{ height: 56 }}>
              {STAGES.map((s) => {
                const d = Math.max(4, (s.widthMm / maxWidth) * 52);
                return (
                  <div key={s.key} className="flex flex-col items-center gap-1.5">
                    <div
                      className="rounded-full transition-all"
                      style={{
                        width: d,
                        height: d,
                        background: s.color,
                        opacity: s.key === stage.key ? 1 : 0.35,
                        boxShadow: s.key === stage.key ? `0 0 12px ${s.color}` : "none",
                      }}
                    />
                    <span
                      className="text-[10px]"
                      style={{ color: s.key === stage.key ? s.color : "rgba(255,255,255,0.4)" }}
                    >
                      {s.name}
                    </span>
                  </div>
                );
              })}
            </div>
            <p className="mt-3 text-xs leading-relaxed text-white/45">
              Each brain fills the view so you can see its shape, but their real sizes are worlds apart: the fly brain is
              a speck, the human is the size of two fists. Same building blocks, wildly different scale.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
