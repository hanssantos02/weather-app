import './styles/main.css';
import { fetchWeather } from './api.js';

try {
  const data = await fetchWeather('Batangas, Philippines');
  console.log(data);
} catch (error) {
  console.error('An error occurred', error.message);
}
