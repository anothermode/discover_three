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

  book.newPosition = { x: book.position.x, y: book.position.y, z: book.position.y };


  const speed = 1;

  book.tick = (delta) => {
    book.rotation.x += radiansPerSecond * delta;
    book.rotation.y += radiansPerSecond * delta;
    book.rotation.z += radiansPerSecond * delta;

    if (book.newPosition.x !== book.position.x) {
      if (Math.abs(book.position.x - book.newPosition.x) < delta * speed) {
        book.position.x = book.newPosition.x;
      } else {
      // incrementally closer to new point
        book.position.x = delta * speed * Math.sign(book.newPosition.x - book.position.x);
      }
    }
  }

  return book;
}

export { createBook };