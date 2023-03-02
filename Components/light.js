import { PointLight } from 'three';

function createPointLight(color, position) {
  const pointLight = new PointLight({ color: color });
  pointLight.position.set(position.x, position.y, position.z);

  return pointLight;
}

export { createPointLight };