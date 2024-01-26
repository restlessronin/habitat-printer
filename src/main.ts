import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import stl2gcode from './stl2gcode';

document.addEventListener('DOMContentLoaded', () => {
  const loadSTLButton = document.getElementById('loadSTL') as HTMLButtonElement;
  const generateGCodeButton = document.getElementById('generateGCode') as HTMLButtonElement;

  // Initialize Three.js scene
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('canvas') as HTMLCanvasElement,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.position.z = 5;

  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  loadSTLButton.onclick = () => {
    const loader = new STLLoader();
  };

  generateGCodeButton.onclick = () => {
    const gcode = stl2gcode(cube.geometry);
  };

  const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  };
  animate();
});
