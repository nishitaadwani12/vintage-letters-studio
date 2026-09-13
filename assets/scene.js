// Asli Tohfa — calm, realistic hero.
// A single matte wax-sealed envelope resting in soft studio light, grounded by a
// soft shadow, with a gentle float and subtle cursor parallax. No particles,
// no bloom, no glow. Understated. Hides itself if WebGL is unavailable.
import * as THREE from "three";

const canvas = document.getElementById("scene");
if (canvas) {
  try { initScene(canvas); }
  catch (err) { console.warn("3D hero disabled:", err); canvas.style.display = "none"; }
}

function initScene(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  camera.position.set(0, 0.4, 8);

  // --- Soft studio lighting: neutral + warm, no colored rims ---
  scene.add(new THREE.HemisphereLight(0xfff6e9, 0xdccfae, 0.95));
  const key = new THREE.DirectionalLight(0xfff3e0, 1.05); key.position.set(3.5, 4.5, 5); scene.add(key);
  const fill = new THREE.DirectionalLight(0xffffff, 0.3); fill.position.set(-4, 1, 3); scene.add(fill);

  const group = new THREE.Group();
  group.rotation.set(-0.12, -0.14, 0);
  scene.add(group);

  // --- Matte paper materials ---
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0xf3e7cf, roughness: 0.97, metalness: 0 });
  const flapMat = new THREE.MeshStandardMaterial({ color: 0xe9d9ba, roughness: 0.97, metalness: 0 });

  const W = 4.3, H = 2.8;

  // Envelope body.
  const body = new THREE.Mesh(new THREE.BoxGeometry(W, H, 0.14), bodyMat);
  group.add(body);

  // Closed top flap (inverted V) — the classic sealed-envelope silhouette.
  const flap = new THREE.Mesh(triangle(-W / 2, H / 2, W / 2, H / 2, 0, -0.05), flapMat);
  flap.position.z = 0.075;
  group.add(flap);

  // Faint side seams for depth (thin darker triangles).
  const seamMat = new THREE.MeshStandardMaterial({ color: 0xe0cfad, roughness: 0.97 });
  const leftSeam = new THREE.Mesh(triangle(-W / 2, H / 2, -W / 2, -H / 2, 0, -0.05), seamMat);
  const rightSeam = new THREE.Mesh(triangle(W / 2, H / 2, W / 2, -H / 2, 0, -0.05), seamMat);
  leftSeam.position.z = 0.07; rightSeam.position.z = 0.07;
  group.add(leftSeam, rightSeam);

  // --- Wax seal: small domed matte disc with a subtle debossed monogram ---
  const sealGroup = new THREE.Group();
  const wax = new THREE.Mesh(
    new THREE.CylinderGeometry(0.36, 0.4, 0.1, 48),
    new THREE.MeshStandardMaterial({ color: 0x6b1d2f, roughness: 0.55, metalness: 0.05 })
  );
  wax.rotation.x = Math.PI / 2;
  sealGroup.add(wax);
  const mono = new THREE.Mesh(
    new THREE.CircleGeometry(0.36, 48),
    new THREE.MeshStandardMaterial({ map: sealFace(), roughness: 0.58, metalness: 0.05 })
  );
  mono.position.z = 0.051;
  sealGroup.add(mono);
  sealGroup.position.set(0, -0.05, 0.16);
  group.add(sealGroup);

  // --- Soft grounding shadow behind/below the envelope ---
  const shadow = new THREE.Mesh(
    new THREE.PlaneGeometry(6.4, 3.6),
    new THREE.MeshBasicMaterial({ map: shadowTexture(), transparent: true, opacity: 0.22, depthWrite: false })
  );
  shadow.position.set(0.15, -1.5, -0.9);
  shadow.rotation.x = -0.12;
  scene.add(shadow);

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
    group.rotation.y = -0.14 + mx * 0.16 + Math.sin(t * 0.3) * 0.02;
    group.rotation.x = -0.12 - my * 0.1;
    group.position.y = Math.sin(t * 0.7) * 0.09;
    renderer.render(scene, camera);
  })();
}

// A flat triangle mesh geometry from three 2D points (z depth optional).
function triangle(x1, y1, x2, y2, x3, y3) {
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute([x1, y1, 0, x2, y2, 0, x3, y3, 0], 3));
  g.computeVertexNormals();
  return g;
}

// Clean, modern wax emblem — no letters. Debossed concentric rings + a fine
// gold accent line and a subtle starburst. Elegant and brand-neutral.
function sealFace() {
  const S = 256;
  const c = document.createElement("canvas"); c.width = c.height = S;
  const g = c.getContext("2d");
  const cx = S / 2;
  // Wax body with a soft top-left highlight.
  const grad = g.createRadialGradient(cx - 30, cx - 34, 12, cx, cx, cx);
  grad.addColorStop(0, "#8a2a3c"); grad.addColorStop(0.6, "#6b1d2f"); grad.addColorStop(1, "#551724");
  g.fillStyle = grad; g.beginPath(); g.arc(cx, cx, cx - 4, 0, Math.PI * 2); g.fill();
  // Debossed outer ring.
  g.strokeStyle = "rgba(40,10,16,0.45)"; g.lineWidth = 7;
  g.beginPath(); g.arc(cx, cx, cx - 30, 0, Math.PI * 2); g.stroke();
  // Fine gold accent ring.
  g.strokeStyle = "rgba(212,175,55,0.5)"; g.lineWidth = 2.5;
  g.beginPath(); g.arc(cx, cx, cx - 44, 0, Math.PI * 2); g.stroke();
  // Subtle embossed starburst at center.
  g.save(); g.translate(cx, cx);
  for (let i = 0; i < 12; i++) {
    g.rotate((Math.PI * 2) / 12);
    g.strokeStyle = i % 2 ? "rgba(30,8,14,0.35)" : "rgba(255,225,200,0.10)";
    g.lineWidth = 3;
    g.beginPath(); g.moveTo(0, 14); g.lineTo(0, 40); g.stroke();
  }
  g.fillStyle = "rgba(30,8,14,0.4)"; g.beginPath(); g.arc(0, 0, 9, 0, Math.PI * 2); g.fill();
  g.restore();
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
