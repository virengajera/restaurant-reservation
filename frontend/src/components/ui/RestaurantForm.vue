<template>
  <div class="restaurant-modal">
    <div class="modal-content">
      <div>
        <h1 v-if="isAddMode">Add New Restauratn</h1>
        <h1 v-if="isViewMode || isAdminViewMode">View Restaurant</h1>
        <h1 v-if="isEditMode">Edit Restaurant</h1>
        <h1 v-if="isAdminPendingMode">Pending Restaurant</h1>
        <h1 v-if="isAdminRejectedMode">Rejected Restaurant</h1>
      </div>
      <form
        action=""
        @submit.prevent="submitRestaurantForm"
        @keydown.enter.prevent=""
      >
        <div class="form-field-group">
          <label for="">Name</label>
          <input
            type="text"
            class="restaurant-form-input-field"
            ref="name"
            :disabled="disabledField"
            required
          />
        </div>

        <div class="form-field-group">
          <label for="">Description</label>
          <input
            type="textarea"
            class="restaurant-form-input-field"
            ref="description"
            :disabled="disabledField"
            required
          />
        </div>

        <div class="form-field-group">
          <label for="">Phone Number</label>
          <input
            type="text"
            class="restaurant-form-input-field"
            ref="phonenumber"
            :disabled="disabledField"
          />
        </div>

        <div class="form-field-group">
          <label for="">Location</label>
          <input
            type="text"
            class="restaurant-form-input-field"
            ref="location"
            :disabled="disabledField"
          />
        </div>

        <div class="form-field-group">
          <label for="">tags</label>
          <input
            type="text"
            class="restaurant-form-input-field"
            @keydown.enter.prevent="addTag"
            ref="tag"
            :disabled="disabledField"
          />
          <div v-if="tags.size > 0" class="tag-list">
            <p
              v-for="tagDisplay of tags"
              :key="tagDisplay"
              @click="removeTag(tagDisplay)"
              :class="{ 'tag-disabled': disabledField ? true : false }"
            >
              {{ tagDisplay }} &nbsp;<b>&times;</b>
            </p>
          </div>
        </div>

        <div class="form-field-group">
          <label for="">Number of People (Max)</label>
          <input
            type="number"
            class="restaurant-form-input-field"
            ref="maxpeople"
            :disabled="disabledField"
            required
          />
        </div>

        <div class="form-field-group" id="timeslot">
          <label for="">Select Time Slot</label> <br />
          <br />
          <div v-for="timeSlot in timeSlots" :key="timeSlot">
            <label :for="timeSlot">{{ timeSlot }}</label>
            <input
              type="checkbox"
              :value="timeSlot"
              v-model="checkedTimeSlots"
              :disabled="disabledField"
            />
          </div>
        </div>

        <div class="form-field-group">
          <label for="">Image 1</label>
          <input
            type="file"
            class="restaurant-form-file-field"
            ref="image1input"
            @change="displayImage($event)"
            :disabled="disabledField"
            required
          />
          <img src="" alt="" srcset="" ref="image1" />
        </div>

        <div class="form-field-group">
          <label for="">Image2</label>
          <input
            type="file"
            class="restaurant-form-file-field"
            ref="image2input"
            @change="displayImage($event)"
            :disabled="disabledField"
            required
          />
          <img src="" alt="" srcset="" ref="image2" />
        </div>

        <div class="form-field-group">
          <label for="">Image 3</label>
          <input
            type="file"
            class="restaurant-form-file-field"
            ref="image3input"
            @change="displayImage($event)"
            :disabled="disabledField"
            required
          />
          <img src="" alt="" srcset="" ref="image3" />
        </div>

        <div class="form-button-group">
          <common-button mode="add" type="submit" v-if="isAddMode"
            >Add</common-button
          >
          <common-button
            mode="edit"
            type="button"
            @click="changeMode('edit')"
            v-if="isViewMode"
            >Edit</common-button
          >
          <common-button mode="update" type="submit" v-if="isEditMode"
            >Update</common-button
          >
          <common-button
            mode="reset"
            type="reset"
            v-if="isAddMode || isEditMode"
            >Reset</common-button
          >

          <common-button
            mode="add"
            type="button"
            v-if="isAdminPendingMode || isAdminRejectedMode"
            @click="changeStatus('approved')"
            >Approve Restaurant</common-button
          >

          <common-button
            mode="edit"
            type="button"
            v-if="isAdminRejectedMode"
            @click="changeStatus('pending')"
            >Move to Pending</common-button
          >

          <common-button
            mode="edit"
            type="button"
            v-if="isAdminPendingMode"
            @click="changeStatus('rejected')"
            >Reject Restaurant</common-button
          >
          <common-button mode="close" @click="closeModal" type="button"
            >Close</common-button
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import CommonButton from "@/components/ui/CommonButton";

export default {
  props: ["mode", "restaurant"],
  emit: ["changeMode"],
  components: { CommonButton },
  setup(props, context) {
    const store = useStore();
    const router = useRouter();

    const timeSlots = ref([
      "0-1",
      "1-2",
      "2-3",
      "3-4",
      "4-5",
      "5-6",
      "6-7",
      "7-8",
      "8-9",
      "9-10",
      "10-11",
      "11-12",
      "12-13",
      "13-14",
      "14-15",
      "15-16",
      "16-17",
      "17-18",
      "18-19",
      "19-20",
      "20-21",
      "21-22",
      "22-23",
      "23-24",
    ]);

    const name = ref(null);
    const description = ref(null);
    const phonenumber = ref(null);
    const location = ref(null);
    const tag = ref(null);
    const tags = ref(new Set());
    const maxpeople = ref(null);
    const checkedTimeSlots = ref([]);
    const image1input = ref(null);
    const image1 = ref(null);
    const image2input = ref(null);
    const image2 = ref(null);
    const image3input = ref(null);
    const image3 = ref(null);

    onMounted(function () {
      if (props.restaurant) {
        setFormValues(props.restaurant);
      }
    });

    function closeModal() {
      context.emit("closeModal");
    }

    async function submitRestaurantForm() {
      if (checkedTimeSlots.value.length <= 0) {
        alert("At Least one time slot is required");
        throw new Error("At Least one time slot is required");
        window.location.reload();
      }
      const formData = new FormData();

      if (props.mode == "edit") {
        formData.append("id", props.restaurant.id);
      }

      formData.append("name", name.value.value);
      formData.append("description", description.value.value);
      formData.append("phonenumber", phonenumber.value.value);
      formData.append("location", phonenumber.value.value);
      formData.append("tags", [...tags.value].join(" "));
      formData.append("maxpeople", maxpeople.value.value);
      formData.append("timeslot", checkedTimeSlots.value.join(","));
      formData.append("image1", image1input.value.files[0]);
      formData.append("image2", image2input.value.files[0]);
      formData.append("image3", image3input.value.files[0]);

      let url = null;
      let method = null;

      if (props.mode == "edit") {
        url = `http://localhost:3001/restaurantowner/updaterestaurant`;
        method = "PUT";
      } else if (props.mode == "add") {
        url = `http://localhost:3001/restaurantowner/addrestaurant`;
        method = "POST";
      } else {
        throw new Error("Mode needed");
      }

      const response = await fetch(url, {
        method,
        headers: {
          "x-access-token": store.getters["auth/getUser"].token,
        },
        body: formData,
      });

      const responseData = await response.json();

      if (props.mode == "edit") {
        changeMode("view");
        window.location.reload();
      } else if (props.mode == "add") {
        console.log(responseData);
        closeModal();
        window.location.reload();
      } else {
        throw new Error("Mode Needed");
      }
    }

    async function changeStatus(status) {
      const url =
        `http://localhost:3001/admin/restaurant/` + props.restaurant.id;

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          "x-access-token": store.getters["auth/getUser"].token,
        },
        body: JSON.stringify({ approvalstatus: status }),
      });
      const responseData = await response.json();
      if (response.ok) {
        window.location.reload();
      }
    }

    function addTag() {
      tags.value.add('#' + tag.value.value);
      tag.value.value = "";
    }

    function removeTag(tag) {
      tags.value.delete(tag);
    }

    function displayImage(e) {
      const file = e.target.files[0];
      const link = URL.createObjectURL(file);
      const nextEl = e.target.nextSibling;
      nextEl.src = link;
    }

    const disabledField = computed(function () {
      return (
        props.mode == "view" ||
        props.mode == "admin-pending" ||
        props.mode == "admin-rejected" ||
        props.mode == "admin-view"
      );
    });

    const isAddMode = computed(function () {
      return props.mode == "add";
    });

    const isViewMode = computed(function () {
      return props.mode == "view";
    });

    const isEditMode = computed(function () {
      return props.mode == "edit";
    });

    const isAdminPendingMode = computed(function () {
      return props.mode == "admin-pending";
    });

    const isAdminRejectedMode = computed(function () {
      return props.mode == "admin-rejected";
    });

    const isAdminViewMode = computed(function () {
      return props.mode == "admin-view";
    });

    function changeMode(mode) {
      context.emit("change-mode", mode);
    }

    async function setFormValues(tempRestaurant) {
      name.value.value = tempRestaurant.name;

      description.value.value = tempRestaurant.description;

      phonenumber.value.value = tempRestaurant.phonenumber;

      location.value.value = tempRestaurant.location;

      tempRestaurant.tags.split(" ").forEach((el) => {
        if (el == "" || el == " ") {
        } else {
          tags.value.add(el);
        }
      });

      maxpeople.value.value = tempRestaurant.maxpeople;

      checkedTimeSlots.value.push(...tempRestaurant.timeslot.split(","));

      const [res1, res2, res3] = await Promise.all([
        fetch(
          `http://localhost:3001/image/restaurant/${tempRestaurant.id}/${tempRestaurant.image1}`
        ),
        fetch(
          `http://localhost:3001/image/restaurant/${tempRestaurant.id}/${tempRestaurant.image2}`
        ),
        fetch(
          `http://localhost:3001/image/restaurant/${tempRestaurant.id}/${tempRestaurant.image3}`
        ),
      ]);
      const [data1, data2, data3] = await Promise.all([
        res1.blob(),
        res2.blob(),
        res3.blob(),
      ]);

      handleImageInput(data1, image1, tempRestaurant.image1, image1input);
      handleImageInput(data2, image2, tempRestaurant.image2, image2input);
      handleImageInput(data3, image3, tempRestaurant.image3, image3input);
    }

    function handleImageInput(data, imgRefObj, fileName, inputRefObj) {
      imgRefObj.value.src = window.URL.createObjectURL(data);
      const f = new File([data], fileName, { type: data.type });
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(f);
      inputRefObj.value.files = dataTransfer.files;
    }

    return {
      isAddMode,
      isViewMode,
      isEditMode,
      name,
      description,
      phonenumber,
      location,
      tag,
      tags,
      maxpeople,
      checkedTimeSlots,
      timeSlots,
      image1input,
      image2input,
      image3input,
      image1,
      image2,
      image3,
      displayImage,
      submitRestaurantForm,
      addTag,
      removeTag,
      closeModal,
      changeMode,
      disabledField,
      isAdminPendingMode,
      isAdminRejectedMode,
      isAdminViewMode,
      changeStatus,
    };
  },
};
</script>

<style scoped>
.restaurant-modal {
  background-color: yellow;
  display: block; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 99; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

/* Modal Content */
.restaurant-modal .modal-content {
  background-color: #fefefe;
  margin: 2rem auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.form-field-group {
  display: flex;
  flex-direction: column;
}
label {
  margin: 0.5rem 0;
}
.restaurant-form-input-field {
  height: 46px;
  padding: 0 16px;
  border: 2px solid #ddd;
  border-radius: 4px;
}
input:focus {
  border-color: #0f7ef1;
}
#timeslot {
  margin: 1rem 0;
  display: inline-block;
}
#timeslot div {
  display: inline-block;
}
#timeslot div input {
  margin: 0.5rem;
}
.tag-list p {
  display: inline-block;
  margin: 0.5rem;
  background-color: rgb(251, 166, 113);
  padding: 10px 30px;
  border-radius: 999em;
}
.tag-list .tag-disabled {
  background-color: gray;
  color: white;
  pointer-events: none;
}
.tag-list p:hover {
  cursor: pointer;
  background-color: red;
}
.form-button-group {
  display: flex;
  flex-wrap: wrap;
}
.form-button-group button {
  margin: 1rem;
}

.form-field-group img {
  max-height: 300px;
  max-width: 300px;
  object-fit: cover;
}
</style>
