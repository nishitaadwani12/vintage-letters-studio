// 3D hero: a single sheet of letter paper floating with a gentle curl and a
// hand-pressed wax seal, drifting fine particles, soft cinematic lighting.
// Restrained + modern. Gracefully no-ops if WebGL is unavailable.
import * as THREE from "three";

const canvas = document.getElementById("scene");
if (canvas) {
  try { initScene(canvas); }
  catch (err) { console.warn("3D scene disabled:", err); canvas.style.display = "none"; }
}

function initScene(canvas) {
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xf1e4c9, 9, 18); // depth haze matching the cream backdrop

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 0, 9);

  // --- Soft, warm lighting ---
  scene.add(new THREE.AmbientLight(0xfff3e2, 0.85));
  const key = new THREE.DirectionalLight(0xfff0d4, 1.25);
  key.position.set(3, 5, 6);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xd8a3a3, 0.35);
  fill.position.set(-4, -1, 4);
  scene.add(fill);
  const rim = new THREE.DirectionalLight(0xd4af37, 0.4);
  rim.position.set(-3, 4, -4);
  scene.add(rim);

  const group = new THREE.Group();
  group.rotation.set(-0.32, -0.22, 0.04); // relaxed flat-lay tilt
  scene.add(group);

  // --- The letter: a subdivided plane, gently curled ---
  const W = 5, H = 3.4, SEGS = 60;
  const paperGeo = new THREE.PlaneGeometry(W, H, SEGS, Math.round(SEGS * H / W));
  curl(paperGeo, W, H);
  paperGeo.computeVertexNormals();

  const paperMat = new THREE.MeshStandardMaterial({
    color: 0xfaf3e2, roughness: 0.96, metalness: 0.0, side: THREE.DoubleSide,
  });
  const paper = new THREE.Mesh(paperGeo, paperMat);
  group.add(paper);

  // Faint darker backing for edge depth / drop shadow feel.
  const backGeo = new THREE.PlaneGeometry(W + 0.06, H + 0.06);
  const back = new THREE.Mesh(backGeo, new THREE.MeshStandardMaterial({ color: 0xe7d4ad, roughness: 1 }));
  back.position.z = -0.05;
  group.add(back);

  // --- Wax seal: a slightly domed, hand-pressed disc ---
  const seal = new THREE.Group();
  const wax = new THREE.Mesh(
    new THREE.CylinderGeometry(0.44, 0.5, 0.14, 48),
    new THREE.MeshStandardMaterial({ color: 0x6b1d2f, roughness: 0.42, metalness: 0.12 })
  );
  wax.rotation.x = Math.PI / 2;
  seal.add(wax);
  const dome = new THREE.Mesh(
    new THREE.SphereGeometry(0.44, 40, 24, 0, Math.PI * 2, 0, Math.PI / 2.4),
    new THREE.MeshStandardMaterial({ color: 0x7d2536, roughness: 0.5, metalness: 0.1 })
  );
  dome.rotation.x = -Math.PI / 2;
  dome.position.z = 0.05;
  seal.add(dome);
  // Debossed inner ring.
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.02, 16, 48),
    new THREE.MeshStandardMaterial({ color: 0x571725, roughness: 0.6 })
  );
  ring.position.z = 0.11;
  seal.add(ring);
  // Position on the paper's lower-right, riding the curl.
  seal.position.set(1.4, -0.85, curlZ(1.4, -0.85, W, H) + 0.08);
  seal.rotation.z = -0.15;
  group.add(seal);

  // --- Drifting particles (soft gold + blush motes) ---
  const motes = [];
  const moteColors = [0xd4af37, 0xd8a3a3, 0xece0c6];
  for (let i = 0; i < 22; i++) {
    const m = new THREE.Mesh(
      new THREE.CircleGeometry(0.03 + Math.random() * 0.05, 8),
      new THREE.MeshBasicMaterial({ color: moteColors[i % 3], transparent: true, opacity: 0.5, side: THREE.DoubleSide })
    );
    m.position.set((Math.random() - 0.5) * 12, (Math.random() - 0.5) * 8, Math.random() * 4 - 1);
    m.userData.speed = 0.15 + Math.random() * 0.3;
    m.userData.sway = Math.random() * 6;
    scene.add(m);
    motes.push(m);
  }

  // --- Gentle interaction: parallax + soft optional drag, always eases home ---
  let targetY = -0.22, targetX = -0.32, curY = targetY, curX = targetX;
  let dragging = false, lastX = 0, lastY = 0;
  const HOME_Y = -0.22, HOME_X = -0.32;

  const down = (x, y) => { dragging = true; lastX = x; lastY = y; };
  const move = (x, y) => {
    if (dragging) {
      targetY += (x - lastX) * 0.004;
      targetX += (y - lastY) * 0.003;
      targetY = clamp(targetY, HOME_Y - 0.4, HOME_Y + 0.4);
      targetX = clamp(targetX, HOME_X - 0.3, HOME_X + 0.3);
      lastX = x; lastY = y;
    } else {
      targetY = HOME_Y + (x / window.innerWidth - 0.5) * 0.22;
      targetX = HOME_X + (y / window.innerHeight - 0.5) * 0.12;
    }
  };
  canvas.addEventListener("mousedown", (e) => down(e.clientX, e.clientY));
  window.addEventListener("mousemove", (e) => move(e.clientX, e.clientY));
  window.addEventListener("mouseup", () => (dragging = false));
  canvas.addEventListener("touchstart", (e) => down(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
  canvas.addEventListener("touchmove", (e) => move(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
  canvas.addEventListener("touchend", () => (dragging = false));

  function resize() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener("resize", resize);
  resize();

  const clock = new THREE.Clock();
  (function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    if (!dragging) { targetY += (HOME_Y - targetY) * 0.01; targetX += (HOME_X - targetX) * 0.01; }
    curY += (targetY - curY) * 0.05;
    curX += (targetX - curX) * 0.05;
    group.rotation.y = curY + Math.sin(t * 0.25) * 0.05;
    group.rotation.x = curX;
    group.position.y = Math.sin(t * 0.6) * 0.14;

    motes.forEach((m) => {
      m.position.y -= m.userData.speed * 0.008;
      m.position.x += Math.sin(t * 0.4 + m.userData.sway) * 0.002;
      m.rotation.z += 0.006;
      if (m.position.y < -4.2) { m.position.y = 4.2; m.position.x = (Math.random() - 0.5) * 12; }
    });
    renderer.render(scene, camera);
  })();
}

// Gentle paper curl: lift the bottom edge toward the viewer + a soft overall wave.
function curl(geo, W, H) {
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    pos.setZ(i, curlZ(pos.getX(i), pos.getY(i), W, H));
  }
}
function curlZ(x, y, W, H) {
  const bottom = Math.max(0, (-y / (H / 2))); // 0 at center, 1 at bottom edge
  const lift = Math.pow(bottom, 2.2) * 0.7;    // bottom edge curls up
  const wave = Math.sin((x / W) * Math.PI) * 0.12; // soft lengthwise wave
  return lift + wave;
}
function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
