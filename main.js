import { World } from './World';

async function main() {
  const container = document.querySelector('#scene-container');

  const world = new World(container);

  await world.init();

  world.start();

  document.addEventListener('keydown', (event) => {
    switch(event.key) {
      case 's':
        world.move('box1', { x: 0, y: -1, z: 0 });
        break;
      case 'd':
        world.move('box1', { x: 1, y: 0, z: 0 });
        break;
      case 'a':
        world.move('box1', { x: -1, y: 0, z: 0 });
        break;
      case 'w':
        world.move('box1', { x: 0, y: 1, z: 0 });
        break;
      case 'ArrowLeft':
        world.moveCamera90('left');
        break;
      case 'ArrowRight':
        world.moveCamera90('right');
      default:
        return;
    }
  })
}

main().catch((err) => {
  console.log(err);
})
