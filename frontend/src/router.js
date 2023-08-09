import { createRouter, createWebHistory } from "vue-router";
import RestaurantList from "@/pages/restaurant/RestaurantList.vue"
import EachRestaurant from "@/pages/restaurant/EachRestaurant.vue"
import loginForm from "@/pages/login/loginForm.vue"
import registerForm from "@/pages/register/registerForm.vue"
import ReservationList from "@/pages/customer/ReservationList.vue"
import RestaurantOwnerRestaurant from "@/pages/restaurant-owner/restaurant/RestaurantList.vue"
import PendingList from "@/pages/admin/PendingList.vue"
import ApprovedList from "@/pages/admin/ApprovedList.vue"
import RejectedList from "@/pages/admin/RejectedList.vue"

export const router = createRouter({
    history: createWebHistory(),
    routes: [

        { path: "/", component: RestaurantList },
        { path: "/restaurant/:restaurantId", component: EachRestaurant },
        { path: "/login", component: loginForm },
        { path: "/register", component: registerForm },
        { path: "/customer/reservation-detail", component: ReservationList },
        { path: "/restaurant-owner/restaurant", component: RestaurantOwnerRestaurant },
        { path: "/admin/pending", component: PendingList },
        { path: "/admin/approved", component: ApprovedList },
        { path: "/admin/rejected", component: RejectedList },
    ],
})