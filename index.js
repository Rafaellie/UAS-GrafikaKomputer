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

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

let directionLeftRight = 0;
let directionTopBottom = 0;
const move = {forward: false, backward: false, left: false, right: false};
const speed = 0.1;

document.addEventListener("keydown", (e) => {
  const key = e.code;

  if (key === "KeyW"){
    move.forward = true;
  }else if (key === "KeyA"){
    move.left = true;
  }else if(key === "KeyD"){
    move.right = true; 
  }else if(key === "KeyS"){
    move.backward = true;
  }
});

document.addEventListener("keyup", (e) => {
  const key = e.code;

  if (key === "KeyW"){
    move.forward = false;
  }else if (key === "KeyA"){
    move.left = false;
  }else if(key === "KeyD"){
    move.right = false; 
  }else if(key === "KeyS"){
    move.backward = false;
  }
});

document.addEventListener("mousemove", (e) => {
  if (document.pointerLockElement === renderer.domElement) {
    directionLeftRight -= e.movementX * 0.002;
    directionTopBottom -= e.movementY * 0.002;

    directionTopBottom = Math.max(-Math.PI / 2,
      Math.min(Math.PI / 2, directionTopBottom));
    }
});

renderer.domElement.addEventListener("click", () => {
  renderer.domElement.requestPointerLock();
})

// ensiklopedia data ikan
const fishEncyclopedia = [
  { 
    name: "Emperor Angelfish", 
    scientificName: "Pomacanthus imperator",
    family: "Pomacanthidae",
    habitat: "Indo-Pacific coral reefs",
    size: "30-40 cm", 
    color: 0x4169E1,
    rarity: "Uncommon",
    pattern: "Blue body with yellow stripes",
    diet: "Sponges, tunicates, algae",
    description: "One of the most striking fish in the ocean, the Emperor Angelfish displays magnificent blue and yellow horizontal stripes.",
    funFact: "Young Emperor Angelfish look so different from adults that they were once thought to be a separate species!"
  },
  { 
    name: "Mandarin Fish", 
    scientificName: "Synchiropus splendidus",
    family: "Callionymidae",
    habitat: "Western Pacific coral reefs",
    size: "6 cm", 
    color: 0xFF6B35,
    rarity: "Rare",
    pattern: "Blue, orange, and green swirls",
    diet: "Small crustaceans",
    description: "Perhaps the most colorful fish in the sea, the Mandarin Fish is a psychedelic masterpiece of blues, oranges, and greens.",
    funFact: "They have no scales! Instead, their skin secretes a toxic mucus that protects them."
  },
  { 
    name: "Clownfish", 
    scientificName: "Amphiprion ocellaris",
    family: "Pomacentridae",
    habitat: "Indo-Pacific anemones",
    size: "11 cm", 
    color: 0xFF8C00,
    rarity: "Common",
    pattern: "Orange with white bands",
    diet: "Algae, zooplankton",
    description: "Clownfish have a special relationship with sea anemones. They're immune to the anemone's sting and live safely among their tentacles.",
    funFact: "All clownfish are born male! The dominant male will change sex to become female if needed."
  },
  { 
    name: "Lionfish", 
    scientificName: "Pterois volitans",
    family: "Scorpaenidae",
    habitat: "Indo-Pacific and Atlantic reefs",
    size: "30-38 cm", 
    color: 0xDC143C,
    rarity: "Rare",
    pattern: "Red, white, and brown stripes",
    diet: "Small fish and invertebrates",
    description: "The Lionfish is both beautiful and dangerous, with venomous spines on its dorsal fins. They're voracious hunters.",
    funFact: "Lionfish have become invasive in the Atlantic Ocean with no natural predators!"
  },
  { 
    name: "Royal Gramma", 
    scientificName: "Gramma loreto",
    family: "Grammatidae",
    habitat: "Caribbean coral reefs",
    size: "8 cm", 
    color: 0x9966FF,
    rarity: "Uncommon",
    pattern: "Purple front, yellow back",
    diet: "Zooplankton, small crustaceans",
    description: "This tiny Caribbean beauty displays stunning two-tone coloration: deep royal purple on the front and bright golden yellow on the rear.",
    funFact: "Royal Grammas can swim upside-down just as easily as right-side up!"
  },
  { 
    name: "Regal Tang", 
    scientificName: "Paracanthurus hepatus",
    family: "Acanthuridae",
    habitat: "Indo-Pacific coral reefs",
    size: "30 cm", 
    color: 0x1E90FF,
    rarity: "Common",
    pattern: "Electric blue with black markings",
    diet: "Plankton and algae",
    description: "The Regal Tang has an electric blue body with bold black markings and a bright yellow tail.",
    funFact: "Regal Tangs can 'play dead' by lying on their side when threatened!"
  },
  { 
    name: "Moorish Idol", 
    scientificName: "Zanclus cornutus",
    family: "Zanclidae",
    habitat: "Indo-Pacific coral reefs",
    size: "23 cm", 
    color: 0xFFD700,
    rarity: "Epic",
    pattern: "White, black, and yellow bands",
    diet: "Sponges and tunicates",
    description: "The Moorish Idol is one of the most recognizable reef fish with its distinctive elongated dorsal fin.",
    funFact: "Ancient Moors believed these fish brought happiness!"
  },
  { 
    name: "Discus Fish", 
    scientificName: "Symphysodon aequifasciatus",
    family: "Cichlidae",
    habitat: "Amazon River Basin",
    size: "20-25 cm", 
    color: 0xFF69B4,
    rarity: "Epic",
    pattern: "Round body with vibrant stripes",
    diet: "Worms, crustaceans, plant matter",
    description: "Known as the 'King of the Aquarium,' Discus fish are prized for their perfectly round shape and stunning colors.",
    funFact: "Discus parents produce special mucus that their babies feed on!"
  },
];

// Fish detail UI

const fishUI = document.createElement('div');
fishUI.style.position = 'absolute';
fishUI.style.top = '50%';
fishUI.style.left = '50%';
fishUI.style.transform = 'translate(-50%, -50%)';
fishUI.style.background = 'rgba(255, 248, 235, 0.98)';
fishUI.style.color = '#3e2723';
fishUI.style.padding = '40px';
fishUI.style.borderRadius = '20px';
fishUI.style.display = 'none';
fishUI.style.maxWidth = '500px';
fishUI.style.fontFamily = 'Georgia, serif';
fishUI.style.boxShadow = '0 10px 50px rgba(0,0,0,0.5)';
fishUI.style.border = '3px solid #8b6f47';
fishUI.style.zIndex = '1000';
fishUI.style.maxHeight = '80vh';
fishUI.style.overflowY = 'auto';
document.body.appendChild(fishUI);

let time = 0;
function animate() {
  requestAnimationFrame(animate);
  time += 0.01;
  testCube.rotation.y += 0.01;
  testCube.position.y = 0.5 + Math.sin(time * 2) * 0.2;

  camera.rotation.order = "YXZ";
  camera.rotation.y = directionLeftRight;
  camera.rotation.x = directionTopBottom;

  const forward = new THREE.Vector3(Math.sin(directionLeftRight), 0, -Math.cos(directionLeftRight)).normalize();
  const right = new THREE.Vector3(Math.cos(directionLeftRight), 0, Math.sin(directionLeftRight)).normalize();
  
  // arah pergerakkan
  if (move.forward) {
  camera.position.addScaledVector(forward, speed);
  }

  if (move.backward) {
    camera.position.addScaledVector(forward, -speed);
  }

  if (move.right) {
    camera.position.addScaledVector(right, speed);
  }

  if (move.left) {
    camera.position.addScaledVector(right, -speed);
  }

  renderer.render(scene, camera);
}

animate();