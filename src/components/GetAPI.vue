<script setup lang="ts">
const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
const json = await res.json();
</script>

<template>
  <div>UserID: {{ json.userId }}</div>
  <div>Title: {{ json.title }}</div>
  <div>completed:{{ json.completed }}</div>
</template>
