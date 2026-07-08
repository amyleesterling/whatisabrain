import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

interface Props {
  meshUrl: string;
  /** Optional second mesh loaded into the same scene, aligned to the main
   *  mesh's center (e.g. a cerebellum shown alongside the cerebrum). */
  extraMeshUrl?: string;
  color: string;
  className?: string;
  cameraDistance?: number;
  spinSpeed?: number;
  /** Whether to add a soft white rim light (default true) */
  rim?: boolean;
  /** Allow user to drag to rotate and scroll to zoom (default true) */
  interactive?: boolean;
  /** Allow scroll-wheel zoom (default true). Turn off for embeds so the
   *  model doesn't hijack page scrolling while keeping drag-to-rotate. */
  zoom?: boolean;
  /** Auto-scale the loaded mesh so its largest dimension frames the view,
   *  regardless of the mesh's native coordinate units. Needed for meshes that
   *  aren't pre-normalized (e.g. the FlyWire brain in raw microns). */
  fit?: boolean;
  /** Flip the model upside-down. The raw FlyWire brain ships Y-down (image
   *  coordinates), so it loads inverted; this rights it. */
  flipVertical?: boolean;
}

// Tiny shared GLTFLoader — one instance per page is fine, three handles it.
const sharedLoader = new GLTFLoader();

export default function RealNeuronModel({
  meshUrl,
  extraMeshUrl,
  color,
  className,
  cameraDistance = 2.6,
  spinSpeed = 0.18,
  rim = true,
  interactive = true,
  zoom = true,
  fit = false,
  flipVertical = false,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const w = container.clientWidth;
    const h = container.clientHeight;
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.01, 100);
    camera.position.set(0, 0, cameraDistance);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "low-power",
      preserveDrawingBuffer: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // OrbitControls — drag to rotate, scroll to zoom. Auto-rotate continues
    // when the user isn't interacting; touching the canvas pauses it.
    const controls = interactive ? new OrbitControls(camera, renderer.domElement) : null;
    if (controls) {
      controls.enableDamping = true;
      controls.dampingFactor = 0.08;
      controls.enablePan = false;
      controls.enableZoom = zoom;
      controls.autoRotate = spinSpeed > 0;
      // OrbitControls.autoRotateSpeed is in "rotations per ~6s" units; scale
      // spinSpeed (rad/s) so the visual cadence matches the previous model
      // self-rotation.
      controls.autoRotateSpeed = spinSpeed * 9.5;
      controls.minDistance = cameraDistance * 0.35;
      controls.maxDistance = cameraDistance * 4;
      // Pause auto-rotate while the user is dragging or scrolling, then resume.
      const stopAuto = () => { controls.autoRotate = false; };
      const resumeAuto = () => { controls.autoRotate = spinSpeed > 0; };
      renderer.domElement.addEventListener("pointerdown", stopAuto);
      renderer.domElement.addEventListener("pointerup", resumeAuto);
      renderer.domElement.addEventListener("pointercancel", resumeAuto);
      renderer.domElement.addEventListener("wheel", () => {
        stopAuto();
        clearTimeout((renderer.domElement as any).__resumeTimer);
        (renderer.domElement as any).__resumeTimer = setTimeout(resumeAuto, 1500);
      }, { passive: true });
      // The container needs pointer-events to receive input — the wrapper has
      // aria-hidden but that doesn't disable events. The canvas inherits.
      renderer.domElement.style.touchAction = "none";
      renderer.domElement.style.cursor = "grab";
      renderer.domElement.addEventListener("pointerdown", () => {
        renderer.domElement.style.cursor = "grabbing";
      });
      renderer.domElement.addEventListener("pointerup", () => {
        renderer.domElement.style.cursor = "grab";
      });
    }

    // Lights — premium key/fill setup
    const ambient = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambient);
    const key = new THREE.DirectionalLight(0xffffff, 0.9);
    key.position.set(2, 4, 5);
    scene.add(key);
    const fill = new THREE.DirectionalLight(new THREE.Color(color), 0.35);
    fill.position.set(-3, 1, -2);
    scene.add(fill);
    let rimLight: THREE.DirectionalLight | null = null;
    if (rim) {
      rimLight = new THREE.DirectionalLight(0xffffff, 0.4);
      rimLight.position.set(0, -2, -5);
      scene.add(rimLight);
    }

    let cellGroup: THREE.Group | null = null;
    let frameId = 0;
    let cancelled = false;

    const cellColor = new THREE.Color(color);

    // Collect a gltf's meshes, offset them by `off`, style them, and add to
    // cellGroup. Collect BEFORE mutating (traverse would recurse into the
    // wireframe children we add otherwise).
    const addGltf = (gltf: { scene: THREE.Object3D }, off: THREE.Vector3) => {
      if (!cellGroup) return;
      const meshes: THREE.Mesh[] = [];
      gltf.scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) meshes.push(obj);
      });
      for (const obj of meshes) {
        obj.geometry.translate(-off.x, -off.y, -off.z);
        obj.material = new THREE.MeshStandardMaterial({
          color: cellColor,
          emissive: cellColor.clone().multiplyScalar(0.2),
          metalness: 0.15,
          roughness: 0.55,
          transparent: true,
          opacity: 0.92,
          side: THREE.DoubleSide,
          flatShading: false,
        });
        // Faint wireframe overlay for that "we mapped every branch" feel
        const wireMesh = new THREE.Mesh(
          obj.geometry,
          new THREE.MeshBasicMaterial({
            color: cellColor,
            wireframe: true,
            transparent: true,
            opacity: 0.12,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          }),
        );
        obj.add(wireMesh);
        cellGroup.add(obj);
      }
    };

    sharedLoader.load(
      meshUrl,
      (gltf) => {
        if (cancelled) return;
        cellGroup = new THREE.Group();

        // Re-center via bounding box (more visually balanced than vertex mean)
        const bbox = new THREE.Box3().setFromObject(gltf.scene);
        const center = new THREE.Vector3();
        bbox.getCenter(center);

        addGltf(gltf, center);

        // Optionally normalize scale so any mesh (whatever its native units)
        // frames the same way. Target ~1.6 units pairs with cameraDistance ~2.5.
        if (fit) {
          const size = new THREE.Vector3();
          bbox.getSize(size);
          const maxDim = Math.max(size.x, size.y, size.z) || 1;
          cellGroup.scale.setScalar(1.6 / maxDim);
        }

        // Tilt slightly so we read 3D depth from the start. flipVertical adds a
        // 180° pitch to right meshes that ship upside-down (e.g. FlyWire).
        cellGroup.rotation.x = flipVertical ? Math.PI - 0.12 : -0.08;

        scene.add(cellGroup);
        setLoaded(true);

        // Optional companion mesh (e.g. cerebellum), aligned to the SAME center
        // offset so it keeps its real spatial relationship to the main mesh.
        if (extraMeshUrl) {
          sharedLoader.load(
            extraMeshUrl,
            (g2) => {
              if (cancelled) return;
              addGltf(g2, center);
            },
            undefined,
            (err) => console.error("Failed to load extra mesh", extraMeshUrl, err),
          );
        }
      },
      undefined,
      (err) => {
        console.error("Failed to load mesh", meshUrl, err);
      },
    );

    const animate = () => {
      // When OrbitControls handles motion, let it own the rotation so user
      // drags don't fight a manually-rotated cellGroup. Without controls,
      // fall back to spinning the model directly.
      if (controls) {
        controls.update();
      } else if (cellGroup) {
        const t = performance.now() / 1000;
        cellGroup.rotation.y = t * spinSpeed;
      }
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const observer = new ResizeObserver(onResize);
    observer.observe(container);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frameId);
      observer.disconnect();
      controls?.dispose();
      if (cellGroup) {
        cellGroup.traverse((obj) => {
          if (obj instanceof THREE.Mesh) {
            obj.geometry.dispose();
            const m = obj.material;
            if (Array.isArray(m)) m.forEach((mm) => mm.dispose());
            else m.dispose();
          }
        });
      }
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [meshUrl, color, cameraDistance, spinSpeed, rim, interactive]);

  // No aria-hidden — the canvas is interactive and should receive events.
  return (
    <div ref={containerRef} className={className}>
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="w-2 h-2 rounded-full opacity-60 animate-pulse"
            style={{ background: color, boxShadow: `0 0 16px ${color}` }}
          />
        </div>
      )}
    </div>
  );
}
