import { PointLightHelper } from 'three';

function createPointLightHelper(pointLight) {
  const pointLightHelper = new PointLightHelper(pointLight);

  return pointLightHelper;
}

export { createPointLightHelper };