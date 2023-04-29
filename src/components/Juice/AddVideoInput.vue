<template>
  <a-col :span="24">
    <h2>Añadir nuevo video</h2>
  </a-col>
  <a-col :span="24">
    <a-row class="add-video-input-container">
      <a-col :xs="24" :sm="24" :lg="18">
        <a-input v-model:value="inputValue" placeholder="Añadir" class="input" @keyup.enter="onAddVideo()" />
      </a-col>
      <a-col :xs="24" :sm="24" :lg="6" class="add-video-button-container">
        <a-button type="primary" class="add-video-button" @click="onAddVideo()"> Añadir </a-button>
      </a-col>
      <div class="firebase-errorMsg">
        <p v-if="errMsg" class="ant-form-item-explain-error">{{ errMsg }}</p>
      </div>
    </a-row>
  </a-col>
</template>

<script lang="ts" setup>
import { useYoutubeApi } from '../../composables/useYoutubeVideo'

export interface Props {
  inputValue: string
  errMsg: string
}

const emits = defineEmits(['onAddVideo'])

const onAddVideo = () => {
  emits('onAddVideo', inputValue)
}

const { inputValue, errMsg } = useYoutubeApi()
</script>

<style scoped lang="scss">
.add-video-input-container {
  margin-bottom: $space-xl;

  @media screen and (max-width: $media-l) {
    width: 100%;
  }

  .input {
    width: 905px;
    height: 57px;

    @media screen and (max-width: $media-l) {
      width: 100%;
      margin-bottom: $space-m;
      padding: 0 $space;
    }

    @media screen and (max-width: $media-sm) {
      margin-bottom: $space-m;
    }
  }

  .add-video-button-container {
    display: flex;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: $media-l) {
      justify-content: flex-end;
    }

    .add-video-button {
      width: 253px;
      height: 57px;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      background-color: $color-blue;
      font-size: $font-size;
      font-weight: $weight-bold;
      letter-spacing: 1px;

      @media screen and (max-width: $media-l) {
        width: 150px;
      }
    }
  }
}
</style>
