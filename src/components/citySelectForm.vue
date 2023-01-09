<script setup lang="ts">
import { ref } from 'vue';
import { availableCities } from '@/utiles/availableCities';
import { useRouter } from 'vue-router';
import { Search } from '@element-plus/icons-vue';

const router = useRouter();
const text = ref('');
const cityNamelist = Object.entries(availableCities()).map((city) => {
  return city[1].name;
});
const selectCity = (selectedCity: string): void => {
  const includeList = Object.keys(availableCities()).filter((city) => availableCities()[city].name === selectedCity);
  router.push({ name: 'weatherForecast', query: { id: includeList } });
};
</script>

<template>
  <el-input
    class="form"
    v-model="text"
    list="item"
    placeholder="例：北海道/札幌市"
    autoComplete="off"
    @change="selectCity(text)"
    :prefix-icon="Search"
  />
  <datalist id="item">
    <div v-for="(city, key) in cityNamelist" :key="key">
      <option>{{ city }}</option>
    </div>
  </datalist>
</template>

<style scoped lang="scss">
.form {
  margin: 2rem;
  width: 300px;
}
</style>
