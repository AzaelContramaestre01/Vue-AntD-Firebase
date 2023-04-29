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
import { onMounted, ref, defineComponent } from 'vue'
import Sign from '../components/Sign/Sign.vue'
import SignButtons from '../components/Sign/SignButtons.vue'
import { useFirebaseAuth } from "../composables/useFirebaseAuth"
import { LogginOptions, FormState } from '../types'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import router from '../router'

defineComponent({
  components: {
    Sign,
    SignButtons
  }
})

const isLoggedIn = ref(false)
let auth = ref<any>(getAuth())

// check if user is logged in
onMounted(() => {
  auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      router.push('/juice')
      isLoggedIn.value = true
    } else {
      isLoggedIn.value = false
    }
  })
})

const { loading, errMsg, onSignUp, onSignIn, signIniwthGoogle } = useFirebaseAuth()

const LogValue = ref<LogginOptions>(LogginOptions.LOGIN)

const changeLogValue = (value: LogginOptions) => {
  LogValue.value = value
}

const finishSubmit = (formState: FormState) => {
  if (LogValue.value === LogginOptions.REGISTER) {
    onSignUp(formState)
  } else {
    onSignIn(formState)
  }
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
