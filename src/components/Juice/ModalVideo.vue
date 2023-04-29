<template>
  <a-modal
    v-model:visible="isVideoModalVisible"
    :footer="null"
    width="1000px"
    :centered="true"
    class="video-modal"
  >
    <template v-if="selectedVideo">
      <a-row>
        <a-col :md="15" :lg="11" class="video-modal-image-container"
          ><img
            :src="selectedVideo.thumbnailHigh"
            alt="selectedVideo.title"
            @click="onOpenYoutubeVideo(selectedVideo.id)"
            class="video-modal-image"
          />
          <div class="play-button" @click="onOpenYoutubeVideo(selectedVideo.id)">
            <caret-right-filled class="play-icon" />
          </div>
        </a-col>
        <a-col :md="8" :lg="10" class="video-modal-text">
          <p class="video-modal-title">{{ selectedVideo.title }}</p>
          <p class="video-modal-description">{{ selectedVideo.description }}</p>
        </a-col>
      </a-row>
    </template>
    <template v-else>
      <p>No video selected</p>
    </template>
  </a-modal>
</template>

<script lang="ts" setup>
import { useYoutubeApi } from '../../composables/useYoutubeVideo'
import { CaretRightFilled } from '@ant-design/icons-vue'


const emits = defineEmits(['onOpenYoutubeVideo'])

const onOpenYoutubeVideo = (videoId: string) => {
  emits('onOpenYoutubeVideo', videoId)
}

const { isVideoModalVisible, selectedVideo } = useYoutubeApi()
</script>

<style scoped lang="scss">
:deep(.ant-modal) {
  width: 1000px;
}
.video-modal {
  max-height: 438px;
  border-radius: $radius-default;
  padding: $space-lg;

  .video-modal-image-container {
    position: relative;

    .play-button {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 60px;
      height: 60px;
      background-color: $color-red-opacity-50;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      &:hover {
        background-color: $color-red;
      }

      .play-icon {
        margin-left: $space-xs;
        font-size: $icon-size-l;
        color: $color-light;
      }
    }
  }

  .video-modal-image {
    height: 308px;
    object-fit: cover;
    margin-right: $space-m;
    border-radius: $radius-default;
    cursor: pointer;

    @media only screen and (max-width: $media-m) {
      width: 100%;
      padding-right: $space-m;
      margin-bottom: $space-lg;
    }
  }

  .video-modal-text {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .video-modal-title {
      font-family: $family-title;
      font-size: $font-size-m;
      line-height: $space-m;
      color: $color-dark;
      font-weight: $weight-bold;
      margin-bottom: $space-m;
    }

    .video-modal-description {
      font-family: $family-text;
      font-size: $font-size-s;
      line-height: $space-m;
      color: $text-color;
      font-weight: $weight-semi;
      margin-bottom: $space-m;
    }
  }
}
</style>
