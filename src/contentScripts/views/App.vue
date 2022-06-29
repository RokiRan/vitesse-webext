<script setup lang="ts">
import { useToggle } from '@vueuse/core'
import 'virtual:windi.css'

const [show, toggle] = useToggle(false)
const channel = new BroadcastChannel('my_bus')
channel.onmessage = function(e) {
  console.log(`Received${e.data}`)
}
const sendMsg = (msg: string): void => {
  // eslint-disable-next-line no-alert
  // alert(msg)
  channel.postMessage(msg + window.location.host)
}
</script>

<template>
  <div class="fixed right-0 bottom-0 m-5 z-100 flex font-sans select-none leading-1em">
    <div
      class="bg-white text-gray-800 rounded-full shadow w-max h-min"
      p="x-4 y-2"
      m="y-auto r-2"
      transition="opacity duration-300"
      :class="show ? 'opacity-100' : 'opacity-0'"
    >
      我的扩展看板
    </div>
    <div
      class="flex w-10 h-10 rounded-full shadow cursor-pointer"
      bg="teal-600 hover:teal-700"
      @click="toggle()"
    >
      <pixelarticons-power class="block m-auto text-white text-lg" />
    </div>
    <div
      class="flex w-10 h-10 rounded-full shadow cursor-pointer"
      bg="pink-600 hover:pink-700"
      @click="sendMsg('hi:')"
    >
      <pixelarticons-power class="block m-auto text-white text-lg" />
    </div>
  </div>
</template>
