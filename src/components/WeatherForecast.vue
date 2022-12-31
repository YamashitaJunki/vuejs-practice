<script setup lang="ts">
import { weatherInfoController } from '@/utiles/weatherInfoController';
const weatherInfo = await weatherInfoController();
</script>

<template>
  <h1>Weather Forecast</h1>
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
