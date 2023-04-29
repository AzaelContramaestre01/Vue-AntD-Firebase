import { createVNode, ref } from 'vue'
import { Modal } from 'ant-design-vue'
import { message } from 'ant-design-vue'
import { ExclamationCircleOutlined} from '@ant-design/icons-vue'
import { Videos } from '../types'

const errMsg = ref<string>('')
const isVideoModalVisible = ref(false)
const selectedVideo = ref()

const inputValue = ref<string>('')
const videos = ref<Videos[]>([])

export const useYoutubeApi = () => {

  const onAddVideo = async () => {
    errMsg.value = ''

    // if URL is empty or invalid return
    if (!inputValue.value) {
      errMsg.value = 'Por favor, introduce una URL válida'
      return
    }

    // if the video is already in the list return
    if (videos.value.some((video) => video.id === getVideoId(inputValue.value))) {
      errMsg.value = 'Este video ya está en la lista'
      return
    }

    // if the video does not exist return
    if (!(await checkIfVideoExists())) {
      errMsg.value = 'Este video no existe'
      return
    }

    const videoId = getVideoId(inputValue.value)
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
      inputValue.value = ''
      message.success('Video agregado')
    } catch (error) {
      console.error(error)
    }
  }

  const onDeleteVideo = (index: number) => {
    videos.value.splice(index, 1)
    message.warning('Video eliminado')
    errMsg.value = ''
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

  const showSeeVideoModal = (index: number) => {
    try {
      selectedVideo.value = videos.value[index]
      isVideoModalVisible.value = true
    } catch (error) {
      console.error(error)
    }
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

  const onOpenYoutubeVideo = (videoId: string) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank')
  }

  const checkIfVideoExists = async () => {
    const videoId = getVideoId(inputValue.value)
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


  return { inputValue, videos, errMsg, isVideoModalVisible, selectedVideo, onAddVideo, showSeeVideoModal, showDeleteVideoModal, onOpenYoutubeVideo }
}
