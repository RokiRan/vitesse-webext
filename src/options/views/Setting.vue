<script lang="ts" setup>
import { testSpiderObj, registeredWindows } from '~/logic/storage'
import { Select, message, Button } from 'ant-design-vue';
import { sendMessage } from 'webext-bridge';
import { CHANNEL } from '~/types/Orders';
import MyInput from './components/Input.vue';
const selectWindow = ref<string | number>('');

function testSpider(xpath: string) {
  const target = registeredWindows.value.filter(item => selectWindow.value == item.frameId + '' + item.tabId)
  console.log(xpath);
  if (!target || !target.length) return message.info('目标为空');
  sendMessage(CHANNEL.SYSTEM_TEST_SPIDER, xpath, {
    tabId: target[0].tabId,
    context: 'content-script',
    frameId: target[0].frameId,
  })
}
function test() {
  const res = getLength(testSpiderObj.value.leagueNameFirst, testSpiderObj.value.leagueNameSecond)
  console.log(res)
}
function getLength(first: string, second: string) {
  const index = getIndex(first, second);
  if (index === 0) return console.log('getLength', '未找到元素')

}
// 对比xpath，获取循环的下标
function getIndex(first: string, second: string) {
  if (!first || !second) {
    return 0
  }
  for (let i = 0; i < Math.min(first.length, second.length); i++) {
    if (first.charAt(i) !== second.charAt(i)) {
      return i;
    }
  }
  return 0;
}
</script>

<template>
  <div>
    <div>设置页面</div>
    <div class="w-80">
      <Select v-model:value="selectWindow" class="w-[calc(100%)]"
        :options="registeredWindows.map(item => ({ label: item.title + ':' + item.frameId, key: (item.frameId + '' + item.tabId), value: (item.frameId + '' + item.tabId) }))"></Select>
    </div>
    <Button @click="test">测试</Button>
    <div class="w-[calc(100%)]">
      <table class="border border-collapse w-[calc(100%+0rem)]">
        <tbody>
          <tr>
            <td colspan="5">
              <MyInput v-model:value="testSpiderObj.leagueNameFirst" title="联赛1" @testClick="testSpider" />
            </td>
          </tr>
          <tr>
            <td>
              <MyInput v-model:value="testSpiderObj.matchNameHomeFirst" title="主队1" @testClick="testSpider" />
              <MyInput v-model:value="testSpiderObj.matchNameAwayFirst" title="客队" @testClick="testSpider" />
            </td>
            <td>
              <MyInput v-model:value="testSpiderObj.matchScoreHome" title="主队比分" @testClick="testSpider" />
              <MyInput v-model:value="testSpiderObj.matchScoreAway" title="客队比分" @testClick="testSpider" />
            </td>
            <td>
              <MyInput v-model:value="testSpiderObj.matchTime" title="时间" @testClick="testSpider" />
            </td>

            <td>
              <MyInput v-model:value="testSpiderObj.odd.OU.whole.pk" title="盘口" @testClick="testSpider" />
              <MyInput v-model:value="testSpiderObj.odd.OU.whole.home" title="主" @testClick="testSpider" />
              <MyInput v-model:value="testSpiderObj.odd.OU.whole.away" title="客" @testClick="testSpider" />
            </td>
            <td>
              <MyInput v-model:value="testSpiderObj.odd.OU.half.pk" title="盘口" @testClick="testSpider" />
              <MyInput v-model:value="testSpiderObj.odd.OU.half.home" title="主" @testClick="testSpider" />
              <MyInput v-model:value="testSpiderObj.odd.OU.half.away" title="客" @testClick="testSpider" />
            </td>
          </tr>
          <tr>
            <td colspan="3"></td>
            <td colspan="2">
              <MyInput v-model:value="testSpiderObj.oddIndex" title="盘口2" @testClick="testSpider" />
            </td>
          </tr>
          <tr>
            <td colspan="5">
              <MyInput v-model:value="testSpiderObj.matchNameHomeSecond" title="主队2" @testClick="testSpider" />
            </td>
          </tr>
          <tr>
            <td colspan="5">
              <MyInput v-model:value="testSpiderObj.leagueNameSecond" title="联赛2" @testClick="testSpider" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <code>
        {{testSpiderObj}}
    </code>
  </div>
</template>

<style>
td {
  border: 1px solid #CDCDCD;
}
</style>