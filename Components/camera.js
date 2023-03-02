import { PerspectiveCamera } from 'three';

function createCamera({ FoV, aspectRatio, nearFrustrum, farFrustrum, position }) {
  const camera = new PerspectiveCamera(FoV, aspectRatio, nearFrustrum, farFrustrum);

  camera.position.x = position.x;
  camera.position.y = position.y;
  camera.position.z = position.z;

  return camera;
}

export { createCamera };