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

let time = 0;
function animate() {
  requestAnimationFrame(animate);
  time += 0.01;

  testCube.rotation.y += 0.01;
  testCube.position.y = 0.5 + Math.sin(time * 2) * 0.2;

  renderer.render(scene, camera);
}

animate();

// ensiklopedia data ikan
const fishUI = createFishUI();
export const fishEncyclopedia = [
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

export function createFishUI() {
  const fishUI = document.createElement('div');
  fishUI.id = 'fishUI';
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
  return fishUI;
}

export function showFishEncyclopedia(fish, renderer) {
  const rarityColors = { Common: '#999', Uncommon: '#4CAF50', Rare: '#2196F3', Epic: '#9C27B0' };
  const fishUI = document.getElementById('fishUI');

  fishUI.innerHTML = `
    <h1 style="margin: 0 0 10px 0; color: #8b6f47; font-size: 32px; font-weight: normal; border-bottom: 2px solid #8b6f47; padding-bottom: 10px;">
      ${fish.name}
    </h1>
    <p style="margin: 5px 0 20px 0; font-style: italic; color: #666; font-size: 16px;">
      <em>${fish.scientificName}</em>
    </p>
    
    <div style="text-align: center; margin: 20px 0;">
      <div style="display: inline-block; width: 120px; height: 120px; background: #${fish.color.toString(16).padStart(6, '0')}; border-radius: 50%; border: 4px solid white; box-shadow: 0 8px 20px rgba(0,0,0,0.3);"></div>
    </div>
    
    <div style="margin: 25px 0; padding: 20px; background: rgba(139, 111, 71, 0.1); border-radius: 10px;">
      <p style="margin: 10px 0;"><strong>Family:</strong> ${fish.family}</p>
      <p style="margin: 10px 0;"><strong>Size:</strong> ${fish.size}</p>
      <p style="margin: 10px 0;"><strong>Rarity:</strong> <span style="color: ${rarityColors[fish.rarity]}; font-weight: bold;">${fish.rarity}</span></p>
      <p style="margin: 10px 0;"><strong>Habitat:</strong> ${fish.habitat}</p>
      <p style="margin: 10px 0;"><strong>Diet:</strong> ${fish.diet}</p>
      <p style="margin: 10px 0;"><strong>Pattern:</strong> ${fish.pattern}</p>
    </div>
    
    <p style="margin: 20px 0; line-height: 1.8; font-size: 15px;">
      ${fish.description}
    </p>
    
    <div style="margin: 20px 0; padding: 15px; background: rgba(255, 193, 7, 0.15); border-left: 4px solid #ffc107; border-radius: 5px;">
      <p style="margin: 0; font-size: 14px;"><strong>💡 Fun Fact:</strong> ${fish.funFact}</p>
    </div>
    
    <button id="closeFishUI" style="display: block; margin: 20px auto 0; padding: 12px 30px; background: #8b6f47; color: white; border: none; border-radius: 25px; cursor: pointer; font-size: 16px; font-family: Georgia, serif;">
      Continue Exploring
    </button>
  `;

  fishUI.style.display = 'block';

  document.getElementById('closeFishUI').onclick = () => {
    fishUI.style.display = 'none';
    renderer.domElement.requestPointerLock();
  };
}