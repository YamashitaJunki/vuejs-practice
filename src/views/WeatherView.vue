<script setup lang="ts">
import WeatherForecast from '@/components/WeatherForecast.vue';
</script>

<template>
  <suspense>
    <div><WeatherForecast /></div>
  </suspense>
</template>
