<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
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
const push = () => {
  city.value = 'kyoto';
};
const sendai = 'sendai';
const kyoto = 'kyoto';
</script>

<template id="app">
  <h1>Weather Forecast</h1>

  <div>cityの値:{{ city }}</div>
  <div><router-link :to="{ name: 'weatherForecast', query: { id: sendai } }">クエリをsendaiに変更</router-link></div>
  <div><router-link :to="{ name: 'weatherForecast', query: { id: kyoto } }">クエリをkyotoに変更</router-link></div>

  <router-link :to="{ name: 'home' }">ホームに戻る</router-link>
  <div>
    <button @click="push">cityの値をsendaiに変更</button>
  </div>
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
