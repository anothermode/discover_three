import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Loop } from './Loop';
import { Resizer } from './Resizer';

// Components
import { createBook } from './book';

let camera,
    controls,
    renderer,
    scene,
    loop;

class World {
  constructor(container) {
    // Create camera, scene, renderer in Three
    camera = new THREE.PerspectiveCamera(70, 1, 0.1, 1000);
    camera.position.set(0, 1, 3);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    scene = new THREE.Scene();
    loop = new Loop(camera, scene, renderer);
    // Create canvas element in dom for three.js
    container.append(renderer.domElement);
    controls = new OrbitControls(camera, renderer.domElement);
    controls.tick = () => controls.update();
    loop.updatables.push(controls);

    // scene illumination and markers
    const pointLight = new THREE.PointLight();
    pointLight.position.set(20,20,20);
    scene.add(pointLight);
    const lightHelper = new THREE.PointLightHelper(pointLight);
    scene.add(lightHelper);
    const gridHelper = new THREE.GridHelper();
    scene.add(gridHelper);

    // resize to window size
    const resizer = new Resizer(container, camera, renderer);

    
  }

  async init() {
    const book = await createBook();

    loop.updatables.push(book);

    book.name = "book"

    scene.add(book);
  }

  start() {
    loop.start();
  }

  stop() {
    loop.stop();
  }

  render() {
    renderer.render(scene, camera);
  }

  getObjectByName(name) {
    return scene.getObjectByName(name);
  }

  moveObjectSlow(name) {
    const object = this.getObjectByName(name);
    object.newPosition.x = 20;
  }

}

export { World };

