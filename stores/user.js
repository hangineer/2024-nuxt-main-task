import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const { apiBase } = useRuntimeConfig().public;
  const userInfo = ref({});
  const isLogin = ref(false);

  const signup = async (body) => {
    try {
      await $fetch(apiBase + "/api/v1/user/signup", {
        method: "POST",
        body,
      });
      // const swal = await useSwal({
      //   title: "註冊成功",
      //   showConfirmButton: false,
      //   timer: 3000,
      // });
      // if (swal.isDismissed) {
      //   useRouter().push("/account/login");
      // }
    } catch (error) {
      // useSwal({
      //   icon: "error",
      //   title: "註冊失敗",
      //   showConfirmButton: false,
      //   timer: 3000,
      // });
    }
  };

  const login = async (body) => {
    try {
      const res = await $fetch(apiBase + "/api/v1/user/login", {
        method: "POST",
        body,
      });

      userInfo.value = res.result;
      const token = useCookie("token");
      token.value = res.token;

      // const swal = await useSwal({
      //   title: "登入成功",
      //   showConfirmButton: false,
      //   timer: 3000,
      // });
      // if (swal.isDismissed) {
      //   isLogin.value = true;
      // }
    } catch (error) {
      isLogin.value = false;
      // useSwal({
      //   icon: "error",
      //   title: "登入失敗",
      //   showConfirmButton: false,
      //   timer: 3000,
      // });
    }
  };

  const check = async () => {
    try {
      const res = await $fetch(apiBase + "/api/v1/user/check", {
        method: "GET",
        headers: {
          authorization: useCookie("token").value || "",
        },
      });
      const token = useCookie("token");
      token.value = res.token;
      isLogin.value = true;
    } catch (error) {
      isLogin.value = false;
    }
  };

  const getUserInfo = async (body) => {
    try {
      const res = await $fetch(apiBase + "/api/v1/user", {
        method: "GET",
        headers: {
          authorization: useCookie("token").value || "",
        },
      });
      userInfo.value = res.result;
    } catch (error) {}
  };

  const updateUserInfo = async (body) => {
    try {
      const res = await $fetch(apiBase + "/api/v1/user", {
        method: "PUT",
        body,
        headers: {
          authorization: useCookie("token").value || "",
        },
      });
      userInfo.value = res.result;
      // useSwal({
      //   title: "修改成功",
      //   showConfirmButton: false,
      //   timer: 3000,
      // });
    } catch (error) {
      // useSwal({
      //   icon: "error",
      //   title: "修改失敗",
      //   showConfirmButton: false,
      //   timer: 3000,
      // });
    }
  };

  const signout = async () => {
    // const swal = await useSwal({
    //   title: "登出成功",
    //   showConfirmButton: false,
    //   timer: 3000,
    // });
    // if (swal.isDismissed) {
    //   const token = useCookie("token");
    //   token.value = null;
    //   isLogin.value = false;
    //   userInfo.value = {};
    //   useRouter().push("/");
    // }
  };

  return {
    userInfo,
    isLogin,
    signup,
    login,
    check,
    getUserInfo,
    updateUserInfo,
    signout,
  };
});
