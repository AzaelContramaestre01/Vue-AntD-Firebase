<template>
  <a-row justify="space-around">
    <a-col>
      <a-radio-group v-model:value="LogValue" @change="onChangeLogValue" size="large">
        <a-row :gutter="16">
          <a-col :span="12"
            ><a-radio-button :disabled="loading" :value="LogginOptions.REGISTER">Registrarse</a-radio-button></a-col
          >
          <a-col :span="12"
            ><a-radio-button :disabled="loading" :value="LogginOptions.LOGIN">Iniciar Sesión</a-radio-button></a-col
          >
        </a-row>
      </a-radio-group>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { LogginOptions } from '../../types'

const emits = defineEmits(['changeLogValue'])

defineProps({
  loading: {
    type: Boolean,
    default: false
  },
})

const onChangeLogValue = (e: object) => {
    // @ts-ignore
  emits('changeLogValue', e.target.value)
}

const LogValue = ref(LogginOptions.LOGIN)

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
</style>
