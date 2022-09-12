<script setup lang="ts">
import { sendMessage } from 'webext-bridge';
import { storageDemo } from '~/logic/storage'
import { CHANNEL } from '~/types/Orders';
function openOptionsPage() {
  browser.runtime.openOptionsPage()
}
let tabId = 0;

browser.tabs.query({
  active: true,
}).then(tab => {
  if (tab && tab.length > 0) {
    tabId = tab[0].id ? tab[0].id : 0
  }
})
async function openAsidePage() {
  console.log('找到的id', tabId);
  sendMessage(CHANNEL.SYSTEM_OPEN_ASIDE, '---', {
    context: 'content-script',
    tabId: tabId,
  })
}
</script>

<template>
  <main class="w-[300px] px-4 py-5 text-center text-gray-700">
    <Logo />
    <div>Popup</div>
    <p class="mt-2 opacity-50">
      This is the popup page
    </p>
    <button class="btn mt-2" @click="openOptionsPage">
      控制台
    </button>
    <br>
    <button class="btn mt-2" @click="openAsidePage">
      侧边栏
    </button>
    <div class="mt-2">
      <span class="opacity-50">Storage:</span> {{ storageDemo }}
    </div>
  </main>
</template>
