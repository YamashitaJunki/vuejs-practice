<script setup lang="ts">
import GetAPI from '@/components/GetAPI.vue';
</script>

<template>
  <suspense>
    <div class="home"><GetAPI /></div>
  </suspense>
</template>
