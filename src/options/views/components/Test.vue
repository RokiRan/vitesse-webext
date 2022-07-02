<script lang="ts" setup>
import { onMessage, sendMessage } from 'webext-bridge'
import { storageDemo } from '~/logic/storage'

import { CHANNEL } from '~/types/Orders'
const sendMsg = (msg: string) => {

}
onMessage(CHANNEL.SYSTEM, (msg: any) => {
  // eslint-disable-next-line no-console
  console.log(msg)
})
</script>

<template>
  <div>
    <img src="/assets/icon.svg" class="icon-btn mx-2 text-2xl" alt="extension icon">
    <div>Options</div>
    <p class="mt-2 opacity-50">
      This is the options page !
    </p>

    <input v-model="storageDemo" class="border dark:bg-transparent border-gray-400 rounded px-2 py-1 mt-2">

    <div class="mt-4">
      Powered by Vite <pixelarticons-menu class="align-middle" />
    </div>
    <button class="border-dark-50 border-solid" @click="sendMsg('hello world:')">
      send test message
    </button>
  </div>
</template>
