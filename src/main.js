import "./style.css";
import * as THREE from "three";

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Define 2D triangle shape points (clockwise vertices)  
const points = [
  new THREE.Vector2(0, 0),
  new THREE.Vector2(4, 0),
  new THREE.Vector2(5, 1),
  new THREE.Vector2(0, 7),
  new THREE.Vector2(0, 0),
];

// Apply LatheGeometry to the shape
const geometry = new THREE.LatheGeometry(points, 12); // 12 segments for rotation
 
// Material for the lathed object with MeshNormalMaterial  
const material = new THREE.MeshNormalMaterial({
  flatShading: true, // Use flat shading for a more faceted look
  side: THREE.DoubleSide, // This makes the material double-sided
});

// Create the lathed mesh
const lathedMesh = new THREE.Mesh(geometry, material); 
scene.add(lathedMesh);

// Add a light source to the scene (Directional light)
const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // White light 
directionalLight.position.set(5, 5, 5); // Position it slightly above and to the side 
scene.add(directionalLight);

// Add ambient light to simulate sky light (soft, uniform light)
const ambientLight = new THREE.AmbientLight(0x303030, 1); // Soft white ambient light  
scene.add(ambientLight);

// Set the camera position
camera.position.z = 10; 

// Variables to track mouse movement   
let mouseX = 0; 
let mouseY = 0; 

// Event listener for mouse movement  
window.addEventListener("mousemove", (event) => {
  // Normalize mouse coordinates to -1 to 1
  mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Rotate the lathed mesh based on mouse position
  lathedMesh.rotation.x = mouseY * Math.PI; // Adjust X rotation based on mouseY  
  lathedMesh.rotation.y = mouseX * Math.PI; // Adjust Y rotation based on mouseX 

  // Render the scene
  renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
