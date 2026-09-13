// Asli Tohfa — premium 3D hero.
// A cream envelope with soft rounded edges and a glossy burgundy wax seal ringed
// in metallic gold, lit by a generated studio environment (image-based lighting)
// so materials reflect real light. Slow, elegant float + subtle cursor parallax.
// Self-contained (no external assets); degrades gracefully.
import * as THREE from "three";

const canvas = document.getElementById("scene");
if (canvas) {
  initScene(canvas).catch((err) => { console.warn("3D hero disabled:", err); canvas.style.display = "none"; });
}

async function initScene(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  camera.position.set(0, 0.5, 8.5);

  // --- Image-based studio lighting (the premium look) ---
  let RoundedBoxGeometry = null;
  try {
    const { RoomEnvironment } = await import("three/addons/environments/RoomEnvironment.js");
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    ({ RoundedBoxGeometry } = await import("three/addons/geometries/RoundedBoxGeometry.js"));
  } catch (_) { /* fall back to lights only */ }

  // Soft key + gentle fill to complement the environment.
  scene.add(new THREE.HemisphereLight(0xfff6e9, 0xe3d6ba, scene.environment ? 0.35 : 0.95));
  const key = new THREE.DirectionalLight(0xfff3e0, scene.environment ? 0.7 : 1.1);
  key.position.set(3.5, 5, 5); scene.add(key);
  const fill = new THREE.DirectionalLight(0xffffff, 0.25); fill.position.set(-4, 1, 4); scene.add(fill);

  const group = new THREE.Group();
  group.rotation.set(-0.14, -0.16, 0);
  scene.add(group);

  const W = 4.3, H = 2.85;

  // --- Envelope body (soft rounded edges when available) ---
  const paperMat = new THREE.MeshPhysicalMaterial({
    color: 0xf5ead4, roughness: 0.82, metalness: 0, clearcoat: 0.2, clearcoatRoughness: 0.6, sheen: 0.5, sheenColor: 0xfff4e0,
  });
  const bodyGeo = RoundedBoxGeometry ? new RoundedBoxGeometry(W, H, 0.18, 5, 0.07) : new THREE.BoxGeometry(W, H, 0.16);
  const body = new THREE.Mesh(bodyGeo, paperMat);
  group.add(body);

  // Folded top flap (inverted V) + faint side seams for the sealed-envelope look.
  const flapMat = new THREE.MeshPhysicalMaterial({ color: 0xecdcbb, roughness: 0.86, clearcoat: 0.15, sheen: 0.4, sheenColor: 0xfff4e0 });
  const flap = new THREE.Mesh(triangle(-W / 2, H / 2, W / 2, H / 2, 0, -0.05), flapMat);
  flap.position.z = 0.095; group.add(flap);
  const seamMat = new THREE.MeshStandardMaterial({ color: 0xe1d0ac, roughness: 0.9 });
  const l = new THREE.Mesh(triangle(-W / 2, H / 2, -W / 2, -H / 2, 0, -0.05), seamMat);
  const r = new THREE.Mesh(triangle(W / 2, H / 2, W / 2, -H / 2, 0, -0.05), seamMat);
  l.position.z = 0.085; r.position.z = 0.085; group.add(l, r);

  // --- Wax seal: glossy burgundy wax + metallic gold rim ---
  const sealGroup = new THREE.Group();
  const wax = new THREE.Mesh(
    new THREE.CylinderGeometry(0.4, 0.44, 0.12, 64),
    new THREE.MeshPhysicalMaterial({ color: 0x6b1d2f, roughness: 0.32, metalness: 0.0, clearcoat: 0.7, clearcoatRoughness: 0.35 })
  );
  wax.rotation.x = Math.PI / 2; sealGroup.add(wax);
  const goldMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 1.0, roughness: 0.22 });
  const rim = new THREE.Mesh(new THREE.TorusGeometry(0.4, 0.035, 24, 72), goldMat);
  rim.position.z = 0.06; sealGroup.add(rim);
  // Subtle debossed emblem (no letters) on the wax face.
  const emblem = new THREE.Mesh(
    new THREE.CircleGeometry(0.4, 64),
    new THREE.MeshPhysicalMaterial({ map: sealFace(), roughness: 0.34, clearcoat: 0.6, clearcoatRoughness: 0.35 })
  );
  emblem.position.z = 0.061; sealGroup.add(emblem);
  sealGroup.position.set(0, -0.05, 0.19); group.add(sealGroup);

  // --- Soft grounding shadow ---
  const shadow = new THREE.Mesh(
    new THREE.PlaneGeometry(6.6, 3.8),
    new THREE.MeshBasicMaterial({ map: shadowTexture(), transparent: true, opacity: 0.2, depthWrite: false })
  );
  shadow.position.set(0.15, -1.7, -1); shadow.rotation.x = -0.1; scene.add(shadow);

  // --- Subtle cursor parallax ---
  let tx = 0, ty = 0, mx = 0, my = 0;
  const onMove = (x, y) => { tx = x / window.innerWidth - 0.5; ty = y / window.innerHeight - 0.5; };
  window.addEventListener("mousemove", (e) => onMove(e.clientX, e.clientY));
  window.addEventListener("touchmove", (e) => onMove(e.touches[0].clientX, e.touches[0].clientY), { passive: true });

  function resize() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
  }
  window.addEventListener("resize", resize);
  resize();

  const clock = new THREE.Clock();
  (function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    mx += (tx - mx) * 0.04; my += (ty - my) * 0.04;
    group.rotation.y = -0.16 + mx * 0.22 + Math.sin(t * 0.28) * 0.05; // gentle turn shows gold reflection
    group.rotation.x = -0.14 - my * 0.12;
    group.position.y = Math.sin(t * 0.65) * 0.1;
    renderer.render(scene, camera);
  })();
}

// Flat triangle from three 2D points.
function triangle(x1, y1, x2, y2, x3, y3) {
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute([x1, y1, 0, x2, y2, 0, x3, y3, 0], 3));
  g.computeVertexNormals();
  return g;
}

// Clean debossed emblem (concentric rings + fine gold-tone accent), no letters.
function sealFace() {
  const S = 256;
  const c = document.createElement("canvas"); c.width = c.height = S;
  const g = c.getContext("2d");
  const cx = S / 2;
  const grad = g.createRadialGradient(cx - 28, cx - 32, 12, cx, cx, cx);
  grad.addColorStop(0, "#8a2a3c"); grad.addColorStop(0.6, "#6b1d2f"); grad.addColorStop(1, "#551724");
  g.fillStyle = grad; g.beginPath(); g.arc(cx, cx, cx - 4, 0, Math.PI * 2); g.fill();
  g.strokeStyle = "rgba(40,10,16,0.4)"; g.lineWidth = 6;
  g.beginPath(); g.arc(cx, cx, cx - 34, 0, Math.PI * 2); g.stroke();
  g.strokeStyle = "rgba(255,225,200,0.10)"; g.lineWidth = 3;
  g.beginPath(); g.arc(cx, cx, cx - 28, 0, Math.PI * 2); g.stroke();
  g.fillStyle = "rgba(30,8,14,0.35)"; g.beginPath(); g.arc(cx, cx, 12, 0, Math.PI * 2); g.fill();
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// Soft radial shadow blob.
function shadowTexture() {
  const c = document.createElement("canvas"); c.width = c.height = 256;
  const g = c.getContext("2d");
  const grad = g.createRadialGradient(128, 128, 10, 128, 128, 128);
  grad.addColorStop(0, "rgba(60,44,32,0.5)");
  grad.addColorStop(1, "rgba(60,44,32,0)");
  g.fillStyle = grad; g.fillRect(0, 0, 256, 256);
  return new THREE.CanvasTexture(c);
}
