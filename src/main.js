import Vue from "vue";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import dateFilter from "./filters/date.filter";
import messagePlugin from "./utils/message.plugin";
import "materialize-css/dist/js/materialize.min";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

Vue.config.productionTip = false;

Vue.use(messagePlugin);
Vue.use(Vuelidate);

Vue.filter("date", dateFilter);

firebase.initializeApp({
  apiKey: "AIzaSyAfwhUQfsMnUCnpU3tQctgWGyRAQ84wLqI",
  authDomain: "intern-candidate-managment.firebaseapp.com",
  databaseURL: "https://intern-candidate-managment.firebaseio.com",
  projectId: "intern-candidate-managment",
  storageBucket: "intern-candidate-managment.appspot.com",
  messagingSenderId: "579821226568",
  appId: "1:579821226568:web:0a000a3ebab6f0bc80a67d",
  measurementId: "G-EHC3TDTF0H"
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
