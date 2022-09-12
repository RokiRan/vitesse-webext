<script setup lang="ts">
import { useToggle } from '@vueuse/core'
import { onMessage, sendMessage } from 'webext-bridge'
import { CHANNEL } from '~/types/Orders'
import browser from 'webextension-polyfill'

import 'virtual:windi.css'
const [show, toggle] = useToggle(false)
const isInIframe = ref(self !== top);
window.addEventListener('hookAjaxResponse', ({ detail }) => {
  console.log('收到消息', detail!)
})
onMessage(CHANNEL.SYSTEM_OPEN_ASIDE, data => {
  toggle();
})
onMessage(CHANNEL.SYSTEM_TEST_SPIDER, data => {
  const result = doXpath(data.data as unknown as string);
  console.log('测试爬虫', data.data, result)
})
// sendMessage(CHANNEL.SYSTEM_REGISTER, 'register', 'options')
const registerTabOrIframe = () => {
  browser.runtime.sendMessage(undefined, 'registerTab');
}
function doXpath(x: string) {
  const res = document.evaluate(x, document.documentElement, null,
    XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
  return res ? (res as HTMLElement).innerText : ""
}
</script>

<template>
  <!-- <div class="fixed right-0 bottom-0 m-5 z-100 flex font-sans select-none leading-1em">
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
  </div> -->
  <div class="w-10 h-10 cursor-pointer fixed top-0 left-0 iframe-btn" v-if="isInIframe"
    :style="{top: (Math.random()*50) + 'px', left: (Math.random()*50) + 'px'}" @dblclick.prevent.self="toggle()">

  </div>
  <div class="h-100vh w-20vw fixed font-sans select-none top-0 leading-1em bg-aside" :class="show ? 'show' : ''"
    transition="duration-300">
    <div class="absolute top-2 right-2 cursor-pointer" @click="toggle()">
      <pixelarticons-close class="block m-auto text-white text-lg" />
    </div>
    <button class="btn" @click="registerTabOrIframe">注册窗口</button>
  </div>
</template>
<style>
.show {
  right: 0 !important;
}

.iframe-btn {
  z-index: 999999;
  backdrop-filter: blur(5px);
  background-color: rgba(68, 68, 68, 0.6);
}

.bg-aside {
  z-index: 999999;
  backdrop-filter: blur(5px);
  background-color: rgba(68, 68, 68, 0.6);
  right: -20vw;
}
</style>