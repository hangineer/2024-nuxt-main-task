<template>
  <div>
    <NuxtLayout name="user-layout">
      <div class="row gap-6 gap-md-0">
        <div class="col-12 col-md-7">
          <div
            class="rounded-3xl d-flex flex-column gap-6 gap-md-10 p-4 p-md-10 bg-neutral-0"
            style="max-width: 730px"
            v-if="nextOrder._id"
          >
            <div>
              <p class="mb-2 text-neutral-80 fs-8 fs-md-7 fw-medium">
                預訂參考編號： {{ nextOrder._id }}
              </p>
              <h2 class="mb-0 text-neutral-100 fs-7 fs-md-5 fw-bold">
                即將來的行程
              </h2>
            </div>

            <img
              class="img-fluid rounded-3"
              :src="nextOrder.roomId.imageUrl"
              :alt="nextOrder.roomId.name"
            />

            <section class="d-flex flex-column gap-6">
              <h3
                class="d-flex align-items-center mb-0 text-neutral-80 fs-8 fs-md-6 fw-bold"
              >
                <p class="mb-0">
                  {{ nextOrder.roomId.name }}，{{
                    getDaysCount(nextOrder.checkInDate, nextOrder.checkOutDate)
                  }}
                  晚
                </p>
                <span
                  class="d-inline-block mx-4 bg-neutral-80"
                  style="width: 1px; height: 18px"
                />
                <p class="mb-0">住宿人數：{{ nextOrder.peopleNum }} 位</p>
              </h3>

              <div class="text-neutral-80 fs-8 fs-md-7 fw-bold">
                <p class="title-deco mb-2">
                  入住：{{ timeFormat(nextOrder.checkInDate) }}，15:00 可入住
                </p>
                <p class="title-deco mb-0">
                  退房：{{ timeFormat(nextOrder.checkOutDate) }}，12:00 前退房
                </p>
              </div>

              <p class="mb-0 text-neutral-80 fs-8 fs-md-7 fw-bold">
                NT$
                {{
                  useMoneyFormat(
                    nextOrder.roomId.price *
                      getDaysCount(
                        nextOrder.checkInDate,
                        nextOrder.checkOutDate
                      )
                  )
                }}
              </p>
            </section>

            <hr class="my-0 opacity-100 text-neutral-40" />

            <section>
              <h3 class="title-deco mb-6 text-neutral-100 fs-8 fs-md-7 fw-bold">
                房內設備
              </h3>
              <ul
                class="d-flex flex-wrap row-gap-2 column-gap-10 p-6 mb-0 fs-8 fs-md-7 bg-neutral-0 border border-neutral-40 rounded-3 list-unstyled"
              >
                <li
                  class="flex-item d-flex gap-2"
                  v-for="(facility, index) in nextOrder.roomId.facilityInfo"
                  :key="index"
                >
                  <Icon
                    class="fs-5 text-primary-100"
                    :name="`material-symbols:${
                      facility.isProvide ? 'check' : 'close'
                    }`"
                  />
                  <p class="mb-0 text-neutral-80 fw-bold">
                    {{ facility.title }}
                  </p>
                </li>
              </ul>
            </section>

            <section>
              <h3 class="title-deco mb-6 text-neutral-100 fs-8 fs-md-7 fw-bold">
                備品提供
              </h3>
              <ul
                class="d-flex flex-wrap row-gap-2 column-gap-10 p-6 mb-0 fs-8 fs-md-7 bg-neutral-0 border border-neutral-40 rounded-3 list-unstyled"
              >
                <li
                  class="flex-item d-flex gap-2"
                  v-for="(amenity, index) in nextOrder.roomId.amenityInfo"
                  :key="index"
                >
                  <Icon
                    class="fs-5 text-primary-100"
                    :name="`material-symbols:${
                      amenity.isProvide ? 'check' : 'close'
                    }`"
                  />
                  <p class="mb-0 text-neutral-80 fw-bold">
                    {{ amenity.title }}
                  </p>
                </li>
              </ul>
            </section>

            <div class="d-flex gap-4">
              <button
                data-bs-toggle="modal"
                data-bs-target="#cancelModal"
                class="btn btn-outline-primary-100 w-50 py-4 fw-bold"
                style="--bs-btn-hover-color: #fff"
                type="button"
              >
                取消預訂
              </button>
              <NuxtLink
                :to="{
                  name: 'rooms-roomId',
                  params: {
                    roomId: nextOrder.roomId._id,
                  },
                }"
                class="btn btn-primary-100 text-neutral-0 w-50 py-4 fw-bold"
                type="button"
              >
                查看詳情
              </NuxtLink>
            </div>
          </div>
          <div
            class="rounded-3xl d-flex flex-column gap-6 gap-md-10 p-4 p-md-10 bg-neutral-0"
            style="max-width: 730px"
            v-else
          >
            暫無行程
          </div>
        </div>
        <div class="col-12 col-md-5">
          <div
            class="rounded-3xl d-flex flex-column gap-6 gap-md-10 p-4 p-md-10 bg-neutral-0"
          >
            <h2 class="mb-0 text-neutral-100 fs-7 fs-md-5 fw-bold">歷史訂單</h2>

            <template
              v-for="(item, index) in showMore
                ? allOrders.filter((item) => item.status >= 0)
                : threeOrder"
              :key="item._id"
            >
              <div class="d-flex flex-column flex-lg-row gap-6">
                <img
                  class="img-fluid object-fit-cover rounded-3"
                  style="max-width: 120px; height: 80px"
                  :src="item.roomId.imageUrl"
                  :alt="item.roomId.name"
                />
                <section class="d-flex flex-column gap-4">
                  <p class="mb-0 text-neutral-80 fs-8 fs-md-7 fw-medium">
                    預訂參考編號： {{ item._id }}
                  </p>

                  <h3
                    class="d-flex align-items-center mb-0 text-neutral-80 fs-8 fs-md-6 fw-bold"
                  >
                    {{ item.roomId.name }}
                  </h3>

                  <div class="text-neutral-80 fw-medium">
                    <p class="mb-2">
                      住宿天數：
                      {{ getDaysCount(item.checkInDate, item.checkOutDate) }} 晚
                    </p>
                    <p class="mb-0">住宿人數：{{ item.peopleNum }} 位</p>
                  </div>

                  <div class="text-neutral-80 fs-8 fs-md-7 fw-medium">
                    <p class="title-deco mb-2">
                      入住：{{ timeFormat(item.checkInDate) }}，15:00 可入住
                    </p>
                    <p class="title-deco mb-0">
                      退房：{{ timeFormat(item.checkOutDate) }}，12:00 前退房
                    </p>
                  </div>
                  <p class="mb-0 text-neutral-80 fs-8 fs-md-7 fw-bold">
                    NT$
                    {{
                      useMoneyFormat(
                        item.roomId.price *
                          getDaysCount(item.checkInDate, item.checkOutDate)
                      )
                    }}
                  </p>
                </section>
              </div>

              <hr
                class="my-0 opacity-100 text-neutral-40"
                v-if="index !== allOrders.length - 1"
              />
            </template>

            <button
              v-if="!showMore"
              class="btn btn-outline-primary-100 py-4 fw-bold"
              style="--bs-btn-hover-color: #fff"
              type="button"
              @click="showMore = true"
            >
              查看更多
            </button>
          </div>
        </div>
      </div>

      <div id="cancelModal" class="modal fade" tabindex="-1">
        <div
          class="modal-dialog modal-dialog-centered align-items-end align-items-md-center m-0 mx-md-auto h-100"
        >
          <div class="modal-content">
            <div class="modal-header">
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div
              class="modal-body mx-auto my-10 my-md-15 text-neutral-80 fs-8 fs-md-6 fw-bold"
            >
              確定要取消此房型的預訂嗎？
            </div>
            <div class="modal-footer d-flex gap-4">
              <button
                type="button"
                class="btn btn-outline-primary-100 flex-grow-1 m-0 py-4 fw-bold"
                style="--bs-btn-hover-color: #fff"
                data-bs-dismiss="modal"
              >
                關閉視窗
              </button>
              <button
                type="button"
                class="btn btn-primary-100 flex-grow-1 m-0 py-4 text-white fw-bold"
                data-bs-dismiss="modal"
                @click="deleteOrder"
              >
                確定取消
              </button>
            </div>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup>
const { $bootstrap } = useNuxtApp();
const orderStore = useOrdersStore();
const { allOrders } = storeToRefs(orderStore);

orderStore.getAllOrder();
const threeOrder = computed(() =>
  allOrders.value.filter((item) => item.status >= 0).slice(0, 3)
);
const showMore = ref(false);

const nextOrder = computed(() => {
  const sortOrder = allOrders.value
    .sort(
      (a, b) =>
        new Date(a.checkInDate).valueOf() - new Date(b.checkInDate).valueOf()
    )
    .filter((item) => item.status >= 0);
  return sortOrder.length ? sortOrder[0] : {};
});

const getDaysCount = (start, end) => {
  const diff = new Date(start).valueOf() - new Date(end).valueOf();
  return Math.abs(diff / 1000 / 60 / 60 / 24);
};

const timeFormat = (timer) => {
  const month = new Date(timer).getMonth() + 1;
  const date = new Date(timer).getDate();
  const day = new Date(timer).getDay();
  const days = ["日", "一", "二", "三", "四", "五", "六"];

  return `${month} 月 ${date} 日星期${days[day]}`;
};

const deleteOrder = async () => {
  await orderStore.deleteOrder(nextOrder.value._id);
  orderStore.getAllOrder();
};
</script>

<style lang="scss" scoped>
@import "bootstrap/scss/mixins/breakpoints";

$grid-breakpoints: (
  xs: 0,
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px,
  xxl: 1400px,
  xxxl: 1537px,
);

.rounded-3xl {
  border-radius: 1.25rem;
}

.title-deco {
  display: flex;
  align-items: center;
}

.title-deco::before {
  --color: #bf9d7d;
  content: "";
  display: inline-block;
  width: 4px;
  height: 24px;
  background-color: var(--color);
  border-radius: 10px;
  margin-right: 0.75rem;
}

.title-deco:nth-child(2)::before {
  --color: #909090;
}

.flex-item {
  max-width: 97px;
  width: 100%;
  white-space: nowrap;
}

.modal {
  backdrop-filter: blur(10px);

  @include media-breakpoint-down(md) {
    backdrop-filter: none;
  }
}

.modal-header {
  @include media-breakpoint-down(md) {
    border-bottom: 0 !important;
  }
}

.modal-content {
  @include media-breakpoint-down(md) {
    border-bottom-left-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
  }
}
</style>
