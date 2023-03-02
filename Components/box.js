import { BoxGeometry, MeshStandardMaterial, Mesh } from 'three';
import { randomHexColorCode } from '../utils/randomHex';

function degToRad (deg) {
  return deg * Math.PI / 180;
}
function createBox({name, interactionManager, size, color, position, rotation}) {
  const geometry = new BoxGeometry(size, size, size);
  const material = new MeshStandardMaterial({ color: color });
  const box = new Mesh(geometry, material);
  box.position.set(position.x , position.y , position.z);
  box.rotation.set(degToRad(rotation.x) , degToRad(rotation.y) , degToRad(rotation.z));

  box.name = name;

    box.addEventListener('click', (event) => {
      event.target.material.color.set(randomHexColorCode());
    })

    interactionManager.add(box);

  return box;
}

export { createBox };