<script lang="ts" setup>
import { testSpiderObj, registeredWindows } from '~/logic/storage'
import { Select, message } from 'ant-design-vue';
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
</script>

<template>
  <div>
    <div>设置页面</div>
    <div class="w-80">
      <Select v-model:value="selectWindow" class="w-[calc(100%)]"
        :options="registeredWindows.map(item => ({ label: item.title + ':' + item.frameId, key: (item.frameId + '' + item.tabId), value: (item.frameId + '' + item.tabId) }))"></Select>
    </div>

    <div class="w-[calc(100%)]">
      <table>
        <tbody>
          <tr>
            <td rowspan="6">联赛</td>
          </tr>
          <tr>
            <td>比分</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="w-[calc(100%)]">
      <table class="border border-collapse w-[calc(100%+0rem)]">
        <tbody>
          <tr class="border">
            <td colspan="5">
              <MyInput v-model:value="testSpiderObj.league.first" title="联赛1" @testClick="testSpider" />
            </td>
          </tr>
          <tr>
            <td rowspan="4">比赛1</td>
            <td>
              <MyInput v-model:value="testSpiderObj.matchName.home" title="主队1" @testClick="testSpider" />
            </td>
            <td rowspan="2">赔率1
            </td>
            <td rowspan="2">
              <MyInput v-model:value="testSpiderObj.oddOu.first.pk" title="盘口" @testClick="testSpider" />
            </td>
            <td>
              <MyInput v-model:value="testSpiderObj.oddOu.first.home" title="全-大" @testClick="testSpider" />
            </td>
            <td>
              <MyInput v-model:value="testSpiderObj.oddOu.second.home" title="半-大" @testClick="testSpider" />
            </td>
          </tr>
          <tr>
            <td>
              <MyInput v-model:value="testSpiderObj.matchName.away" title="客队1" @testClick="testSpider" />
            </td>
            <td>
              <MyInput v-model:value="testSpiderObj.oddOu.first.away" title="全-小" @testClick="testSpider" />
            </td>
            <td>
              <MyInput v-model:value="testSpiderObj.oddOu.first.away" title="半-小" @testClick="testSpider" />
            </td>
          </tr>
          <tr>
            <td></td>
            <td colspan="">
              赔率2
            </td>
            <td colspan="2">
              <MyInput v-model:value="testSpiderObj.oddOu.second.home" title="全-大" @testClick="testSpider" />
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <MyInput v-model:value="testSpiderObj.matchName.home" title="主队1" @testClick="testSpider" />
            </td>
            <td colspan="2">
              <MyInput v-model:value="testSpiderObj.event" title="事件" @testClick="testSpider" />
            </td>
          </tr>
          <tr>
            <td>比赛2</td>
            <td colspan="4">
              <MyInput v-model:value="testSpiderObj.match.second" title="主队2" @testClick="testSpider" />
            </td>
          </tr>
          <tr class="border">
            <td colspan="5">
              <MyInput v-model:value="testSpiderObj.league.second" title="联赛2" @testClick="testSpider" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <code>
        {{testSpiderObj}}
      </code>
    </div>
  </div>
</template>

<style>
td {
  border: 1px solid #CDCDCD;
}
</style>