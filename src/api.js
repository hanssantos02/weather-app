export async function fetchWeather(location, unit = 'us') {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?unitGroup=${unit}&key=${getKey()}&contentType=json`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  const data = await res.json();
  return data;
}

function getKey() {
  let key = localStorage.getItem('vcKey');
  if (!key) {
    key = prompt('Paste your Visual Crossing API');
    localStorage.setItem('vcKey', key);
  }
  return key;
}
