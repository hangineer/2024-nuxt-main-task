import { defineStore } from "pinia";

export const useCulinaryStore = defineStore("culinary", () => {
  const { apiBase } = useRuntimeConfig().public;
  const culinaryList = ref([]);

  const getData = async () => {
    const data = await $fetch(apiBase + "/api/v1/home/culinary");
    culinaryList.value = data.result;
  };

  return {
    culinaryList,
    getData,
  };
});
