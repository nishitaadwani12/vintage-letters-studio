// 3D hero scene: a floating wax-sealed envelope with a rising letter.
// Uses Three.js (via importmap). Gracefully no-ops if WebGL is unavailable.
import * as THREE from "three";

const canvas = document.getElementById("scene");
if (canvas) {
  try {
    initScene(canvas);
  } catch (err) {
    console.warn("3D scene disabled:", err);
    canvas.style.display = "none";
  }
}

function initScene(canvas) {
  const scene = new THREE.Scene();
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 0, 8);

  // Lighting — warm, vintage.
  scene.add(new THREE.AmbientLight(0xfff3dd, 0.9));
  const key = new THREE.DirectionalLight(0xffe9c4, 1.1);
  key.position.set(4, 6, 6);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xd4af37, 0.5);
  rim.position.set(-5, 2, -3);
  scene.add(rim);

  // Group we rotate on drag / idle.
  const group = new THREE.Group();
  scene.add(group);

  const parchment = new THREE.MeshStandardMaterial({ color: 0xf4ead5, roughness: 0.85, metalness: 0.05 });
  const flap = new THREE.MeshStandardMaterial({ color: 0xe9dab8, roughness: 0.85, metalness: 0.05 });

  // Envelope body.
  const env = new THREE.Mesh(new THREE.BoxGeometry(4, 2.6, 0.14), parchment);
  group.add(env);

  // Envelope flap (triangle).
  const flapGeo = new THREE.BufferGeometry();
  flapGeo.setAttribute("position", new THREE.Float32BufferAttribute([-2, 1.3, 0.08, 2, 1.3, 0.08, 0, -0.15, 0.08], 3));
  flapGeo.computeVertexNormals();
  const flapMesh = new THREE.Mesh(flapGeo, flap);
  group.add(flapMesh);

  // Rising letter behind the envelope.
  const letter = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 2.2), new THREE.MeshStandardMaterial({ color: 0xfdfbf7, roughness: 0.9, side: THREE.DoubleSide }));
  letter.position.set(0, 1.5, -0.2);
  group.add(letter);

  // Wax seal — burgundy disc with gold ring.
  const seal = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.12, 40), new THREE.MeshStandardMaterial({ color: 0x6b1d2f, roughness: 0.4, metalness: 0.2 }));
  seal.rotation.x = Math.PI / 2;
  seal.position.set(0, -0.15, 0.16);
  group.add(seal);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.05, 16, 40), new THREE.MeshStandardMaterial({ color: 0xd4af37, roughness: 0.3, metalness: 0.6 }));
  ring.position.copy(seal.position);
  group.add(ring);

  // Floating pressed-flower petals.
  const petals = [];
  const petalMat = [0xd8a3a3, 0x8a9a86, 0xd4af37].map((c) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.7, side: THREE.DoubleSide }));
  for (let i = 0; i < 14; i++) {
    const p = new THREE.Mesh(new THREE.CircleGeometry(0.16, 6), petalMat[i % 3]);
    p.position.set((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 6, (Math.random() - 0.5) * 4 - 1);
    p.rotation.set(Math.random() * 6, Math.random() * 6, Math.random() * 6);
    p.userData.speed = 0.2 + Math.random() * 0.4;
    scene.add(p);
    petals.push(p);
  }

  // Interaction.
  let targetRotY = -0.15, targetRotX = 0.05, curRotY = targetRotY, curRotX = targetRotX;
  let dragging = false, lastX = 0, lastY = 0;

  const onDown = (x, y) => { dragging = true; lastX = x; lastY = y; };
  const onMove = (x, y) => {
    if (dragging) {
      targetRotY += (x - lastX) * 0.008;
      targetRotX += (y - lastY) * 0.005;
      targetRotX = Math.max(-0.6, Math.min(0.6, targetRotX));
      lastX = x; lastY = y;
    } else {
      // Subtle parallax follow.
      targetRotY = -0.15 + (x / window.innerWidth - 0.5) * 0.4;
    }
  };
  canvas.addEventListener("mousedown", (e) => onDown(e.clientX, e.clientY));
  window.addEventListener("mousemove", (e) => onMove(e.clientX, e.clientY));
  window.addEventListener("mouseup", () => (dragging = false));
  canvas.addEventListener("touchstart", (e) => onDown(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
  canvas.addEventListener("touchmove", (e) => onMove(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
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
  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    curRotY += (targetRotY - curRotY) * 0.06;
    curRotX += (targetRotX - curRotX) * 0.06;
    group.rotation.y = curRotY;
    group.rotation.x = curRotX;
    group.position.y = Math.sin(t * 0.8) * 0.12;
    letter.position.y = 1.5 + Math.sin(t * 0.8 + 1) * 0.06;

    petals.forEach((p) => {
      p.position.y -= p.userData.speed * 0.01;
      p.rotation.x += 0.01; p.rotation.z += 0.008;
      if (p.position.y < -3.5) p.position.y = 3.5;
    });
    renderer.render(scene, camera);
  }
  animate();
}
