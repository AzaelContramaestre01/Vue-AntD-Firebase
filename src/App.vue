<template>
  <a-layout class="main-layout">
    <a-layout-content>
      <a-row v-if="isLoggedIn">
        <a-col class="sign-out-container" :span="24">
          <a @click="handleSignOut" class="sign-out ant-btn"
            ><user-outlined class="sign-out-icon" />Sign out</a
          ></a-col
        >
      </a-row>
      <div class="content-container desktop-resolution">
        <router-view />
      </div>
    </a-layout-content>
  </a-layout>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { UserOutlined } from '@ant-design/icons-vue'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import router from './router'

const isLoggedIn = ref(false)
let auth = ref<any>(getAuth())

onMounted(() => {
  auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true
    } else {
      isLoggedIn.value = false
    }
  })
})

const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push('/')
  })
}
</script>
<style scoped lang="scss">
.sign-out-container {
  padding: $space-xl;
  display: flex;
  align-items: center;
  justify-content: end;

  .sign-out {
    border-radius: 5px;
    padding: $space-m;
    background-color: $color-dark-opacity-50;
    color: $color-default;
    font-weight: $weight-semi;
    font-size: $font-size-m;
    font-weight: $weight-semi;

    &:hover {
      background-color: $color-gray;
    }

    .sign-out-icon {
      margin-right: $space-s;
      font-size: $font-size-m;
    }
  }
}
.main-layout {
  min-height: 100vh;

  .content-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
    min-height: 280px;
    padding: $space-xl;
  }
}

.add-video-button {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
</style>
