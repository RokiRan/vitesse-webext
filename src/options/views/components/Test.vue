<script lang="ts" setup>
import { onMessage, sendMessage } from 'webext-bridge'
import { storageDemo } from '~/logic/storage'
import { useStore } from '~/options/store'
import { CHANNEL } from '~/types/Orders'
import browser from 'webextension-polyfill'

const store = useStore()
const registeredForm = ref<any[]>([])
onMessage(CHANNEL.SYSTEM_REGISTER, (msg: any) => {
  if (!registeredForm.value.includes(msg.sender.tabId))
    registeredForm.value.push(msg.sender.tabId)
})

// browser.webRequest.onCompleted
</script>

<template>
  <div>
    <img src="/assets/icon.svg" class="icon-btn mx-2 text-2xl" alt="extension icon">
    <div>Options</div>
    <div>Store:{{ store.$state.name }}</div>
    <p class="mt-2 opacity-50">
      This is the options page !
    </p>

    <input v-model="storageDemo" class="border dark:bg-transparent border-gray-400 rounded px-2 py-1 mt-2">

    <div class="mt-4">
      Powered by Vite
      <pixelarticons-menu class="align-middle" />
    </div>
    <h4>已注册窗口</h4>
    <ul>
      <li v-for="item in registeredForm" :key="item">
        {{ item }}
      </li>
    </ul>
    <div>
      <button class="border-dark-50 border-solid btn"
        @click="sendMessage(CHANNEL.SYSTEM, 'hi： background-js', 'background')">
        send message to background
      </button>
      <br>
      <button class="border-dark-50 border-solid btn mt-5" @click="sendMessage(CHANNEL.SYSTEM_OPEN_ASIDE, '你好，content-js', {
        tabId: registeredForm[0],
        context: 'content-script',
      })">
        send message to content-script
      </button>
    </div>
  </div>
</template>
