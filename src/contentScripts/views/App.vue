<script setup lang="ts">
import { useToggle } from '@vueuse/core'
import type { JsonValue } from 'type-fest'
import 'virtual:windi.css'
import { onMessage, sendMessage } from 'webext-bridge'
import { storageDemo } from '~/logic/storage'
import type { TabInfo } from '~/types/Options'
import type { sysOrder } from '~/types/Orders'
import { CHANNEL, CMD } from '~/types/Orders'
const tabInfo = reactive<TabInfo>({
  tabId: 0,
})
const [show, toggle] = useToggle(false)
const sendMsg = (msg: string): void => {
  const _msg: sysOrder = {
    cmd: CMD.TEST_CMD,
    script: `alert('${msg}'+${window.location.host})`,
  }
  sendMessage(CHANNEL.SYSTEM, (_msg as unknown as JsonValue), 'options')
}

onMounted(() => {

})
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
      <div class="flex flex-col">
        <span>当前页信息</span>
        <input v-model="storageDemo" type="text">
        <input v-model="tabInfo.tabId" type="text">
      </div>
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
