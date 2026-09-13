// Asli Tohfa — elegant vintage hero.
// A glowing gold-dust particle field with soft depth, a slowly turning wax-seal
// medallion (monogram अ), warm cinematic tone-mapping and UnrealBloom glow.
// Gracefully degrades: no bloom if addons fail, hidden entirely if WebGL is out.
import * as THREE from "three";

const canvas = document.getElementById("scene");
if (canvas) {
  initScene(canvas).catch((err) => { console.warn("3D hero disabled:", err); canvas.style.display = "none"; });
}

async function initScene(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  scene.background = warmBackdrop();       // deep vintage radial, baked into the scene
  scene.fog = new THREE.FogExp2(0x2a1418, 0.055);

  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.set(0, 0, 12);

  // --- Lighting: warm key + gold rim + soft fill ---
  scene.add(new THREE.AmbientLight(0xffe9cf, 0.6));
  const key = new THREE.DirectionalLight(0xfff1d6, 1.4); key.position.set(4, 5, 8); scene.add(key);
  const rim = new THREE.DirectionalLight(0xd4af37, 0.9); rim.position.set(-6, 3, -4); scene.add(rim);
  const fill = new THREE.PointLight(0x8a2a3c, 0.7, 40); fill.position.set(0, -3, 6); scene.add(fill);

  // --- Glowing dust particles (additive soft sprites) ---
  const COUNT = 900;
  const pGeo = new THREE.BufferGeometry();
  const pos = new Float32Array(COUNT * 3);
  const col = new Float32Array(COUNT * 3);
  const siz = new Float32Array(COUNT);
  const palette = [new THREE.Color(0xf6e2a8), new THREE.Color(0xd4af37), new THREE.Color(0xe7c9c0), new THREE.Color(0xfff6e6)];
  for (let i = 0; i < COUNT; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 26;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 14 - 2;
    const c = palette[(Math.random() * palette.length) | 0];
    col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    siz[i] = 0.08 + Math.random() * 0.28;
  }
  pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  pGeo.setAttribute("color", new THREE.BufferAttribute(col, 3));
  pGeo.setAttribute("size", new THREE.BufferAttribute(siz, 1));
  const points = new THREE.Points(pGeo, softPointsMaterial());
  scene.add(points);

  // --- Wax-seal medallion (focal object) ---
  const seal = new THREE.Group();
  const faceTex = sealTexture();
  const face = new THREE.Mesh(
    new THREE.CircleGeometry(2.0, 96),
    new THREE.MeshStandardMaterial({ map: faceTex, roughness: 0.52, metalness: 0.08, color: 0xffffff })
  );
  seal.add(face);
  const rimMesh = new THREE.Mesh(
    new THREE.TorusGeometry(2.0, 0.16, 24, 96),
    new THREE.MeshStandardMaterial({ color: 0x7d2536, roughness: 0.45, metalness: 0.25 })
  );
  seal.add(rimMesh);
  // Soft glow halo behind the seal (additive), so it reads as pressed, glowing wax.
  const halo = new THREE.Mesh(
    new THREE.CircleGeometry(3.4, 64),
    new THREE.MeshBasicMaterial({ map: haloTexture(), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0.6 })
  );
  halo.position.z = -0.3;
  seal.add(halo);
  seal.position.set(0.2, 0.2, 2);
  scene.add(seal);

  // --- Optional bloom (UnrealBloom via addons) ---
  let composer = null;
  try {
    const [{ EffectComposer }, { RenderPass }, { UnrealBloomPass }, { OutputPass }] = await Promise.all([
      import("three/addons/postprocessing/EffectComposer.js"),
      import("three/addons/postprocessing/RenderPass.js"),
      import("three/addons/postprocessing/UnrealBloomPass.js"),
      import("three/addons/postprocessing/OutputPass.js"),
    ]);
    composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(new UnrealBloomPass(new THREE.Vector2(1, 1), 0.7, 0.6, 0.18));
    composer.addPass(new OutputPass());
  } catch (_) { composer = null; } // fall back to direct render

  // --- Gentle parallax (no jerky drag) ---
  let mx = 0, my = 0, tx = 0, ty = 0;
  window.addEventListener("mousemove", (e) => {
    tx = (e.clientX / window.innerWidth - 0.5);
    ty = (e.clientY / window.innerHeight - 0.5);
  });
  window.addEventListener("touchmove", (e) => {
    tx = (e.touches[0].clientX / window.innerWidth - 0.5);
    ty = (e.touches[0].clientY / window.innerHeight - 0.5);
  }, { passive: true });

  function resize() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
    if (composer) composer.setSize(w, h);
  }
  window.addEventListener("resize", resize);
  resize();

  const clock = new THREE.Clock();
  (function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    mx += (tx - mx) * 0.04; my += (ty - my) * 0.04;

    // Drift dust upward + slow swirl; wrap around.
    const p = pGeo.attributes.position.array;
    for (let i = 0; i < COUNT; i++) {
      p[i * 3 + 1] += 0.004 + (siz[i] * 0.01);
      p[i * 3] += Math.sin(t * 0.2 + i) * 0.0016;
      if (p[i * 3 + 1] > 8) p[i * 3 + 1] = -8;
    }
    pGeo.attributes.position.needsUpdate = true;
    points.rotation.y = t * 0.02;

    // Medallion: subtle float + slow tilt, catching the rim light.
    seal.rotation.y = Math.sin(t * 0.35) * 0.28 + mx * 0.5;
    seal.rotation.x = Math.sin(t * 0.5) * 0.06 - my * 0.35;
    seal.position.y = 0.2 + Math.sin(t * 0.7) * 0.12;

    // Camera parallax dolly.
    camera.position.x += (mx * 2.2 - camera.position.x) * 0.05;
    camera.position.y += (-my * 1.4 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 2);

    composer ? composer.render() : renderer.render(scene, camera);
  })();
}

// ---- Texture helpers (canvas-generated, no external assets) ----
function warmBackdrop() {
  const c = document.createElement("canvas"); c.width = c.height = 512;
  const g = c.getContext("2d");
  const grad = g.createRadialGradient(256, 200, 40, 256, 300, 460);
  grad.addColorStop(0, "#5a2230");
  grad.addColorStop(0.45, "#3a1720");
  grad.addColorStop(1, "#1c0d12");
  g.fillStyle = grad; g.fillRect(0, 0, 512, 512);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function softPointsMaterial() {
  return new THREE.PointsMaterial({
    size: 0.32, map: dotTexture(), vertexColors: true, transparent: true,
    blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true, opacity: 0.9,
  });
}

function dotTexture() {
  const c = document.createElement("canvas"); c.width = c.height = 64;
  const g = c.getContext("2d");
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.25, "rgba(255,240,210,0.85)");
  grad.addColorStop(1, "rgba(255,240,210,0)");
  g.fillStyle = grad; g.fillRect(0, 0, 64, 64);
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; return tex;
}

function haloTexture() {
  const c = document.createElement("canvas"); c.width = c.height = 256;
  const g = c.getContext("2d");
  const grad = g.createRadialGradient(128, 128, 20, 128, 128, 128);
  grad.addColorStop(0, "rgba(212,175,55,0.55)");
  grad.addColorStop(0.5, "rgba(139,42,60,0.18)");
  grad.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = grad; g.fillRect(0, 0, 256, 256);
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; return tex;
}

function sealTexture() {
  const S = 512;
  const c = document.createElement("canvas"); c.width = c.height = S;
  const g = c.getContext("2d");
  const cx = S / 2;
  // Wax body.
  const grad = g.createRadialGradient(cx - 60, cx - 70, 30, cx, cx, cx);
  grad.addColorStop(0, "#9a3145");
  grad.addColorStop(0.5, "#6b1d2f");
  grad.addColorStop(1, "#4a1420");
  g.fillStyle = grad; g.beginPath(); g.arc(cx, cx, cx - 6, 0, Math.PI * 2); g.fill();
  // Debossed inner ring.
  g.strokeStyle = "rgba(40,10,16,0.55)"; g.lineWidth = 10;
  g.beginPath(); g.arc(cx, cx, cx - 70, 0, Math.PI * 2); g.stroke();
  g.strokeStyle = "rgba(255,220,190,0.10)"; g.lineWidth = 4;
  g.beginPath(); g.arc(cx, cx, cx - 62, 0, Math.PI * 2); g.stroke();
  // Monogram — draw with deboss (dark) + subtle highlight.
  const drawMono = () => {
    g.textAlign = "center"; g.textBaseline = "middle";
    g.font = "600 300px 'Noto Serif Devanagari', 'Cormorant Garamond', serif";
    g.fillStyle = "rgba(30,8,14,0.5)"; g.fillText("अ", cx, cx + 24);
    g.fillStyle = "rgba(255,225,195,0.12)"; g.fillText("अ", cx, cx + 18);
  };
  drawMono();
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  // Redraw once the Devanagari webfont is ready so the monogram renders crisply.
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => { drawMono(); tex.needsUpdate = true; });
  }
  return tex;
}
