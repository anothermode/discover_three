import * as THREE from 'three';
import { InteractionManager } from 'three.interactive';

// World setup
import { Loop } from './systems/Loop';
import { Resizer } from './systems/Resizer';
import { createControls} from './systems/controls';
import { createRenderer } from './systems/renderer';
import { createStats } from './systems/stats';

// Components
import { createBook } from './Components/book';
import { createScene } from './Components/scene';
import { createCamera } from './Components/camera';
import { createPointLight } from './Components/light';
import { createPointLightHelper } from './Components/pointLightHelper'
import { createGridHelper } from './Components/gridHelper';
import { createBox } from './Components/box';

// Utils
import { degToRad, radToDeg } from 'three/src/math/MathUtils';

import * as TWEEN from '@tweenjs/tween.js';

let camera,
    controls,
    renderer,
    scene,
    loop,
    stats,
    interactionManager;

class World {
  constructor(container) {
    // Create camera, scene, renderer in Three
    renderer = createRenderer();
    camera = createCamera({
      FoV: 70,
      aspectRatio: renderer.domElement.width/renderer.domElement.height,
      near: 0.1,
      far: 1000,
      position: { x: 0, y: 5, z: 10 }
    });
    scene = createScene();
    loop = new Loop(camera, scene, renderer);
    // Create canvas element in dom for three.js
    container.append(renderer.domElement);

  //  As we create an element that needs to be animated, we push
  // it to the updatables so its tick function is run
    controls = createControls(camera, renderer.domElement);
    loop.updatables.push(controls);

    stats = createStats();
    loop.updatables.push(stats);

    const pointLight = createPointLight(0xffffff, { x: 20, y: 20, z: 20 });
    const lightHelper = createPointLightHelper(pointLight);
    const gridHelper = new createGridHelper();
    scene.add(pointLight, lightHelper, gridHelper);
    const resizer = new Resizer(container, camera, renderer);

    interactionManager = new InteractionManager(renderer, camera, renderer.domElement);
    interactionManager.tick = () => interactionManager.update();

  }

  async init() {
    // const book = await createBook();
    // book.name = "book"
    // scene.add(book);

    const box1 = createBox({
      name: "box1",
      interactionManager: interactionManager,
      size: 1,
      color: 'green',
      position: {x: 0, y: 0, z: 0},
      rotation: {x: 45, y: 45, z: 45},
    });

    const box2 = createBox({
      name: "box2",
      interactionManager: interactionManager,
      size: 1,
      color: 'yellow',
      position: {x: 3, y: 0, z: 0},
      rotation: {x: 45, y: 45, z: 45},
    });

    const box3 = createBox({
      name: "box3",
      interactionManager: interactionManager,
      size: 1,
      color: 'red',
      position: {x: -3, y: 0, z: 0},
      rotation: {x: 45, y: 45, z: 45},
    });

    scene.add(box1, box2, box3);
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

  move(objectName, translation) {
    const object = scene.getObjectByName(objectName);
    const coords = { x: object.position.x, y: object.position.y, z: object.position.z };
    const tween = new TWEEN.Tween(coords)
                .to({ x: object.position.x + translation.x, y: object.position.y + translation.y, z: object.position.z  + translation.z }, 2000)
                .easing(TWEEN.Easing.Quadratic.Out)
                .onUpdate(() => {
                  object.position.set(coords.x, coords.y, coords.z)
                }).start();
  }

  moveCamera90(direction) {
    // angle from positive z-axis in degrees
    let angleFromZAxis;
    if (camera.position.z > 0 && camera.position.x > 0) {
      angleFromZAxis = Number((Math.atan(camera.position.x/camera.position.z) * 180 / Math.PI).toFixed(4));
    } else if (camera.position.z <= 0 && camera.position.x > 0) {
      angleFromZAxis = Number((180 - Math.abs(Math.atan(camera.position.x/camera.position.z)) * 180 / Math.PI).toFixed(4));
    } else if (camera.position.z <= 0 && camera.position.x <= 0) {
      angleFromZAxis = Number((Math.abs(Math.atan(camera.position.x/camera.position.z)) * 180 / Math.PI + 180).toFixed(4));
    } else if (camera.position.z > 0 && camera.position.x <= 0) {
      angleFromZAxis = Number((360 - Math.abs(Math.atan(camera.position.x/camera.position.z)) * 180 / Math.PI).toFixed(4));
    }

    // find radial length
    const radialLength = Math.sqrt(camera.position.x**2 + camera.position.z**2);

    const delta = direction === 'left' ? -1 : 1;

    camera.position.x = Math.sin(degToRad((angleFromZAxis+delta)%360))*radialLength;
    camera.position.z = Math.cos(degToRad((angleFromZAxis+delta)%360))*radialLength;
  }
}

export { World };

// TODO Start stop camera animation in three.js
// TODO control animation with mouse
// TODO import 3rd party gltf with animation and play with animation handler in three js
// TODO control animation
// TODO Simple transform of solid in blender, animation with keyframes. Import and play
// TODO Animate page turn on book model
// TODO import, animate book
// TODO find bookshelf model
// TODO add animated books
// TODO textures in blender?
// TODO change function parameters to an object