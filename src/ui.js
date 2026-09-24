const ICONS = {
  'clear-day':
    '<circle cx="12" cy="12" r="4.4"/><path d="M12 2.8v2.6M12 18.6v2.6M2.8 12h2.6M18.6 12h2.6M5.5 5.5l1.8 1.8M16.7 16.7l1.8 1.8M18.5 5.5l-1.8 1.8M7.3 16.7l-1.8 1.8"/>',
  'clear-night':
    '<path d="M19.5 14.5A7.5 7.5 0 0 1 9.5 4.5a7.5 7.5 0 1 0 10 10Z"/><path d="M17.5 3.5l.6 1.6 1.6.6-1.6.6-.6 1.6-.6-1.6-1.6-.6 1.6-.6Z"/>',
  'partly-cloudy-day':
    '<circle cx="8.5" cy="8.5" r="3.2"/><path d="M8.5 2.8v1.8M2.8 8.5h1.8M4.5 4.5l1.3 1.3M12.5 4.5l-1.3 1.3"/><path d="M8 18.5h8.5a3.5 3.5 0 0 0 .6-6.9 5 5 0 0 0-9.7 1.1 2.8 2.8 0 0 0 .6 5.8Z"/>',
  'partly-cloudy-night':
    '<path d="M13.5 3.5A4.5 4.5 0 0 1 7.4 7.2a4.5 4.5 0 1 0 7.6 3.9"/><path d="M9 19.5h7.5a3 3 0 0 0 .5-5.9 4.3 4.3 0 0 0-8.3 1 2.4 2.4 0 0 0 .3 4.9Z"/>',
  cloudy:
    '<path d="M6.5 18.5h11a4 4 0 0 0 .7-7.9 5.8 5.8 0 0 0-11.3 1.2 3.2 3.2 0 0 0-.4 6.7Z"/>',
  rain: '<path d="M6.5 15.5h11a4 4 0 0 0 .7-7.9 5.8 5.8 0 0 0-11.3 1.2 3.2 3.2 0 0 0-.4 6.7Z"/><path d="M8 18.5l-1 2.5M12.5 18.5l-1 2.5M17 18.5l-1 2.5"/>',
  'showers-day':
    '<path d="M6.5 15.5h11a4 4 0 0 0 .7-7.9 5.8 5.8 0 0 0-11.3 1.2 3.2 3.2 0 0 0-.4 6.7Z"/><path d="M8 18.5l-1 2.5M12.5 18.5l-1 2.5M17 18.5l-1 2.5"/>',
  'showers-night':
    '<path d="M6.5 15.5h11a4 4 0 0 0 .7-7.9 5.8 5.8 0 0 0-11.3 1.2 3.2 3.2 0 0 0-.4 6.7Z"/><path d="M8 18.5l-1 2.5M12.5 18.5l-1 2.5M17 18.5l-1 2.5"/>',
  'thunder-rain':
    '<path d="M6.5 15.5h11a4 4 0 0 0 .7-7.9 5.8 5.8 0 0 0-11.3 1.2 3.2 3.2 0 0 0-.4 6.7Z"/><path d="M12.5 13.5l-3 5h4l-3 5"/>',
  'thunder-showers-day':
    '<path d="M6.5 15.5h11a4 4 0 0 0 .7-7.9 5.8 5.8 0 0 0-11.3 1.2 3.2 3.2 0 0 0-.4 6.7Z"/><path d="M12.5 13.5l-3 5h4l-3 5"/>',
  'thunder-showers-night':
    '<path d="M6.5 15.5h11a4 4 0 0 0 .7-7.9 5.8 5.8 0 0 0-11.3 1.2 3.2 3.2 0 0 0-.4 6.7Z"/><path d="M12.5 13.5l-3 5h4l-3 5"/>',
  snow: '<path d="M6.5 15.5h11a4 4 0 0 0 .7-7.9 5.8 5.8 0 0 0-11.3 1.2 3.2 3.2 0 0 0-.4 6.7Z"/><path d="M8 18.5v3M12 18.5v3M16 18.5v3M8 19.2l2.5 1.6M8 21l2.5-1.6"/>',
  sleet:
    '<path d="M6.5 15.5h11a4 4 0 0 0 .7-7.9 5.8 5.8 0 0 0-11.3 1.2 3.2 3.2 0 0 0-.4 6.7Z"/><path d="M8.5 18.5h.01M12 19.5h.01M15.5 18.5h.01M10 21h.01M14 21h.01"/>',
  wind: '<path d="M3 9.5h11a2.8 2.8 0 1 0-2.7-3.6M3 13.5h15a2.8 2.8 0 1 1-2.7 3.6M3 17.5h7"/>',
  fog: '<path d="M4 10h16M6 13.5h12M4 17h16"/><circle cx="12" cy="6.5" r="2.5"/>',
};

function iconSvg(icon) {
  const paths = ICONS[icon] ?? ICONS.cloudy;
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths}</g></svg>`;
}

function fmt(value, label) {
  if (typeof value !== 'number' || Number.isNaN(value)) return `—${label}`;
  return `${Math.round(value)}${label}`;
}

export function render(contract, unit) {
  const weatherCard = document.querySelector('.weather-card');
  const label = unit === 'us' ? '°F' : '°C';
  const windUnit = unit === 'us' ? 'mph' : 'kph';
  weatherCard.innerHTML = '';

  const head = document.createElement('div');
  head.className = 'plate-head';

  const placeWrap = document.createElement('div');
  placeWrap.className = 'place-wrap';
  const location = document.createElement('p');
  location.className = 'place';
  location.textContent = contract.location;
  const conditions = document.createElement('p');
  conditions.className = 'cond';
  conditions.textContent = contract.conditions;
  placeWrap.append(location, conditions);

  const icon = document.createElement('div');
  icon.className = 'cond-icon';
  icon.innerHTML = iconSvg(contract.icon);
  const iconCaption = document.createElement('span');
  iconCaption.className = 'visually-hidden';
  iconCaption.textContent = contract.icon.replace(/-/g, ' ');
  icon.append(iconCaption);

  head.append(placeWrap, icon);

  const tempRow = document.createElement('div');
  tempRow.className = 'temp-row';
  const temp = document.createElement('p');
  temp.className = 'big-temp';
  temp.innerHTML = `<span class="big-num">${fmt(contract.temp, '')}</span><span class="big-unit">${label}</span>`;
  const tempSub = document.createElement('div');
  tempSub.className = 'temp-sub';
  const feelsLike = document.createElement('p');
  feelsLike.innerHTML = `<span>Feels ${fmt(contract.feelsLike, label)}</span>`;
  const maxTemp = document.createElement('p');
  maxTemp.innerHTML = `<span>High ${fmt(contract.maxTemp, label)}</span>`;
  tempSub.append(feelsLike, maxTemp);
  tempRow.append(temp, tempSub);

  const list = document.createElement('dl');
  list.className = 'instruments';
  const items = [
    ['Feels like', fmt(contract.feelsLike, label)],
    ['High today', fmt(contract.maxTemp, label)],
    ['Humidity', `${contract.humidity ?? '—'}%`],
    ['Wind', `${contract.windSpeed ?? '—'} ${windUnit}`],
  ];
  for (const [term, value] of items) {
    const wrap = document.createElement('div');
    const dt = document.createElement('dt');
    dt.textContent = term;
    const dd = document.createElement('dd');
    dd.textContent = value;
    wrap.append(dt, dd);
    list.append(wrap);
  }

  weatherCard.append(head, tempRow, list);
  weatherCard.dataset.ready = 'true';
  document.body.dataset.conditions = contract.icon;
}

export function setStatus(message, state = 'idle') {
  const status = document.querySelector('.status');
  if (state === 'loading') {
    status.innerHTML = '<span class="spinner" aria-hidden="true"></span> Reading the sky…';
  } else {
    status.textContent = message;
  }
  status.dataset.state = state;
}

export function clearCard() {
  const card = document.querySelector('.weather-card');
  card.innerHTML = '';
  delete card.dataset.ready;
}
