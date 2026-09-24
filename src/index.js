import './styles/main.css';
import { fetchWeather } from './api.js';
import { toContract } from './process.js';
import { render, setStatus, clearCard } from './ui.js';

const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const unitF = document.querySelector('#unit-f');
const unitC = document.querySelector('#unit-c');
let lastLocation = '';
let unit = 'us';

function paintUnits() {
  unitF.setAttribute('aria-pressed', String(unit === 'us'));
  unitC.setAttribute('aria-pressed', String(unit === 'metric'));
}

async function runSearch(location) {
  try {
    setStatus('Reading the sky…', 'loading');
    const raw = await fetchWeather(location, unit);
    render(toContract(raw), unit);
    setStatus('', 'idle');
  } catch {
    setStatus('No reading for that place. Check the spelling and try again.', 'error');
    clearCard();
  }
}

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const search = searchInput.value.trim();
  if (!search) {
    setStatus('Type a place first — a city, postcode, or street.', 'error');
    searchInput.focus();
    return;
  }
  lastLocation = search;
  runSearch(search);
});

async function setUnit(next) {
  if (unit === next) return;
  unit = next;
  paintUnits();
  if (!lastLocation) return;
  await runSearch(lastLocation);
}

unitF.addEventListener('click', () => setUnit('us'));
unitC.addEventListener('click', () => setUnit('metric'));

paintUnits();
