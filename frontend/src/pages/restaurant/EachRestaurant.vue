<template>
  <div>
    <the-header></the-header>

    <div class="restaurant-content">
      <div class="restaurant-image">
        <img src="" alt="" srcset="" ref="image1" />
        <img src="" alt="" srcset="" ref="image2" />
        <img src="" alt="" srcset="" ref="image3" />
      </div>
      <div class="restaurant-information">
        <h1 class="restaurant-name">{{ restaurantdetail.name }}</h1>
        <h2 class="restaurant-description">
          {{ restaurantdetail.description }}
        </h2>
        <div class="tags">
          <the-tag> {{ restaurantdetail.tags }} </the-tag>
        </div>

        <p class="phone">Phone Number : {{ restaurantdetail.phonenumber }}</p>
        <p class="location">location : {{ restaurantdetail.location }}</p>

        <div class="reservation-section" v-if="isShow">
          <h2>Make Reservation</h2>
          <form @submit.prevent="reserve">
            <div>
              <label for="">Select Time Slot :</label>
              <select
                name=""
                id=""
                v-if="timeSlots.length > 0"
                required
                ref="reservationTime"
              >
                <option
                  v-for="timeSlot in timeSlots"
                  :key="timeSlot"
                  :value="timeSlot"
                >
                  {{ timeSlot }}
                </option>
              </select>
            </div>

            <div>
              <label for="">Number of People : </label>
              <input type="number" required ref="numberofpeople" />
            </div>

            <div>
              <label for="">Select Date :</label>
              <input type="date" required ref="reservationDate" />
            </div>

            <base-button>Reserve Now</base-button>
          </form>
        </div>
        <div class="info">
          <p>{{ info }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

import TheHeader from "@/components/layout/TheHeader.vue";
import TheTag from "@/components/ui/BaseTag.vue";
import BaseButton from "@/components/ui/BaseButton.vue";

export default {
  components: { TheHeader, TheTag, BaseButton },
  setup() {
    const route = useRoute();
    const store = useStore();

    const image1 = ref(null);
    const image2 = ref(null);
    const image3 = ref(null);
    const restaurantdetail = ref({});
    const isShow = ref(false);
    const info = ref("");

    const timeSlots = ref([]);
    const reservationDate = ref(null);
    const numberofpeople = ref(null);
    const reservationTime = ref(null);

    if (store.getters["auth/isCustomer"]) {
      isShow.value = true;
    }

    onMounted(async function () {
      const response = await fetch(
        "http://localhost:3001/restaurant/restaurantdetail/" +
          route.params.restaurantId
      );
      const responseData = await response.json();
      restaurantdetail.value = responseData[0];
      const ts = responseData[0].timeslot;
      timeSlots.value = ts.split(",");
      updateImageSrc(responseData);
    });

    function updateImageSrc(data) {
      image1.value.src =
        "http://localhost:3001/image/restaurant/" +
        data[0].id +
        "/" +
        data[0].image1;
      image2.value.src =
        "http://localhost:3001/image/restaurant/" +
        data[0].id +
        "/" +
        data[0].image2;
      image3.value.src =
        "http://localhost:3001/image/restaurant/" +
        data[0].id +
        "/" +
        data[0].image3;
    }

    async function reserve() {
      const getUser = store.getters["auth/getUser"];
      const url = "http://localhost:3001/reservation/reservationdetail";

      const formData = {
        customerId: Number(getUser.userId),
        restaurantId: Number(restaurantdetail.value.id),
        numberofpeople: Number(numberofpeople.value.value),
        reservationDate: reservationDate.value.value,
        reservationTime: reservationTime.value.value,
      };

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.msg);
        } else {
          info.value = responseData.msg;
          setTimeout(function () {
            info.value = "";
          }, 8000);
        }
      } catch (error) {
        info.value = error;
        setTimeout(function () {
          info.value = "";
        }, 8000);
      }
    }

    return {
      restaurantdetail,
      image1,
      image2,
      image3,
      reserve,
      isShow,
      timeSlots,
      reservationDate,
      numberofpeople,
      reservationTime,
      info
    };
  },
};
</script>

<style scoped>
.restaurant-content .restaurant-image {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  align-items: center;
  margin: 1rem;
  padding: 1rem;
}

.restaurant-content .restaurant-image img {
  max-height: 50vh;
  max-width: 50vh;
}

.restaurant-information {
  margin: 1rem;
  padding: 1rem;
  text-align: center;
}

.restaurant-information h1,
.restaurant-information h2,
.restaurant-information .tags,
.restaurant-information p {
  margin: 1rem 0;
}

.reservation-section {
  margin: 2rem 0;
}
.reservation-section form {
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.reservation-section form div {
  margin: 0 0.5rem;
}

.reservation-section input {
  padding: 12px;
  width: 300px;
  border-radius: 5px;
  border: 0 !important;
  background-color: rgb(145, 245, 192);
  /* needed */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  /* SVG background image */

  background-size: 0.6em;
  background-position: calc(100% - 1.3em) center;
  background-repeat: no-repeat;
  margin: 0.5rem 0;
}

select {
  width: 300px;
  padding: 12px;
  border: 0 !important;
  background-color: rgb(145, 245, 192);
  /* needed */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  /* SVG background image */
  background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Ctitle%3Edown-arrow%3C%2Ftitle%3E%3Cg%20fill%3D%22%23000000%22%3E%3Cpath%20d%3D%22M10.293%2C3.293%2C6%2C7.586%2C1.707%2C3.293A1%2C1%2C0%2C0%2C0%2C.293%2C4.707l5%2C5a1%2C1%2C0%2C0%2C0%2C1.414%2C0l5-5a1%2C1%2C0%2C1%2C0-1.414-1.414Z%22%20fill%3D%22%23000000%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3C%2Fsvg%3E");
  background-size: 0.6em;
  background-position: calc(100% - 1.3em) center;
  background-repeat: no-repeat;
  margin: 0.5rem 0;
  border-radius: 5px;
}
select::-ms-expand {
  display: none;
}

.info {
  background-color: #eb7870;
  color: white;
}
</style>