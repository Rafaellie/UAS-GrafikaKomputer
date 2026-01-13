import * as THREE from "three";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xfff4e6);
scene.fog = new THREE.Fog(0xfff4e6, 30, 50);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 1.6, 8);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.3;
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xfff0d4, 0.8);
scene.add(ambientLight);

const sunLight = new THREE.DirectionalLight(0xffd89b, 1.5);
sunLight.position.set(15, 20, 10);
sunLight.castShadow = true;
sunLight.shadow.camera.left = -30;
sunLight.shadow.camera.right = 30;
sunLight.shadow.camera.top = 30;
sunLight.shadow.camera.bottom = -30;
sunLight.shadow.mapSize.width = 2048;
sunLight.shadow.mapSize.height = 2048;
scene.add(sunLight);

const fillLight = new THREE.DirectionalLight(0xffb87a, 0.6);
fillLight.position.set(-10, 15, -8);
scene.add(fillLight);

const hemiLight = new THREE.HemisphereLight(0xffeaa7, 0xd4a574, 0.7);
scene.add(hemiLight);

const groundGeometry = new THREE.CircleGeometry(25, 64);
const groundMaterial = new THREE.MeshStandardMaterial({
  color: 0xe8d4b8,
  roughness: 0.95,
});
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

function createPlant(x, z) {
  const plantGroup = new THREE.Group();
  const stemGeometry = new THREE.CylinderGeometry(0.05, 0.08, 1.5, 8);
  const stemMaterial = new THREE.MeshStandardMaterial({
    color: 0x6b8e23,
    roughness: 0.9,
  });
  const stem = new THREE.Mesh(stemGeometry, stemMaterial);
  stem.position.y = 0.75;
  plantGroup.add(stem);

  for (let i = 0; i < 3; i++) {
    const leafGeometry = new THREE.SphereGeometry(0.3, 8, 8);
    const leafMaterial = new THREE.MeshStandardMaterial({
      color: 0x90ee90,
      roughness: 0.8,
    });
    const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
    leaf.scale.set(1.5, 0.3, 0.8);
    leaf.position.set(
      Math.cos((i * Math.PI * 2) / 3) * 0.3,
      1.3 + i * 0.2,
      Math.sin((i * Math.PI * 2) / 3) * 0.3
    );
    plantGroup.add(leaf);
  }

  plantGroup.position.set(x, 0, z);
  plantGroup.castShadow = true;
  scene.add(plantGroup);
}

createPlant(-6, -8);
createPlant(6, -10);
createPlant(-8, 2);
createPlant(8, 0);

const testCubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const testCubeMaterial = new THREE.MeshStandardMaterial({ color: 0xff6b6b });
const testCube = new THREE.Mesh(testCubeGeometry, testCubeMaterial);
testCube.position.set(0, 0.5, -5);
testCube.castShadow = true;
scene.add(testCube);

const infoPanel = document.createElement("div");
infoPanel.style.position = "absolute";
infoPanel.style.top = "20px";
infoPanel.style.left = "20px";
infoPanel.style.background = "rgba(255, 248, 235, 0.95)";
infoPanel.style.color = "#3e2723";
infoPanel.style.padding = "20px";
infoPanel.style.borderRadius = "15px";
infoPanel.style.fontFamily = "Georgia, serif";
infoPanel.style.fontSize = "14px";
infoPanel.style.border = "2px solid #8b6f47";
infoPanel.innerHTML = `
  <strong style="color: #8b6f47; font-size: 18px;">🌍 Person 1: Scene Setup</strong><br><br>
  Scene created<br>
  Lighting setup (warm cozy)<br>
  Ground added<br>
  4 Decorative plants<br>
  Test cube (red) at center<br><br>
  <em>Scene is ready for integration!</em>
`;
document.body.appendChild(infoPanel);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

let time = 0;
function animate() {
  requestAnimationFrame(animate);
  time += 0.01;

  testCube.rotation.y += 0.01;
  testCube.position.y = 0.5 + Math.sin(time * 2) * 0.2;

  renderer.render(scene, camera);
}

animate();
