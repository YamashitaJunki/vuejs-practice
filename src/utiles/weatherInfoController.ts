import { getWeatherInfo } from '@/utiles/getWeatherInfo';

type WeatherInfoControllerOut = {
  name: string;
  weather: string;
  temp: string;
};

export const weatherInfoController = async (): Promise<WeatherInfoControllerOut> => {
  const weatherInfoList = await getWeatherInfo();
  const weatherInfo = {
    name: weatherInfoList.name,
    weather: weatherInfoList.weather[0].main,
    temp: weatherInfoList.main.temp,
  };
  return weatherInfo;
};
