<template>
  <div class="main-container">
    <a-row>
      <a-col :span="24" class="title-container">
        <h1>
          Hola, soy Azael Contramaestre. <br />
          Bienvenido a mi prueba tecnica, gracias por tu tiempo.
        </h1>
      </a-col>
    </a-row>
    <SignButtons :loading="loading" @changeLogValue="changeLogValue" />
    <Sign
      :LogValue="LogValue"
      :loading="loading"
      :errMsg="errMsg"
      @submitForm="finishSubmit"
      @signIniwthGoogle="signIniwthGoogle"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, defineComponent } from 'vue'
import router from '../router'
import Sign from '../components/Sign.vue'
import SignButtons from '../components/SignButtons.vue'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'

defineComponent({
  components: {
    Sign,
    SignButtons
  }
})

let loading = ref<boolean>(false)
const LogValue = ref<number>(0)
const errMsg = ref<string>('')

const changeLogValue = (value: number) => {
  LogValue.value = value
}

const finishSubmit = (formState) => {
  if (LogValue.value === 1) {
    onSignUp(formState)
  } else {
    onSignIn(formState)
  }
}

const onSignUp = (values: any) => {
  loading.value = true
  createUserWithEmailAndPassword(getAuth(), values.email, values.password)
    .then((userCredential) => {
      // Signed in
      router.push('/juice')
      const user = userCredential.user
      // ...
    })
    .catch((error) => {
      switch (error.code) {
        case 'auth/email-already-in-use':
          errMsg.value = 'That email address is already in use!'
          break
        case 'auth/invalid-email':
          errMsg.value = 'Invalid email address format.'
          break
        case 'auth/weak-password':
          errMsg.value = 'Password should be at least 6 characters'
          break
        default:
          errMsg.value = 'Email or password was incorrect'
          break
      }
      setTimeout(() => {
        loading.value = false
      }, 500)
    })
}
const onSignIn = (values: any) => {
  loading.value = true
  signInWithEmailAndPassword(getAuth(), values.email, values.password)
    .then((userCredential) => {
      // Signed in
      router.push('/juice')
      const user = userCredential.user
      // ...
    })
    .catch((error) => {
      switch (error.code) {
        case 'auth/invalid-email':
          errMsg.value = 'Invalid email address format.'
          break
        case 'auth/user-not-found':
          errMsg.value = 'User not found.'
          break
        case 'auth/wrong-password':
          errMsg.value = 'Incorrect password.'
          break
        default:
          errMsg.value = 'Email or password was incorrect'
          break
      }
      setTimeout(() => {
        loading.value = false
      }, 500)
    })
}

const signIniwthGoogle = () => {
  const provider = new GoogleAuthProvider()
  signInWithPopup(getAuth(), provider)
    .then((result) => {
      router.push('/juice')
    })
    .catch((error) => {
      console.log(error)
    })
}
</script>

<style scoped lang="scss">
:deep(.ant-radio-button-wrapper) {
  text-align: center;
  width: 130px;
  background-color: $color-gray-40;
  border-color: $color-gray-40;
  color: $color-light;
  border-radius: 7%;

  &:hover {
    background-color: $color-gray-30;
    border-color: $color-gray-30;
    color: $color-light;
  }
}

:deep(.ant-radio-button-checked) {
  background-color: $color-dark-opacity-50;
  border-color: $color-gray-40;
  color: $color-light;
  border-radius: 7%;

  &:hover {
    background-color: $color-dark;
    border-color: $color-gray-30;
    color: $color-light;
  }
}

:deep(.ant-form-item-required) {
  color: $color-default;
}

.title-container {
  text-align: center;
  margin-bottom: $space-m;
}
</style>
