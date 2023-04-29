<template>
  <a-row class="register-container gradient-background">
    <a-col :span="24">
      <a-form
        class="form-separator"
        :model="formState"
        labelAlign="left"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="on"
        @finish="submitForm"
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
        {{ LogValue === LogginOptions.REGISTER ? 'O registrate con Google' : 'Iniciar sesión con Google' }}
      </p>
      <a-button
        type="primary"
        :disabled="loading"
        @click="signIniwthGoogle"
        class="google-signup-btn"
      >
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
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import { LogginOptions, FormState } from '../../types'

const emits = defineEmits(['submitForm', 'signIniwthGoogle'])

export interface Props {
  LogValue: LogginOptions
  loading: boolean
  errMsg: string
}

const props = withDefaults(defineProps<Props>(), {
  LogValue: LogginOptions.LOGIN,
  errMsg: ''
})


watch(() => props.LogValue, () => resetFields())

const resetFields = () => {
  formState.email = ''
  formState.password = ''
}

const formState = reactive<FormState>({
  email: '',
  password: ''
})

const submitForm = async () => {
  emits('submitForm', formState)
}

const signIniwthGoogle = async () => {
  emits('signIniwthGoogle')
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
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
</style>
