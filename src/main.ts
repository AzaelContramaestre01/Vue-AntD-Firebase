import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBH1IGNfz0ynZY-T72FQWAEOroDpxrYPjI",
  authDomain: "afex-621cd.firebaseapp.com",
  projectId: "afex-621cd",
  storageBucket: "afex-621cd.appspot.com",
  messagingSenderId: "478391310475",
  appId: "1:478391310475:web:a4402dfd91565328e49c8e",
  measurementId: "G-D7RF8XVJ78"
};

initializeApp(firebaseConfig);

const app = createApp(App);
app.use(router);
app.use(Antd).mount("#app");