export function render(contract, unit) {
  const weatherCard = document.querySelector('.weather-card');
  const label = unit === 'us' ? '°F' : '°C';
  weatherCard.innerHTML = '';
  const location = document.createElement('p');
  const temp = document.createElement('p');
  const feelsLike = document.createElement('p');
  const conditions = document.createElement('p');
  const humidity = document.createElement('p');
  const windSpeed = document.createElement('p');
  const icon = document.createElement('p');
  const maxTemp = document.createElement('p');

  location.textContent = contract.location;
  temp.textContent = `${contract.temp}${label}`;
  feelsLike.textContent = `${contract.feelsLike}${label}`;
  conditions.textContent = contract.conditions;
  humidity.textContent = `${contract.humidity}%`;
  windSpeed.textContent = `${contract.windSpeed}mph`;
  icon.textContent = contract.icon;
  maxTemp.textContent = `${contract.maxTemp}${label}`;

  location.classList.add('meta');
  temp.classList.add('temp');
  feelsLike.classList.add('temp');
  conditions.classList.add('meta');
  humidity.classList.add('meta');
  windSpeed.classList.add('meta');
  icon.classList.add('meta');
  maxTemp.classList.add('temp');

  weatherCard.append(location, temp, feelsLike, conditions, humidity, windSpeed, icon, maxTemp);
  document.body.dataset.conditions = contract.icon;
}

export function setStatus(message, state = 'idle') {
  const status = document.querySelector('.status');
  if (state === 'loading') {
    status.innerHTML = '<span class="spinner" aria-hidden="true"></span> Searching...';
  } else {
    status.textContent = message;
  }
  status.dataset.state = state;
}

export function clearCard() {
  document.querySelector('.weather-card').innerHTML = '';
}
