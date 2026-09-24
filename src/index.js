import './styles/main.css';
import { fetchWeather } from './api.js';
import { toContract } from './process.js';
import { render, setStatus, clearCard } from './ui.js';

// const raw = await fetchWeather('Batangas, Philippines');
// console.log(toContract(raw));

const searchForm = document.querySelector('#search-form');
const unitBtn = document.querySelector('.unit-toggle');
let lastLocation = '';
let unit = 'us';

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const search = document.querySelector('#search-input').value.trim();
  if (!search) return;
  lastLocation = search;
  try {
    setStatus('Searching...', 'loading');
    const raw = await fetchWeather(search, unit);
    render(toContract(raw), unit);
    setStatus('', 'idle');
  } catch {
    setStatus('City not Found', 'error');
    clearCard();
  }
});

unitBtn.addEventListener('click', async () => {
  unit = unit === 'us' ? 'metric' : 'us';
  unitBtn.ariaPressed = String(unit === 'metric');
  if (!lastLocation) return;
  try {
    setStatus('Searching...', 'loading');
    const raw = await fetchWeather(lastLocation, unit);
    render(toContract(raw), unit);
    setStatus('', 'idle');
  } catch {
    setStatus('City not Found', 'error');
    clearCard();
  }
});
