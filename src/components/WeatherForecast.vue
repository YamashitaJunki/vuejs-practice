<script setup lang="ts">
import { watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { availableCities } from '@/utiles/availableCities';

const route = useRoute();
const router = useRouter();
const cities = Object.keys(availableCities());
const cityNamelist = Object.entries(availableCities()).map((city) => {
  return city[1].name;
});
const selectedCityName = availableCities()[route.query.id].name;
const APIKEY = process.env.VUE_APP_OPEN_WEATHER_API_KEY;
if (!APIKEY) {
  throw new Error('環境変数が入っていません');
}

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
const weatherInfo = {
  name: weatherInfoList.name,
  icon: weatherInfoList.weather[0].icon,
  temp: Math.round(weatherInfoList.main.temp),
};

const selectCity = (selectedCity) => {
  const includeList = cities.filter((city) => availableCities()[city].name === selectedCity);
  router.push({ name: 'weatherForecast', query: { id: includeList } });
};

watch(
  () => route.query.id,
  () => {
    location.reload();
  }
);
const iconImage = `http://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png`;
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

  <table>
    <tr>
      <th>CITY</th>
      <th>WEATHER</th>
      <th>TEMP</th>
    </tr>
    <tr>
      <td>{{ selectedCityName }}</td>
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
