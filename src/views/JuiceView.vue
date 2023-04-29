<template>
  <a-row>
    <AddVideoInput
      :inputValue="inputValue"
      @onAddVideo="onAddVideo"
      :errMsg="errMsg"
     />
    <VideoGrid 
      @showSeeVideoModal="showSeeVideoModal"
      @showDeleteVideoModal="showDeleteVideoModal"
    />
    <ModalVideo 
      @onOpenYoutubeVideo="onOpenYoutubeVideo"
    />
  </a-row>
</template>

<script lang="ts" setup>
import AddVideoInput from '../components/Juice/AddVideoInput.vue'
import ModalVideo from '../components/Juice/ModalVideo.vue'
import VideoGrid from '../components/Juice/VideoGrid.vue'
import { useYoutubeApi } from '../composables/useYoutubeVideo'
import { defineComponent } from 'vue'

defineComponent({
  components: {
    AddVideoInput,
    ModalVideo,
    VideoGrid
  }
})

const {
  inputValue,
  errMsg,
  onAddVideo,
  showSeeVideoModal,
  showDeleteVideoModal,
  onOpenYoutubeVideo
} = useYoutubeApi()
</script>