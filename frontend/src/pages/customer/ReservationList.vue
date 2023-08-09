<template>
  <div>
    <the-header> </the-header>
    <div class="reservation-items-container">
      <h1>List of Reservations</h1>
      <div v-if="reservations.length > 0">
        <div
          class="reservation-item"
          v-for="reservation in reservations"
          :key="reservation.referencecode"
        >
          <div>
            <h3>
              {{ reservation.name }} ( Status :
              {{ reservation.reservationstatus }} )
            </h3>
            <h4>On {{ reservation.date }} at {{ reservation.time }}</h4>
          </div>
          <base-button
            @click="openModal(reservation.id)"
            v-if="reservation.reservationstatus === 'confirmed'"
            >View</base-button
          >
        </div>
      </div>
      <div class="reservation-item" v-else>No Reservation Available</div>

      <Teleport to="body">
        <dialog class="modal" ref="modal">
          <div class="modal-content" v-if="modalData">
            <h1>Reservation Detail</h1>
            <h3>Restaurant Name : {{ modalData.name }}</h3>
            <h3>Number of People : {{ modalData.numberofpeople }}</h3>
            <h3>Date : {{ modalData.date }}</h3>
            <h3>Time : {{ modalData.time }}</h3>
            <h3>Location : {{ modalData.location }}</h3>
            <h3>Reference Code : {{ modalData.referencecode }}</h3>
            <div class="modal-btn-container">
              <button
                class="modal-btn modal-cancel-btn"
                @click="cancelReservation(modalData.id)"
              >
                Cancel Reservation
              </button>
              <button class="modal-btn modal-close-btn" @click="modalClose">
                Close
              </button>
            </div>
          </div>
        </dialog>
      </Teleport>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";

import TheHeader from "@/components/layout/TheHeader.vue";
import BaseButton from "@/components/ui/BaseButton.vue";

export default {
  components: { TheHeader, BaseButton },
  setup() {
    const store = useStore();
    const router = useRouter();
    const reservations = ref([]);
    const modal = ref(null);
    const modalData = ref(null);

    if (!store.getters["auth/isCustomer"]) {
      router.push("/login");
    }

    onMounted(async function () {
      const response = await fetch(
        "http://localhost:3001/reservation/reservationhistory/1"
      );
      const responseData = await response.json();
      reservations.value = responseData;
    });

    function openModal(reservationId) {
      modalData.value = reservations.value.filter(
        (curr) => curr.id == reservationId
      )[0];
      modal.value.show();
    }

    async function cancelReservation(reservationId) {
      const url =
        "http://localhost:3001/reservation/reservationcancel/" +
        reservationId +
        "/cancel";
      const response = await fetch(url, {
        method: "PUT",
      });

      const responseData = await response.json();
      if(response.ok){
        const idx = reservations.value.findIndex((reservation)=> reservation.id == reservationId)
        reservations.value[idx].reservationstatus = "cancelled"
      }
      this.modalClose();

    }

    function modalClose() {
      modal.value.close();
      modalData.value = null;
    }
    return {
      reservations,
      modal,
      openModal,
      modalClose,
      modalData,
      cancelReservation,
    };
  },
};
</script>

<style scoped>
.reservation-items-container {
  margin: 1rem;
  padding: 1rem;
}

.reservation-items-container .reservation-item {
  margin: 1rem 0;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>



