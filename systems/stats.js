import Stats from 'stats.js';

function createStats() {
  const stats = new Stats();

  document.body.appendChild(stats.dom);

  stats.tick = () => {
    stats.begin();
    stats.end();
  }

  return stats;
}

export { createStats };