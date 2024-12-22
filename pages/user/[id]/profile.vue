<template>
  <div>
    <NuxtLayout name="user-layout">
      <div class="row gap-6 gap-md-0">
        <div class="col-12 col-md-5">
          <section
            class="rounded-3xl d-flex flex-column gap-6 gap-md-10 p-6 p-md-10 bg-neutral-0"
          >
            <h2 class="fs-6 fs-md-5 fw-bold">修改密碼</h2>
            <div class="d-flex flex-column gap-4 gap-md-6">
              <div class="fs-8 fs-md-7">
                <p class="mb-2 text-neutral-80 fw-medium">電子信箱</p>
                <span
                  class="form-control pe-none p-0 text-neutral-100 fw-bold border-0"
                  >{{ form.email }}</span
                >
              </div>

              <div
                class="d-flex justify-content-between align-items-center"
                :class="{ 'd-none': isEditPassword }"
              >
                <div>
                  <label class="mb-0 text-neutral-80 fs-8 fs-md-7 fw-medium">
                    密碼
                  </label>
                  <input
                    class="form-control pe-none p-0 text-neutral-100 fs-5 fs-md-3 fw-bold border-0"
                    type="password"
                    value="**********"
                  />
                </div>

                <button
                  class="flex-shrink-0 text-primary-100 fs-8 fs-md-7 fw-bold text-decoration-underline border-0 bg-transparent"
                  type="button"
                  @click="isEditPassword = !isEditPassword"
                >
                  重設
                </button>
              </div>

              <div
                class="d-flex flex-column gap-4 gap-md-6"
                :class="{ 'd-none': !isEditPassword }"
              >
                <div>
                  <label
                    for="oldPassword"
                    class="form-label fs-8 fs-md-7 fw-bold"
                    >舊密碼</label
                  >
                  <input
                    id="oldPassword"
                    type="password"
                    class="form-control p-4 fs-7 rounded-3"
                    placeholder="請輸入舊密碼"
                    v-model="password.oldPassword"
                  />
                </div>

                <div>
                  <label
                    for="newPassword"
                    class="form-label fs-8 fs-md-7 fw-bold"
                    >新密碼</label
                  >
                  <input
                    id="newPassword"
                    type="password"
                    class="form-control p-4 fs-7 rounded-3"
                    placeholder="請輸入新密碼"
                    v-model="password.newPassword"
                  />
                </div>

                <div>
                  <label
                    for="confirmPassword"
                    class="form-label fs-8 fs-md-7 fw-bold"
                    >確認新密碼</label
                  >
                  <input
                    id="confirmPassword"
                    type="password"
                    class="form-control p-4 fs-7 rounded-3"
                    placeholder="請再輸入一次新密碼"
                    v-model="password.checkPassword"
                  />
                </div>
              </div>

              <button
                class="btn align-self-md-start px-8 py-4 rounded-3"
                type="button"
                :class="[
                  !disabledPwdBtn
                    ? 'btn-primary-100 text-neutral-0'
                    : 'disabled btn-neutral-40 text-neutral-60',
                  { 'd-none': !isEditPassword },
                ]"
                @click="updatePwd"
              >
                儲存設定
              </button>
            </div>
          </section>
        </div>

        <div class="col-12 col-md-7">
          <section
            class="rounded-3xl d-flex flex-column gap-6 gap-md-10 p-6 p-md-10 bg-neutral-0"
          >
            <h2 class="fs-6 fs-md-5 fw-bold">基本資料</h2>
            <div class="d-flex flex-column gap-4 gap-md-6">
              <div class="fs-8 fs-md-7">
                <label
                  class="form-label"
                  :class="{
                    'fw-bold text-neutral-100': isEditProfile,
                    'fw-medium text-neutral-80': !isEditProfile,
                  }"
                  for="name"
                >
                  姓名
                </label>
                <input
                  id="name"
                  name="name"
                  class="form-control text-neutral-100 fw-bold"
                  :class="{
                    'pe-none p-0 border-0': !isEditProfile,
                    'p-4': isEditProfile,
                  }"
                  type="text"
                  v-model="form.name"
                />
              </div>

              <div class="fs-8 fs-md-7">
                <label
                  class="form-label"
                  :class="{
                    'fw-bold text-neutral-100': isEditProfile,
                    'fw-medium text-neutral-80': !isEditProfile,
                  }"
                  for="phone"
                >
                  手機號碼
                </label>
                <input
                  id="phone"
                  name="phone"
                  class="form-control text-neutral-100 fw-bold"
                  :class="{
                    'pe-none p-0 border-0': !isEditProfile,
                    'p-4': isEditProfile,
                  }"
                  type="tel"
                  v-model="form.phone"
                />
              </div>

              <div class="fs-8 fs-md-7">
                <label
                  class="form-label"
                  :class="{
                    'fw-bold text-neutral-100': isEditProfile,
                    'fw-medium text-neutral-80': !isEditProfile,
                  }"
                  for="birth"
                >
                  生日
                </label>
                <span
                  class="form-control pe-none p-0 text-neutral-100 fw-bold border-0"
                  :class="{ 'd-none': isEditProfile }"
                  >{{
                    birthdayFormat(form.birthday, "YYYY 年 MM 月 DD 日")
                  }}</span
                >
                <div class="d-flex gap-2" :class="{ 'd-none': !isEditProfile }">
                  <select
                    id="birth"
                    class="form-select p-4 text-neutral-80 fw-medium rounded-3"
                    v-model="birth.year"
                  >
                    <option v-for="year in 65" :key="year" :value="year + 1958">
                      {{ year + 1958 }} 年
                    </option>
                  </select>
                  <select
                    class="form-select p-4 text-neutral-80 fw-medium rounded-3"
                    v-model="birth.month"
                  >
                    <option v-for="month in 12" :key="month" :value="month">
                      {{ month }} 月
                    </option>
                  </select>
                  <select
                    class="form-select p-4 text-neutral-80 fw-medium rounded-3"
                    v-model="birth.day"
                  >
                    <option v-for="day in 30" :key="day" :value="day">
                      {{ day }} 日
                    </option>
                  </select>
                </div>
              </div>

              <div class="fs-8 fs-md-7">
                <label
                  class="form-label"
                  :class="{
                    'fw-bold text-neutral-100': isEditProfile,
                    'fw-medium text-neutral-80': !isEditProfile,
                  }"
                  for="address"
                >
                  地址
                </label>
                <span
                  class="form-control pe-none p-0 text-neutral-100 fw-bold border-0"
                  :class="{ 'd-none': isEditProfile }"
                  >{{ cityName }}{{ areaName }}{{ form.address?.detail }}</span
                >

                <div :class="{ 'd-none': !isEditProfile }">
                  <div class="d-flex gap-2 mb-2">
                    <select
                      class="form-select p-4 text-neutral-80 fw-medium rounded-3"
                      v-model="cityName"
                    >
                      <option value="" selected disabled>請選擇</option>
                      <option
                        :value="city.CityName"
                        v-for="(city, index) in cityCountyData"
                        :key="index"
                      >
                        {{ city.CityName }}
                      </option>
                    </select>
                    <select
                      class="form-select p-4 text-neutral-80 fw-medium rounded-3"
                      v-model="form.address.zipcode"
                    >
                      <option value="" selected disabled>請選擇</option>
                      <option
                        :value="Number(area.ZipCode)"
                        v-for="area in areaList.AreaList"
                        :key="area.ZipCode"
                      >
                        {{ area.AreaName }}
                      </option>
                    </select>
                  </div>
                  <input
                    id="address"
                    type="text"
                    class="form-control p-4 rounded-3"
                    placeholder="請輸入詳細地址"
                    v-model="form.address.detail"
                  />
                </div>
              </div>
            </div>
            <button
              :class="{ 'd-none': isEditProfile }"
              class="btn btn-outline-primary-100 align-self-start px-8 py-4 rounded-3"
              type="button"
              @click="isEditProfile = !isEditProfile"
            >
              編輯
            </button>

            <button
              class="btn align-self-md-start px-8 py-4 rounded-3"
              type="button"
              :class="[
                !disabledUserBtn
                  ? 'btn-primary-100 text-neutral-0'
                  : 'disabled btn-neutral-40 text-neutral-60',
                { 'd-none': !isEditProfile },
              ]"
              @click="updateUser"
            >
              儲存設定
            </button>
          </section>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup>
const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);
const isEditPassword = ref(false);
const isEditProfile = ref(false);
import cityCountyData from "public/json/cityCountyData";

if (!userInfo.value._id) {
  userStore.getUserInfo();
}

const form = ref({
  address: {},
});
const password = ref({
  oldPassword: "",
  newPassword: "",
  checkPassword: "",
});
const disabledPwdBtn = computed(() => {
  return (
    !password.value.oldPassword ||
    !password.value.newPassword ||
    !password.value.checkPassword ||
    password.value.newPassword !== password.value.checkPassword
  );
});
const updatePwd = () => {
  userStore.updateUserInfo({
    userId: form.value._id,
    oldPassword: password.value.oldPassword,
    newPassword: password.value.newPassword,
  });
  isEditPassword.value = !isEditPassword.value;
};

const birth = ref({
  year: 1959,
  month: 1,
  day: 1,
});
const birthdayFormat = (timer, format = "YYYY/MM/DD") => {
  const year = new Date(timer).getFullYear();
  const month = new Date(timer).getMonth() + 1;
  const day = new Date(timer).getDate();

  return timer
    ? format.replace("YYYY", year).replace("MM", month).replace("DD", day)
    : "";
};

const cityName = ref("");
const areaName = ref("");
// const areaList = ref({ AreaList: [] });
const areaList = computed(() => {
  return (
    cityCountyData.find((item) => item.CityName === cityName.value) || {
      AreaList: [],
    }
  );
});

watch(
  () => userInfo.value,
  () => {
    form.value = JSON.parse(JSON.stringify(userInfo.value));

    cityCountyData.forEach((city) => {
      const currentCity = city.AreaList.find(
        (area) => Number(area.ZipCode) === Number(form.value.address.zipcode)
      );

      if (currentCity) {
        cityName.value = city.CityName;
        areaName.value = currentCity.AreaName;
      }
    });

    birth.value.year = new Date(form.value.birthday).getFullYear();
    birth.value.month = new Date(form.value.birthday).getMonth() + 1;
    birth.value.day = new Date(form.value.birthday).getDate();
  }
);

const disabledUserBtn = computed(() => {
  return (
    !form.value.name ||
    !form.value.phone ||
    !form.value.address.zipcode ||
    !form.value.address.detail
  );
});

const updateUser = () => {
  userStore.updateUserInfo({
    userId: form.value._id,
    name: form.value.name,
    phone: form.value.phone,
    name: form.value.name,
    address: form.value.address,
    birthday: birthdayFormat(form.value.birthday),
  });
  isEditProfile.value = !isEditProfile.value;
};
</script>

<style lang="scss" scoped>
.rounded-3xl {
  border-radius: 1.25rem;
}

input[type="password"] {
  font: small-caption;
}

.form-control::placeholder {
  --neutral-60: #909090;
  color: var(--neutral-60);
  font-weight: 500;
}
</style>
