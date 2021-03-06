import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    meta: { layout: "empty" },
    component: () => import("../views/Login.vue")
  },
  {
    path: "/register",
    name: "Register",
    meta: { layout: "empty" },
    component: () => import("../views/Register.vue")
  },
  {
    path: "/",
    name: "Home",
    meta: { layout: "main" },
    component: () => import("../views/History.vue")
  },
  {
    path: "/record",
    name: "Record",
    meta: { layout: "main" },
    component: () => import("../views/Record.vue")
  },
  {
    path: "/detail-record/:id",
    name: "DetailRecord",
    meta: { layout: "main" },
    component: () => import("../views/DetailRecord.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
