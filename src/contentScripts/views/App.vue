<script setup lang="ts">
import { io, Socket } from "socket.io-client";
import { useToggle } from '@vueuse/core'
import { onMessage, sendMessage } from 'webext-bridge'
import { CHANNEL, baseOrder } from '~/types/Orders'
import browser from 'webextension-polyfill'
import $ from 'jquery'
import 'virtual:windi.css'
const [show, toggle] = useToggle(false)
const isInIframe = (self !== top);

const switchPop = { top: (Math.random() * 150) + 'px' };
// ws状态
let socket: Socket | null = null;
const wsStatue = ref('未连接');
window.addEventListener('hookAjaxResponse', ({ detail }) => {
  console.log('收到消息', detail!)
})
onMessage(CHANNEL.SYSTEM_OPEN_ASIDE, data => {
  toggle();
})
onMessage(CHANNEL.SYSTEM_TEST_SPIDER, data => {
  console.log('测试爬虫', data.data)
  const result = doXpath(data.data as unknown as baseOrder);
  if (result && result.childNodes && result.childNodes.length > 1) {
    console.log('childNode', result.childNodes.length);
  } else {
    console.log('innerText', result?.innerText)
    sendMessage(CHANNEL.SYSTEM_RESPONSE, result?.innerText as string, 'options')
  }
})
// sendMessage(CHANNEL.SYSTEM_REGISTER, 'register', 'options')
const registerTabOrIframe = () => {
  browser.runtime.sendMessage('', 'registerTab');
}
function doXpath(x: baseOrder) {
  const res = document.evaluate(x.script, document.documentElement, null,
    XPathResult.FIRST_ORDERED_NODE_TYPE, null)
  console.log('执行', res);
  return res.singleNodeValue ? res.singleNodeValue as HTMLElement : null;
}
function transPk(pk: string, split = '/') {
  const str = pk.split(split)
  if (str.length === 1) return `(${pk})`
  if (str.length === 2) return `(${(Number.parseFloat(str[0]) + Number.parseFloat(str[1])) / 2})`
  return false;
}
function getP2OddFromDom() {
  let matchesArr = <Record<string, any>>{};
  $('#mainArea > div.c-odds-page > div.c-odds-table--sport1').eq(0).find('div.c-league').each(function (index, ele) {//每个联赛
    let obj = {
      lsName: '',
      matches: <any>{}
    }
    obj.lsName = $(ele).find('div.c-league__header > div.c-league__info >div.c-league__name').eq(0).text();
    obj.matches = {};
    $(ele).find('div.c-match-group > div').each(function (inde, el) {//该联赛下的比赛

      let mMatch = <Record<string, any>>{};
      let zhu = $(el).find('div > div.c-match__odds-group > div:nth-child(1) > div.c-match__event > div:nth-child(1) > div.c-team > div > span').text();
      let ke = $(el).find('div > div.c-match__odds-group > div:nth-child(1) > div.c-match__event > div:nth-child(2) > div.c-team > div > span').text();
      mMatch.mDuizhen = zhu + ' -vs- ' + ke;

      mMatch.mBf = $(el).find('div.c-match__timer > div.c-match-score').text();
      mMatch.mTime = $(el).find('div.c-match__timer > div.c-match-timer-info > span > span').text();

      $(el).find('div.c-match__odds-group > div.c-match__odds').each(function (i, e) {
        let oddItem = <Record<string, any>>{};//全场
        let oddItem_h = {};//半场
        oddItem.type = '全场大/小';//类型，半全场
        oddItem.pk = $(e).find('div.c-bettype-col').eq(1).find('div.c-odds-button>span.c-text-goal').text();//让球

        if (oddItem.pk.indexOf('/') >= 0) {
          oddItem.pk = transPk(oddItem.pk) // '(' + eval(oddItem.pk.replace(/\//g, "+")) / 2 + ')';
        } else if (oddItem.pk) {
          if (oddItem.pk.indexOf('.0') >= 0) {
            oddItem.pk = '(' + parseInt(oddItem.pk) + ')';
          } else {
            oddItem.pk = '(' + oddItem.pk + ')';
          }
          // oddItem.pk = '(' + oddItem.pk + ')';
        }
        oddItem['odd_D'] = $(e).find('div.c-bettype-col').eq(1).find('div:nth-child(1)>span.c-odds').eq(0).text();
        let Xpath = $(e).find('div.c-bettype-col').eq(1).find('div:nth-child(1)>span.c-odds').eq(0).attr('data-moid');
        if (oddItem['odd_D']) {
          oddItem['odd_D'] = parseFloat(oddItem['odd_D']);
        }
        oddItem['odd_D_Selecter'] = Xpath;//"$('span[data-moid=\""+Xpath+"\"]:nth-child(1)').click()";
        oddItem.event = $('span[data-moid="' + Xpath + '"]').parent().parent().parent().parent().parent().find('div.c-match-status-tag').attr('title');
        oddItem['odd_X'] = $(e).find('div.c-bettype-col').eq(1).find('div:nth-child(2)>span.c-odds').eq(0).text();
        if (oddItem['odd_X']) {
          oddItem['odd_X'] = parseFloat(oddItem['odd_X'])
        }
        oddItem['odd_X_Selecter'] = Xpath;// "$('span[data-moid=\""+Xpath+"\"]:nth-child(2)').click()";
        if (oddItem.pk && oddItem.pk != '()') {
          mMatch[oddItem.type] = mMatch[oddItem.type] ? mMatch[oddItem.type] : {};
          mMatch[oddItem.type][oddItem.pk] = oddItem;
          obj.matches[mMatch.mDuizhen] = (mMatch);
        }
        let isHasHalf = $(e).find('div.c-bettype-col').eq(5).find('div.c-odds-button>span.c-text-goal').text();//是否又上半场盘口

        if (isHasHalf) {
          let oddItem_h = <Record<string, any>>{};//半场
          oddItem_h.type = '上半场大/小';//类型，半全场
          oddItem_h.pk = isHasHalf;//$(e).find('div.odds.subtxt:nth-child(4)>div.betArea:nth-child(1) > span').eq(0).text();//让球
          if (oddItem_h.pk.indexOf('/') >= 0) {
            oddItem_h.pk = transPk(oddItem_h.pk)  // '(' + eval(oddItem_h.pk.replace(/\//g, "+")) / 2 + ')';
          } else if (oddItem_h.pk) {
            // oddItem_h.pk = '(' + oddItem_h.pk + ')';
            if (oddItem_h.pk.indexOf('.0') >= 0) {
              oddItem_h.pk = '(' + parseInt(oddItem_h.pk) + ')';
            } else {
              oddItem_h.pk = '(' + oddItem_h.pk + ')';
            }
            // oddItem.pk = '(' + oddItem.pk + ')';
          }
          oddItem_h['odd_D'] = $(e).find('div.c-bettype-col').eq(5).find('div:nth-child(1)>span.c-odds').eq(0).text();
          let XpathH = $(e).find('div.c-bettype-col').eq(5).find('div:nth-child(1)>span.c-odds').eq(0).attr('data-moid');
          if (oddItem_h['odd_D']) {
            oddItem_h['odd_D'] = parseFloat(oddItem_h['odd_D']);
          }
          oddItem_h['odd_D_Selecter'] = XpathH//"$('span[data-moid=\""+XpathH+"\"]:nth-child(1)').click()";
          oddItem_h.event = $('span[data-moid="' + Xpath + '"]').parent().parent().parent().parent().parent().find('div.c-match-status-tag').attr('title');
          oddItem_h['odd_X'] = $(e).find('div.c-bettype-col').eq(5).find('div:nth-child(2)>span.c-odds').eq(0).text();
          if (oddItem_h['odd_X']) {
            oddItem_h['odd_X'] = parseFloat(oddItem_h['odd_X'])
          }
          oddItem_h['odd_X_Selecter'] = XpathH;//"$('span[data-moid=\""+XpathH+"\"]:nth-child(2)').click()";
          mMatch[oddItem_h.type] = mMatch[oddItem_h.type] ? mMatch[oddItem_h.type] : {};
          mMatch[oddItem_h.type][oddItem_h.pk] = oddItem_h;
          obj.matches[mMatch.mDuizhen] = (mMatch);
        }
      })

    });
    if (!matchesArr[obj.lsName])
      matchesArr[obj.lsName] = (obj);
    else {
      for (let o in obj.matches) {
        matchesArr[obj.lsName][o] = obj.matches[o];
      }
    }
  });
  console.log('抓取结果', matchesArr)
  sendMessage(CHANNEL.ODD_POST, {
    from: 'sb',
    data: matchesArr
  }, 'options')
}

onMounted(() => {
  // socket = io('ws://localhost/', {
  //   reconnection: true,
  //   reconnectionAttempts: 2,
  // })
  
})
function initWs() {
  if (socket) return;
  socket = io('ws://localhost/', {
    reconnection: true,
    reconnectionAttempts: 2,
  })
  console.log('socket:', socket);
  socket.on('connect', () => {  
    wsStatue.value = '已连接';
    console.log('connect');
    socket?.send('message', 'hello:'+ window.location.href);
  })
  socket.on('disconnect', () => {
    wsStatue.value = '已断开';
    console.log('disconnect');
  })
  socket.on('error', (err) => {
    wsStatue.value = '已断开:'+ err.message;
    console.log('error:', err);
  })
  socket.on('message', (data) => {
    console.log('message:', data);
  })
}
function disconnect() {
  socket?.disconnect();
}
function reconnection() {
  disconnect();
  initWs();
}
</script>

<template>
  <!-- 控制开关 -->
  <div class="w-10 h-10 cursor-pointer fixed bottom-0 left-0 iframe-btn"
    @dblclick.prevent.self="toggle()">
  </div>
  <div class="h-100vh w-20vw fixed font-sans select-none top-0 leading-1em bg-aside" :class="show ? 'show' : ''"
    transition="duration-300">
    <div class="bg-light-50 text-center p-2 font-medium">状态:{{ wsStatue }}</div>
    <div class="absolute top-2 right-2 cursor-pointer" @click="toggle()">
      <pixelarticons-close class="block m-auto text-white text-lg" />
    </div>
    <div>
      <!-- <button class="btn" @click="registerTabOrIframe">注册窗口</button>
      <button class="btn" @click="getP2OddFromDom">测试爬取</button> -->
      <button class="btn" @click="reconnection" v-show="wsStatue !== '已连接'">链接ws</button>
      <button class="btn" @click="disconnect" v-show="wsStatue === '已连接'">断开ws</button>
    </div>
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