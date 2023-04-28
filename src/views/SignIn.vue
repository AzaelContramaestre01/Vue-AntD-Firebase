<template>
    <h1>Create an Account</h1>
    <p><input type="text" placeholder="Email" v-model="email"></p>
    <p><input type="password" placeholder="Password" v-model="password"></p>
    <p v-if="errMsg">{{ errMsg }}</p>
    <p><button @click="register">Submit</button></p>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
  import { useRouter } from 'vue-router'
  import router from '../router';
  
  const email = ref('')
  const password = ref('')
  const errMsg = ref('')
  const register = () => {
    signInWithEmailAndPassword(getAuth(), email.value, password.value)
          .then((userCredential) => {
              // Signed in 
              const user = userCredential.user;
              router.push('/feed')
              // ...
          })
          .catch((error) => {
              switch (error.code) {
                case "auth/invalid-email":
                  errMsg.value = "Invalid email address format."
                  break;
                case "auth/user-not-found":
                    errMsg.value = "User not found."
                    break;
                case "auth/wrong-password":
                    errMsg.value = "Incorrect password."
                    break;
                default:
                    errMsg.value = "Email or password was incorrect"
                    break;
              }
          });
  }
  </script>