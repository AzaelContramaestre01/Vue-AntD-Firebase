<template>
  <h1>Create an Account</h1>
  <p><input type="text" placeholder="Email" v-model="email"></p>
  <p><input type="password" placeholder="Password" v-model="password"></p>
  <p><button @click="register">Submit</button></p>
  <p><button @click="signIniwthGoogle">Sign in with google</button></p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useRouter } from 'vue-router'
import router from '../router';

const email = ref('')
const password = ref('')
const register = () => {
    createUserWithEmailAndPassword(getAuth(), email.value, password.value)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            router.push('/feed')
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
}

const signIniwthGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(), provider)
    .then((result) => {
        console.log(result)
        router.push('/juice')
    })
    .catch((error) => {
    })
}
</script>