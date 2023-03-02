import { MathUtils } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

async function createBook() {
  const radiansPerSecond = MathUtils.degToRad(30);

  const loader = new GLTFLoader();

  const [bookData] = await Promise.all([
    loader.loadAsync('/assets/books/book1/scene.gltf')
  ]);
  const book = bookData.scene;
  
  book.rotation.x = Math.PI/2;
  book.position.x = -0.4;
  book.position.y = 0.5;

  return book;
}

export { createBook };