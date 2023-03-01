import { World } from './World';

async function main() {
  const container = document.querySelector('#scene-container');

  const world = new World(container);

  await world.init();

  world.start();

  // document.querySelector("#scene-container").addEventListener("click", () => {
  //   const object = world.getObjectByName('book');
  //   console.log(object);
  //   object.position.x += 0.5
  // });

  document.querySelector("#scene-container").addEventListener("click", () => {
    world.moveObjectSlow("book");
  })
}

main().catch((err) => {
  console.log(err);
})
