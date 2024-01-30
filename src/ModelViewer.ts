import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';

export class ModelViewer {
  static create(window: Window, document: Document, canvasId: string) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById(canvasId) as HTMLCanvasElement,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.z = 5;
    return new ModelViewer(scene, camera, renderer, new STLLoader());
  }

  constructor(
    private readonly scene: THREE.Scene,
    private readonly camera: THREE.PerspectiveCamera,
    private readonly renderer: THREE.WebGLRenderer,
    private readonly stlLoader: STLLoader
  ) {}

  private animate = () => {
    requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
  };

  private add(geometry: THREE.BufferGeometry) {
    const material = new THREE.MeshNormalMaterial();
    const mesh = new THREE.Mesh(geometry, material);
    this.scene.add(mesh);
    this.camera.position.z = 5;
    this.animate();
  }

  load(modelURL: string) {
    this.scene.clear();
    this.stlLoader.load(modelURL, geometry => {
      this.add(geometry);
    });
  }
}

(window as any).ModelViewer = ModelViewer;
