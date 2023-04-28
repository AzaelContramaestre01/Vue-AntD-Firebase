<template>
  <a-row class="main-container">
    <a-col :span="24">
      <h2>Añadir nuevo video</h2>
    </a-col>
    <a-col :span="24">
      <a-row class="add-video-input-container">
        <a-col :span="18">
          <a-input v-model:value="value" placeholder="Añadir" class="input" />
        </a-col>
        <a-col :span="6">
          <a-button type="primary" class="add-video-button" @click="onAddVideo()">
            Añadir
          </a-button>
        </a-col>
        <div class="firebase-errorMsg">
          <p v-if="errMsg" class="ant-form-item-explain-error">{{ errMsg }}</p>
        </div>
      </a-row>
    </a-col>
    <a-col :span="24" class="videos-container">
      <a-row justify="around">
        <a-col :span="8" v-for="(video, index) in videos" :key="index">
          <a-card
            class="video-card shadow image-responsive"
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
    <a-modal
      v-model:visible="visible"
      :footer="null"
      width="1000px"
      :centered="true"
      class="video-modal"
    >
      <template v-if="selectedVideo">
        <a-row>
          <a-col :span="11" class="video-modal-image-container"
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
          <a-col :span="10" class="video-modal-text">
            <p class="video-modal-title">{{ selectedVideo.title }}</p>
            <p class="video-modal-description">{{ selectedVideo.description }}</p>
          </a-col>
        </a-row>
      </template>
      <template v-else>
        <p>No video selected</p>
      </template>
    </a-modal>
  </a-row>
</template>

<script lang="ts" setup>
import { createVNode, ref } from 'vue'
import { CloseOutlined, ExclamationCircleOutlined, CaretRightFilled } from '@ant-design/icons-vue'
import { Modal } from 'ant-design-vue'
import { message } from 'ant-design-vue'


const errMsg = ref<string>('')
const visible = ref(false)
const selectedVideo = ref()

const showSeeVideoModal = (index: number) => {
  try {
    selectedVideo.value = videos.value[index]
    visible.value = true
  } catch (error) {
    console.error(error)
  }
}

// Interface

interface Video {
  id: string
  title: string
  thumbnailMedium: string
  thumbnailHigh: string
  duration: string
  description: string
}

const showDeleteVideoModal = () => {
  Modal.confirm({
    title: '¿Seguro que quieres eliminar este video?',
    icon: createVNode(ExclamationCircleOutlined),
    centered: true,
    cancelText: 'Cancelar',
    okText: 'Eliminar',
    async onOk(index) {
      onDeleteVideo(index)
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onCancel() {}
  })
}

const onOpenYoutubeVideo = (videoId) => {
  window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank')
}

// Video functions and variables

const value = ref<string>('')
const videos = ref<Video[]>([])

const checkIfVideoExists = async () => {
  const videoId = getVideoId(value.value)
  // @ts-ignore
  const apiKey = import.meta.env.VITE_FIREBASE_API_KEY
  const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet,contentDetails`

  try {
    const response = await fetch(apiUrl)
    const data = await response.json()

    if (data.items.length === 0) {
      return false
    } else {
      return true
    }
  } catch (error) {
    console.error(error)
  }
}

const onAddVideo = async () => {

  // if URL is empty or invalid return
  if (!value.value) {
    errMsg.value = 'Por favor, introduce una URL válida'
    return
  }

  // if the video is already in the list return
  if (videos.value.some((video) => video.id === getVideoId(value.value))) {
    errMsg.value = 'Este video ya está en la lista'
    return
  }

  // if the video does not exist return
  if (!(await checkIfVideoExists())) {
    errMsg.value = 'Este video no existe'
    return
  }

  errMsg.value = ''
  const videoId = getVideoId(value.value)
  // @ts-ignore
  const apiKey = import.meta.env.VITE_FIREBASE_API_KEY
  const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet,contentDetails`

  try {
    const response = await fetch(apiUrl)
    const data = await response.json()

    const videoData = data.items[0]
    const title = videoData.snippet.title
    const thumbnailMedium = videoData.snippet.thumbnails.medium.url
    const thumbnailHigh = videoData.snippet.thumbnails.high.url
    const duration = videoData.contentDetails.duration
    let description = videoData.snippet.description
    const descriptionLines = description.split('\n')
    description = descriptionLines.slice(0, 4).join('\n')

    videos.value.push({
      id: videoId,
      title: title,
      thumbnailMedium: thumbnailMedium,
      thumbnailHigh: thumbnailHigh,
      duration: formatDuration(duration),
      description: description
    })

    // Clear input value
    value.value = ''
    message.success('Video agregado')
  } catch (error) {
    console.error(error)
  }
}

const onDeleteVideo = (index: number) => {
  videos.value.splice(index, 1)
  message.warning('Video eliminado')
}

const getVideoId = (url: string): string => {
  let videoId = ref<any>('')

  // Extract the video ID from the URL
  if (url.includes('youtube.com')) {
    videoId = url.split('v=')[1]
    const ampersandPosition = videoId.indexOf('&')

    if (ampersandPosition !== -1) {
      videoId = videoId.substring(0, ampersandPosition)
    }
  } else if (url.includes('youtu.be')) {
    videoId = url.split('/').pop()
  }

  return videoId
}

const formatDuration = (duration: string): string => {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/)
  const hours = match && match[1] ? parseInt(match[1].slice(0, -1)) : 0
  const minutes = match && match[2] ? parseInt(match[2].slice(0, -1)) : 0
  const seconds = match && match[3] ? parseInt(match[3].slice(0, -1)) : 0

  let formattedDuration = ''

  if (hours > 0) {
    formattedDuration += hours + ':'
  }

  if (minutes < 10) {
    formattedDuration += '0'
  }

  formattedDuration += minutes + ':'

  if (seconds < 10) {
    formattedDuration += '0'
  }

  formattedDuration += seconds

  return formattedDuration
}
</script>

<style scoped lang="scss">
.main-container {
  .add-video-input-container {
    margin-bottom: $space-xl;

    .input {
      width: 905px;
      height: 57px;
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
    }
  }

  .videos-container {
    margin-left: 40px;

    .video-card {
      position: relative;
      border: none;
      width: 263px;
      height: 150px;
      background-size: cover;
      border-radius: 5px;
      cursor: pointer;

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
}

.video-modal {
  min-width: none;
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
