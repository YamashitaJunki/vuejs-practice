<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Vue from 'vue';
const route = useRoute();
const APIKEY = process.env.VUE_APP_OPEN_WEATHER_API_KEY;
if (!APIKEY) {
  throw new Error('環境変数が入っていません');
}
const city = ref(route.query.id);
const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&appid=${APIKEY}`);
if (!res) {
  throw new Error('fetchの結果が空です');
}
if (res.status !== 200) {
  throw new Error('fetchに失敗しました');
}
const weatherInfoList = await res.json();
const weatherInfo = {
  name: weatherInfoList.name,
  weather: weatherInfoList.weather[0].main,
  temp: weatherInfoList.main.temp,
};
const aa = ref('aaaa');
const push = () => {
  city.value = 'sendai';
};
const sendai = 'sendai';
const kyoto = 'kyoto';
</script>

<template id="app">
  <h1>Weather Forecast</h1>

  <div>{{ city }}</div>
  <div>{{ aa }}</div>
  <div><router-link :to="{ name: 'weatherForecast', query: { id: sendai } }">仙台の天気</router-link></div>
  <div><router-link :to="{ name: 'weatherForecast', query: { id: kyoto } }">京都の天気</router-link></div>

  <router-link :to="{ name: 'home' }">ホームに戻る</router-link>
  <button @click="push">押してね</button>
  <table>
    <tr>
      <th>CITY</th>
      <th>WEATHER</th>
      <th>TEMP</th>
    </tr>
    <tr>
      <td>{{ weatherInfo.name }}</td>
      <td>{{ weatherInfo.weather }}</td>
      <td>{{ weatherInfo.temp }}</td>
    </tr>
  </table>
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
</style>
