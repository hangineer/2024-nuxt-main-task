import { defineStore } from "pinia";

export const useOrdersStore = defineStore("orders", () => {
  const { apiBase } = useRuntimeConfig().public;
  const orderInfo = ref({});
  const allOrders = ref([]);

  const createOrder = async (body) => {
    try {
      const data = await $fetch(apiBase + "/api/v1/orders", {
        method: "POST",
        body,
        headers: {
          authorization: useCookie("token").value || "",
        },
      });
      orderInfo.value = data.result;
    } catch (error) {
      // useSwal({
      //   icon: 'error',
      //   title: '訂房失敗',
      //   showConfirmButton: false,
      //   timer: 3000,
      // });
    }
  };

  const getOrderInfo = async (id) => {
    const data = await $fetch(apiBase + `/api/v1/orders/${id}`, {
      method: "GET",
      headers: {
        authorization: useCookie("token").value || "",
      },
    });
    orderInfo.value = data.result;
  };

  const getAllOrder = async () => {
    const data = await $fetch(apiBase + `/api/v1/orders`, {
      method: "GET",
      headers: {
        authorization: useCookie("token").value || "",
      },
    });
    allOrders.value = data.result;
  };

  const deleteOrder = async (id) => {
    try {
      await $fetch(apiBase + `/api/v1/orders/${id}`, {
        method: "DELETE",
        headers: {
          authorization: useCookie("token").value || "",
        },
      });

      // await useSwal({
      //   title: "取消預訂成功",
      //   showConfirmButton: false,
      //   timer: 3000,
      // });
    } catch (error) {
      // useSwal({
      //   icon: "error",
      //   title: "取消預訂失敗",
      //   showConfirmButton: false,
      //   timer: 3000,
      // });
    }
  };

  return {
    orderInfo,
    allOrders,
    createOrder,
    getOrderInfo,
    getAllOrder,
    deleteOrder,
  };
});
