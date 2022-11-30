<script lang="ts" setup>
import { onMessage, sendMessage } from 'webext-bridge'
import { registeredWindows, storageDemo, clearBaseStorage } from '~/logic/storage'
import { useStore } from '~/options/store'
import { CHANNEL } from '~/types/Orders'
import browser from 'webextension-polyfill'
import type { TabItem } from '~/types/Tab'
import { Select } from 'ant-design-vue'
import { resetRegistered } from '~/logic'
const store = useStore()

const selectWindow = ref<string | number>('');
// const windowSelect = registeredWindows.value.map(item => ({ label: item.title, key: (item.frameId + '' + item.tabId), value: (item.frameId + '' + item.tabId) }));
// onMessage(CHANNEL.SYSTEM_REGISTER, (msg: any) => {
//   if (!registeredWindows.value.includes(msg.sender.tabId))
//     registeredWindows.value.push(msg.sender.tabId)
// })
// browser.webRequest.onCompleted
browser.runtime.onMessage.addListener((msg, sender) => {
  console.log('收到原生消息-options', msg, sender)
  // if (msg === 'registerTab' && sender.tab && sender.tab.id && !registeredWindows.value.find(tab => tab.frameId == sender.frameId && tab.tabId === sender.tab?.id)) {
  // registeredWindows.value.push({
  //   tabId: sender.tab!.id!,
  //   frameId: sender.frameId,
  //   title: sender.tab!.title || '',
  // })
  registeredWindows.value = [{
    tabId: sender.tab!.id!,
    frameId: sender.frameId,
    title: sender.tab!.title || '',
  }]
  // }
})

onMessage(CHANNEL.SYSTEM_RESPONSE, data => {
  console.log('收到执行结果', data)
})
const showSettingPanel = function () {
  const target = registeredWindows.value.filter(item => selectWindow.value == item.frameId + '' + item.tabId)
  console.log('找到的target', target)
  if (!target || !target.length) return;
  sendMessage(CHANNEL.SYSTEM_OPEN_ASIDE, '你好，content-js', {
    tabId: target[0].tabId,
    context: 'content-script',
    frameId: target[0].frameId,
  })
}
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
    <div class="w-80">
      <Select v-model:value="selectWindow" class="w-[calc(100%)]"
        :options="registeredWindows.map(item => ({ label: item.title + ':' + item.frameId, key: (item.frameId + '' + item.tabId), value: (item.frameId + '' + item.tabId) }))"></Select>
    </div>
    <div>
      <br>
      <button class="border-dark-50 border-solid btn mt-5" @click="showSettingPanel">
        打开面板
      </button>
      <br>
      <button class="border-dark-50 border-solid btn mt-5" @click="resetRegistered()">
        重置
      </button>
      <button class="border-dark-50 border-solid btn mt-5" @click="clearBaseStorage()">
        重置BASE
      </button>
    </div>
  </div>
</template>
