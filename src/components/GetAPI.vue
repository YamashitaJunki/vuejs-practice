<script setup lang="ts">
import { userDataController } from '@/utiles/userDataController';
const userData = await userDataController();
</script>

<template>
  <router-link :to="{ name: 'weatherForecast' }">天気予報ページ</router-link>
  <div v-for="(user, key) in userData" :key="key" className="user">
    <div>UserID: {{ user[0] }}</div>
    <div>Title: {{ user[1] }}</div>
  </div>
</template>

<style scoped lang="scss">
.user {
  text-align: left;
  width: 500px;
  background-color: rgb(188, 255, 255);
  margin: auto;
  padding: 2rem;
}
</style>
