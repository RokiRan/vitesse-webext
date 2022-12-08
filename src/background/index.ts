/* eslint-disable no-console */
import type { Tabs } from 'webextension-polyfill'
import browser from 'webextension-polyfill'
import { onMessage, sendMessage } from 'webext-bridge'

// import { io } from 'socket.io-client'
// import { io } from 'https://cdn.socket.io/4.4.1/socket.io.esm.min.js'
import { CHANNEL } from '~/types/Orders'
// import { clearStorage } from '~/logic'

// const socket = io('ws://localhost:4000')
// const initWs = () => {
//   const socket = io('ws://127.0.0.1:4000')
//   console.log('socket:', socket)
//   socket.on('connect', () => {
//     console.log('connect')
//     socket.send('message', `hello:${window.location.href}`)
//   })
//   socket.on('message', (data) => {
//     console.log('message:', data)
//   })
// }
// initWs()
// console.log(io)

browser.runtime.onInstalled.addListener((): void => {
  // eslint-disable-next-line no-console
  console.log('Extension installed')
  // 清空一下storage
  // clearStorage();
})
// browser.runtime.onMessage.addListener((msg, sender) => {
//   console.log('收到原生消息-backgroundJS', msg, sender)
// })
let previousTabId = 0
// communication example: send previous tab title from background page
// see shim.d.ts for type declaration
browser.tabs.onActivated.addListener(async ({ tabId }) => {
  if (!previousTabId) {
    previousTabId = tabId
    return
  }

  let tab: Tabs.Tab

  try {
    tab = await browser.tabs.get(previousTabId)
    previousTabId = tabId
  }
  catch {
    return
  }

  // eslint-disable-next-line no-console
  console.log('previous tab', tab)
  sendMessage('tab-prev', { title: tab.title }, { context: 'content-script', tabId })
})

onMessage('get-current-tab', async () => {
  try {
    const tab = await browser.tabs.get(previousTabId)
    return {
      title: tab?.title,
    }
  }
  catch {
    return {
      title: undefined,
    }
  }
})

onMessage(CHANNEL.SYSTEM, ({ data }) => {
  // eslint-disable-next-line no-console
  console.log(`[vitesse-webext - background] Navigate from options "${data}"`)
})

// browser.webRequest.onResponseStarted.addListener(function (details) {
//   console.log('------------>>>', details.url);
//   return {cancel: details.url.indexOf("://www.evil.com/") != -1};
// },
// {urls: ["<all_urls>"]},
// ["responseHeaders"]
// );

