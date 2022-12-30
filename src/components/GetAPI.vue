<script setup lang="ts">
import { userDataController } from '@/utiles/userDataController';
const userData = await userDataController();
</script>

<template>
  <div v-for="(user, key) in userData" :key="key">
    <div>UserID: {{ user[0] }}</div>
    <div>Title: {{ user[1] }}</div>
  </div>
</template>
