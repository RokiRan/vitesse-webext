/* eslint-disable no-console */
import { onMessage } from 'webext-bridge'
import { createApp } from 'vue'
import App from './views/App.vue'
import { CHANNEL } from '~/types/Orders'

// Firefox `browser.tabs.executeScript()` requires scripts return a primitive value
(() => {
  console.info('[vitesse-webext] Hello world from content script')

  // communication example: send previous tab title from background page
  onMessage('tab-prev', ({ data }) => {
    console.log(`[vitesse-webext] Navigate from page "${data.title}"`)
  })
  onMessage(CHANNEL.SYSTEM2, ({ data }) => {
    console.log(`[vitesse-webext] Navigate from options "${data}"`)
    // console.log('尝试获取数据', (<HTMLDivElement>document.querySelector("#A_main > div > div > div.articles > div > div > div:nth-child(1) > div.item-content > div > div.item-content > h5 > a"))?.click())

  })
  // mount component to context window
  const container = document.createElement('div')
  container.setAttribute('style','position:relative')
  const root = document.createElement('div')
  const styleEl = document.createElement('link')
  const shadowDOM = container.attachShadow?.({ mode: __DEV__ ? 'open' : 'closed' }) || container
  styleEl.setAttribute('rel', 'stylesheet')
  styleEl.setAttribute('href', browser.runtime.getURL('dist/contentScripts/style.css'))
  shadowDOM.appendChild(styleEl)
  // root.setAttribute('style','background-color:red;')
  root.setAttribute('class','abcdefg')
  shadowDOM.appendChild(root)


  const inject = document.createElement('script')
  inject.setAttribute('type', 'text/javascript')
  inject.src = browser.runtime.getURL('dist/injectScripts/index.inject.js')
  shadowDOM.appendChild(inject)

  createApp(App).mount(root)
  injectBody(container)
})()

function injectBody(container: HTMLDivElement) {
  new Promise((resolve) => {
    console.log('try inject contentJS');
    setTimeout(() => {
      if (document.body) {
        document.body.appendChild(container)
        resolve(true);
      } else {
        injectBody(container);
        resolve(false)
      }
    }, 200);
  })
}