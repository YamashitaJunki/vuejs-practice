const APIKEY = process.env.VUE_APP_OPEN_WEATHER_API_KEY;
if (!APIKEY) {
  throw new Error('環境変数が入っていません');
}

type GetWeatherInfoOut = {
  name: string;
  weather: Array<{ main: string }>;
  main: {
    temp: string;
  };
};
type WeatherInfo = {
  name: string;
  weather: Array<{ main: string }>;
  main: {
    temp: string;
  };
};

export const getWeatherInfo = async (): Promise<GetWeatherInfoOut> => {
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=sapporo&units=metric&appid=${APIKEY}`);
  if (!res) {
    throw new Error('fetchの結果が空です');
  }
  if (res.status !== 200) {
    throw new Error('fetchに失敗しました');
  }
  const weatherInfo = (await res.json()) as WeatherInfo;
  return weatherInfo;
};
