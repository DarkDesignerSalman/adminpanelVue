import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "@/views/Dashboard/Dashboard.vue"; // Import the Dashboard component
import Plan from "@/views/Plan.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "dashboard",
    component: Dashboard,
  },
  {
    path: "/plan",
    name: "plan",
    component: Plan,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
