import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.module.js';

// 1. Create a Scene
const scene = new THREE.Scene();

// 2. Create a Red Cube and Add It to the Scene
const geometry = new THREE.BoxGeometry(1, 1, 1); // A 1x1x1 cube
const material = new THREE.MeshStandardMaterial({ color: 0xff0000 }); // Red material, responds to light
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// 3. Add a Light Source to the Scene
const light = new THREE.DirectionalLight(0xffffff, 1); // White light with full intensity
light.position.set(5, 5, 5); // Light position
scene.add(light);

// 4. Create a Camera and Position It
const sizes = {
    width: window.innerWidth, // Full window width
    height: window.innerHeight, // Full window height
};
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
camera.position.z = 5; // Move the camera so we can see the cube
scene.add(camera);

// 5. Create a Renderer and Append It to the Body
const renderer = new THREE.WebGLRenderer();
renderer.setSize(sizes.width, sizes.height); // Renderer size should match the window size
document.body.appendChild(renderer.domElement); // Add the renderer's canvas to the DOM

// 6. Handle Window Resizing
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix(); // Update camera to match the new aspect ratio

    renderer.setSize(sizes.width, sizes.height); // Update renderer size
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Prevent low resolution
});

// 7. Animation Loop: Rotate Cube and Render Scene
const tick = () => {
    // Rotate the cube for animation
    cube.rotation.x += 0.01; // Rotate along the x-axis
    cube.rotation.y += 0.01; // Rotate along the y-axis

    // Render the scene from the perspective of the camera
    renderer.render(scene, camera);

    // Call tick again to animate continuously
    requestAnimationFrame(tick);
};

tick(); // Start the animation loop

