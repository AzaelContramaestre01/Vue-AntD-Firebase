<template>
  <a-col :span="24" class="videos-container">
    <a-row justify="around">
      <a-col :xs="24" :sm="24" :md="12" :lg="8" v-for="(video, index) in videos" :key="index">
        <a-card
          class="video-card shadow image-responsive shadow"
          @click="showSeeVideoModal(index)"
          :style="{ 'background-image': `url(${video.thumbnailMedium})` }"
        >
          <div class="video-delete-icon" @click.stop="showDeleteVideoModal()">
            <close-outlined class="delete-icon" />
          </div>
          <div class="video-duration">{{ video.duration }}</div>
        </a-card>
      </a-col>
    </a-row>
  </a-col>
</template>

<script lang="ts" setup>
import { useYoutubeApi } from '../../composables/useYoutubeVideo'
import { CloseOutlined } from '@ant-design/icons-vue'

const { videos } = useYoutubeApi()
const emits = defineEmits(['showSeeVideoModal', 'showDeleteVideoModal'])

const showSeeVideoModal = (index: number) => {
  emits('showSeeVideoModal', index)
}

const showDeleteVideoModal = () => {
  emits('showDeleteVideoModal')
}
</script>

<style scoped lang="scss">
.videos-container {
  margin-left: $space-lg;

  @media only screen and (max-width: $media-l) {
    margin-left: $space;
    display: flex;
      justify-content: center;
      align-items: center;
    }

  .video-card {
    position: relative;
    border: none;
    width: 263px;
    height: 150px;
    background-size: cover;
    border-radius: 5px;
    cursor: pointer;

    @media only screen and (max-width: $media-l) {
      margin-bottom: $space-xl;
    }

    @media only screen and (max-width: $media-m) {
      width: 350px;
      height: 240px;
      margin-bottom: $space-xl;
    }

    .video-delete-icon {
      position: absolute;
      top: 0;
      right: 0;
      width: 24px;
      height: 24px;
      margin: 8px 9px 0 0;
      background-color: $color-dark-opacity-50;
      color: $color-light;
      font-weight: bold;
      text-align: center;
      cursor: pointer;

      .delete-icon {
        font-size: $icon-size-s;
        font-weight: $weight-bold;
      }
    }

    .video-duration {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 50px;
      height: 25px;
      margin: 0 9px 9px 0;
      background-color: $color-dark-opacity-50;
      color: #fff;
      font-weight: bold;
      text-align: center;
    }
  }
}
</style>
