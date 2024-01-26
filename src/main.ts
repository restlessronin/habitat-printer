import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import stl2gcode from './stl2gcode';

const cubeStl = `
solid cube
  facet normal 0 0 1
    outer loop
      vertex 0 0 1
      vertex 1 0 1
      vertex 1 1 1
    endloop
  endfacet
  facet normal 0 0 1
    outer loop
      vertex 1 1 1
      vertex 0 1 1
      vertex 0 0 1
    endloop
  endfacet
  facet normal 0 0 -1
    outer loop
      vertex 0 0 0
      vertex 1 1 0
      vertex 1 0 0
    endloop
  endfacet
  facet normal 0 0 -1
    outer loop
      vertex 1 1 0
      vertex 0 0 0
      vertex 0 1 0
    endloop
  endfacet
  facet normal 0 1 0
    outer loop
      vertex 0 1 0
      vertex 1 1 1
      vertex 1 1 0
    endloop
  endfacet
  facet normal 0 1 0
    outer loop
      vertex 1 1 1
      vertex 0 1 0
      vertex 0 1 1
    endloop
  endfacet
  facet normal 0 -1 0
    outer loop
      vertex 0 0 0
      vertex 1 0 1
      vertex 1 0 0
    endloop
  endfacet
  facet normal 0 -1 0
    outer loop
      vertex 1 0 1
      vertex 0 0 0
      vertex 0 0 1
    endloop
  endfacet
  facet normal 1 0 0
    outer loop
      vertex 1 0 0
      vertex 1 1 1
      vertex 1 0 1
    endloop
  endfacet
  facet normal 1 0 0
    outer loop
      vertex 1 1 1
      vertex 1 0 0
      vertex 1 1 0
    endloop
  endfacet
  facet normal -1 0 0
    outer loop
      vertex 0 0 0
      vertex 0 0 1
      vertex 0 1 1
    endloop
  endfacet
  facet normal -1 0 0
    outer loop
      vertex 0 1 1
      vertex 0 1 0
      vertex 0 0 0
    endloop
  endfacet
endsolid cube
`;

const cubeBlob = new Blob([cubeStl], { type: 'text/plain' });
const cubeURL = URL.createObjectURL(cubeBlob);

document.addEventListener('DOMContentLoaded', () => {
  const loadSTLButton = document.getElementById('loadSTL') as HTMLButtonElement;
  const generateGCodeButton = document.getElementById('generateGCode') as HTMLButtonElement;

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
    loader.load(cubeURL, function (geometry) {
      const material = new THREE.MeshNormalMaterial();
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
      camera.position.z = 5;
      animate();
    });
  };

  generateGCodeButton.onclick = () => {
    stl2gcode(cubeURL);
  };

  const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  };
  animate();
});
