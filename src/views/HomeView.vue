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
    <a-row justify="space-around">
      <a-col>
        <a-radio-group v-model:value="LogValue" size="large">
          <a-row :gutter="16">
            <a-col :span="12"
              ><a-radio-button @click="resetFields()" :value="1">Registrarse</a-radio-button></a-col
            >
            <a-col :span="12"
              ><a-radio-button @click="resetFields()" :value="2"
                >Iniciar Sesión</a-radio-button
              ></a-col
            >
          </a-row>
        </a-radio-group>
      </a-col>
    </a-row>
    <a-row v-if="LogValue !== 0" class="register-container gradient-background">
      <a-col :span="24">
        <a-form
          class="form-separator"
          :model="formState"
          labelAlign="left"
          name="basic"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
          autocomplete="on"
          @finish="finishSubmit"
          @finishFailed="onFinishFailed"
        >
          <a-form-item
            label="Correo"
            name="email"
            :rules="[{ required: true, message: 'Por favor, escribe un correo' }]"
          >
            <a-input v-model:value="formState.email" class="input" />
          </a-form-item>

          <a-form-item
            label="Contraseña"
            name="password"
            :rules="[{ required: true, message: 'Por favor, escribe una contraseña' }]"
          >
            <a-input-password v-model:value="formState.password" class="input" />
          </a-form-item>
          <div class="firebase-errorMsg">
            <p v-if="errMsg" class="ant-form-item-explain-error">{{ errMsg }}</p>
          </div>
          <a-form-item :wrapper-col="{ offset: 19, span: 10 }">
            <a-button
              type="primary"
              html-type="submit"
              class="normal-sign-up-btn"
              :loading="loading"
              :disabled="loading"
              >Enviar</a-button
            >
          </a-form-item>
        </a-form>
      </a-col>
      <a-col :span="24" class="google-sign-up-container">
        <p class="google-sign-up-text">
          {{ LogValue === 1 ? 'O registrate con Google' : 'Iniciar sesión con Google' }}
        </p>
        <a-button type="primary" @click="signIniwthGoogle" class="google-signup-btn">
          <template #icon>
            <img
              class="google-image"
              alt="Google sign-in"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
            />
          </template>
          Google
        </a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'
import router from '../router'

let loading = ref<boolean>(false)
const LogValue = ref<number>(0)

interface FormState {
  email: string
  password: string
}

const formState = reactive<FormState>({
  email: '',
  password: ''
})

const errMsg = ref<string>('')

const resetFields = () => {
  formState.email = ''
  formState.password = ''
  errMsg.value = ''
}

const finishSubmit = () => {
  if (LogValue.value === 1) {
    onSignUp(formState)
  } else {
    onSignIn(formState)
  }
}

const onSignUp = (values: any) => {
  loading.value = true
  createUserWithEmailAndPassword(getAuth(), formState.email, formState.password)
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
  signInWithEmailAndPassword(getAuth(), formState.email, formState.password)
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

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
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

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.title-container {
  text-align: center;
  margin-bottom: $space-m;
}

.main-container {
  margin-top: $space-lg;

  .register-container {
    min-width: 100%;
    margin-top: $space-lg;
    padding: $space-m;
    border: 1px solid $color-dark-opacity-50;
    border-radius: $radius-default;

    @media screen and (max-width: $media-l) {
      width: 100%;
    }

    .firebase-errorMsg {
      text-align: end;
      margin-right: $space-lg;
    }

    .normal-sign-up-btn {
      height: 36px;
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

    .google-sign-up-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .google-sign-up-text {
        margin-bottom: $space-s;
        font-weight: $weight-semi;
        font-size: $font-size-m;
        color: $color-default;
      }

      .google-signup-btn {
        height: 36px;
        background-color: $color-gray-40;
        border-color: $color-gray-40;
        color: $color-light;
        border-radius: 7%;

        &:hover {
          background-color: $color-gray-30;
          border-color: $color-gray-30;
          color: $color-light;
        }

        .google-image {
          width: 20px;
          margin-right: $space;
        }
      }
    }
  }
}
</style>
