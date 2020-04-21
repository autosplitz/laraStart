//  * First we will load all of this project's JavaScript dependencies which
//  * includes Vue and other libraries. It is a great starting point when
//  * building robust, powerful web applications using Vue and Laravel.

require("./bootstrap");

window.Vue = require("vue");

window.Fire = new Vue();

import VueRouter from "vue-router";
Vue.use(VueRouter);

import Gate from "./Gate";
Vue.prototype.$gate = new Gate(window.user);

import {
  Form,
  HasError,
  AlertError
} from "vform";
window.Form = Form;
Vue.component(HasError.name, HasError);
Vue.component(AlertError.name, AlertError);

import VueProgressBar from "vue-progressbar";
const options = {
  color: "#bffaf3",
  failedColor: "#874b4b",
  thickness: "5px",
  transition: {
    speed: "0.2s",
    opacity: "0.6s",
    termination: 300,
  },
  autoRevert: true,
  location: "top",
  inverse: false,
};
Vue.use(VueProgressBar, options);

import Swal from "sweetalert2";
window.Swal = Swal;
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});
window.Toast = Toast;

Vue.filter("upText", (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
});

// * Moment will nicely format Dates and Time in JavaScript
import moment from "moment";
Vue.filter("formatDate", (created) => {
  return moment(created).format("MMMM Do, YYYY");
});

let routes = [{
    path: "/dashboard",
    component: require("./components/Dashboard.vue").default,
  },
  {
    path: "/developer",
    component: require("./components/Developer.vue").default,
  },
  {
    path: "/profile",
    component: require("./components/Profile.vue").default,
  },
  {
    path: "/users",
    component: require("./components/Users.vue").default,
  },
  {
    path: "*",
    component: require("./components/NotFound.vue").default,
  },
];

const router = new VueRouter({
  mode: "history",
  routes, // short for `routes: routes`
});

//  * The following block of code may be used to automatically register your
//  * Vue components. It will recursively scan this directory for the Vue
//  * components and automatically register them with their "basename".

Vue.component("example-component", require("./components/ExampleComponent.vue").default);

Vue.component("not-found", require("./components/NotFound.vue").default);
Vue.component("pagination", require("laravel-vue-pagination"));

// ? Using Laravel Passport to create an API auth in Vue components
Vue.component("passport-clients", require("./components/passport/Clients.vue").default);

Vue.component("passport-authorized-clients", require("./components/passport/AuthorizedClients.vue").default);

Vue.component("passport-personal-access-tokens", require("./components/passport/PersonalAccessTokens.vue").default);

//  * Next, we will create a fresh Vue application instance and attach it to
//  * the page. Then, you may begin adding components to this application
//  * or customize the JavaScript scaffolding to fit your unique needs.

const app = new Vue({
  el: "#app",
  router,
  data: {
    search: "",
  },
  methods: {
    searchit: _.debounce(() => {
      Fire.$emit('searching')
    }, 1000),
    printInvoice() {
      window.print()
    }
  },
});
