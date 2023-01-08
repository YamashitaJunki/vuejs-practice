<script setup lang="ts">
import { watch, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { availableCities } from '@/utiles/availableCities';

const route = useRoute();
const router = useRouter();
const APIKEY = process.env.VUE_APP_OPEN_WEATHER_API_KEY;
if (!APIKEY) {
  throw new Error('環境変数が入っていません');
}

const getWeatherInfo = async () => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${route.query.id}&units=metric&appid=${APIKEY}`
  );
  if (!res) {
    throw new Error('fetchの結果が空です');
  }
  if (res.status !== 200) {
    throw new Error('fetchに失敗しました');
  }
  const weatherInfoList = await res.json();
  return weatherInfoList;
};

const weatherController = async () => {
  const weatherInfoList = await getWeatherInfo();
  const weatherInfo = {
    name: weatherInfoList.name,
    icon: weatherInfoList.weather[0].icon,
    temp: Math.round(weatherInfoList.main.temp),
  };
  return weatherInfo;
};

const selectCity = (selectedCity) => {
  const cities = Object.keys(availableCities());
  const includeList = cities.filter((city) => availableCities()[city].name === selectedCity);
  router.push({ name: 'weatherForecast', query: { id: includeList } });
};
const text = ref('');
const cityNamelist = Object.entries(availableCities()).map((city) => {
  return city[1].name;
});
const weatherInfo = await weatherController();
const selectedCityName = availableCities()[weatherInfo.name.toLowerCase()].name;
const iconImage = `http://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png`;

watch(
  () => route.query.id,
  () => {
    location.reload();
  }
);
</script>

<template id="app">
  <h1>Weather Forecast</h1>
  <input
    class="form"
    id="name"
    v-model="text"
    list="item"
    placeholder="例：北海道/札幌市"
    autoComplete="off"
    @change="selectCity(text)"
  />

  <datalist id="item">
    <div id="item" v-for="(city, key) in cityNamelist" :key="key" className="user">
      <option>{{ city }}</option>
    </div>
  </datalist>
  <h1>{{ selectedCityName }}</h1>
  <table>
    <tr>
      <th>WEATHER</th>
      <th>TEMP</th>
    </tr>
    <tr>
      <td><img :src="iconImage" /></td>
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
}
</style>
