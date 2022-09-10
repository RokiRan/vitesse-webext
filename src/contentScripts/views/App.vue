<script setup lang="ts">
import { useToggle } from '@vueuse/core'
import { sendMessage } from 'webext-bridge'
import { CHANNEL } from '~/types/Orders'
import browser from 'webextension-polyfill'

import 'virtual:windi.css'
const [show, toggle] = useToggle(false)
const w = window
const call = () => {
  sendMessage(CHANNEL.SYSTEM_CALL, 'callLocal', 'window')
}
window.addEventListener('hookAjaxResponse', ({ detail }) => {
  console.log('收到消息', detail!)
})
</script>

<template>
  <div class="fixed right-0 bottom-0 m-5 z-100 flex font-sans select-none leading-1em">
    <div class="bg-white text-gray-800 rounded-full shadow w-max h-min flex flex-col" p="x-4 y-2" m="y-auto r-2"
      transition="opacity duration-300" :class="show ? '' : 'uHide'">
      {{ w.location.host }}
      <button class="btn" @click="sendMessage(CHANNEL.SYSTEM_REGISTER, 'register', 'options')">
        注册窗口
      </button>
      <button class="btn" @click="call">调用本地方法</button>
    </div>
    <div class="flex w-10 h-10 rounded-full shadow cursor-pointer" bg="teal-600 hover:teal-700" @click="toggle()">
      <pixelarticons-power class="block m-auto text-white text-lg" />
    </div>
  </div>
</template>
<style>
.uHide {
  display: none;
}
</style>