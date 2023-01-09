<script setup lang="ts">
import { watch, ref } from 'vue';
import { useRoute } from 'vue-router';
import { availableCities } from '@/utiles/availableCities';
import citySelectForm from './citySelectForm.vue';

type GetWeatherInfoOut = {
  name: string;
  weather: Array<{ icon: string }>;
  main: {
    temp: number;
  };
};
type WeatherInfoControllerOut = {
  selectedCityName: string;
  iconImage: string;
  temp: number;
};

const route = useRoute();
watch(
  () => route.query.id,
  () => {
    location.reload();
  }
);

const getWeatherInfo = async (): Promise<GetWeatherInfoOut> => {
  const APIKEY = process.env.VUE_APP_OPEN_WEATHER_API_KEY;
  if (!APIKEY) {
    throw new Error('環境変数が入っていません');
  }
  const city = ref(route.query.id);
  if (!route.query.id) {
    city.value = 'sapporo';
  }
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&appid=${APIKEY}`
  );
  if (!res) {
    throw new Error('fetchの結果が空です');
  }
  if (res.status !== 200) {
    throw new Error('fetchに失敗しました');
  }
  return await res.json();
};

const weatherInfoController = async (): Promise<WeatherInfoControllerOut> => {
  const weatherInfoList = await getWeatherInfo();
  const weatherInfo = {
    name: weatherInfoList.name,
    icon: weatherInfoList.weather[0]?.icon,
    temp: Math.round(weatherInfoList.main?.temp),
  };
  return {
    selectedCityName: availableCities()[weatherInfo.name.toLowerCase()].name,
    iconImage: `http://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png`,
    temp: weatherInfo.temp,
  };
};

const weatherInfo = await weatherInfoController();
</script>

<template>
  <h1>Weather Forecast</h1>
  <citySelectForm />
  <h1>{{ weatherInfo.selectedCityName }}</h1>
  <table>
    <tr>
      <th>WEATHER</th>
      <th>TEMP</th>
    </tr>
    <tr>
      <td><img :src="weatherInfo.iconImage" /></td>
      <td>{{ weatherInfo.temp }}℃</td>
    </tr>
  </table>
  <div>
    <router-link :to="{ name: 'home' }">ホームに戻る</router-link>
  </div>
</template>

<style>
table {
  margin: auto;
  width: 60%;
  border-radius: 20px;
  background-color: aqua;
  table-layout: fixed;
}
table th {
  padding: 1rem;
}
table td {
  padding: 1rem;
}
.form {
  margin: 2rem;
  width: 300px;
}
</style>
