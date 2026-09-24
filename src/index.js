import './styles/main.css';
import logoUrl from './assets/logo.svg';

function setupCounter(button) {
  let count = 0;
  const render = () => {
    button.textContent = `Count is ${count}`;
  };
  button.addEventListener('click', () => {
    count += 1;
    render();
  });
  render();
}

function main() {
  // Demonstrates that asset imports + Babel output work.
  // `logoUrl` is the bundled URL for src/assets/logo.svg.
  // eslint-disable-next-line no-console
  console.log('Logo asset resolved to:', logoUrl);

  const button = document.querySelector('#counter-btn');
  if (button) setupCounter(button);
}

document.addEventListener('DOMContentLoaded', main);
