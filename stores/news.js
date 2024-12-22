import { defineStore } from "pinia";

export const useNewsStore = defineStore("news", () => {
  const { apiBase } = useRuntimeConfig().public;
  const newsList = ref([]);

  const getData = async () => {
    const data = await $fetch(apiBase + "/api/v1/home/news");
    newsList.value = data.result;
  };

  return {
    newsList,
    getData,
  };
});
