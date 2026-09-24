export function toContract(data) {
  const cc = data.currentConditions ?? {};
  return {
    location: data.resolvedAddress ?? 'Unknown',
    temp: cc.temp ?? 0,
    feelsLike: cc.feelslike ?? 0,
    conditions: cc.conditions ?? 'Unknown',
    humidity: cc.humidity ?? 0,
    windSpeed: cc.windspeed ?? 0,
    icon: cc.icon ?? 'Unknown',
    maxTemp: data.days?.[0]?.tempmax ?? 0,
  };
}
