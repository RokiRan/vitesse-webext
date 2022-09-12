<script lang="ts" setup>
import { testSpiderObj, registeredWindows } from '~/logic/storage'
import { Input, Select } from 'ant-design-vue';
import { sendMessage } from 'webext-bridge';
import { CHANNEL } from '~/types/Orders';

const selectWindow = ref<string | number>('');

function testSpider(xpath: string) {
  const target = registeredWindows.value.filter(item => selectWindow.value == item.frameId + '' + item.tabId)
  if (!target || !target.length) return;
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
    <div>
      <!-- <div v-for="(value, key) in testSpiderObj">
        <SpiderInput :keyName="key" :rule-item="value" @on-test="onTest" />
      </div> -->
      <Input v-model:value="testSpiderObj.league.first">
      <template #addonBefore class="w-30">
        联赛1
      </template>
      <template #addonAfter>
        <span class="cursor-pointer" @click="testSpider(testSpiderObj.league.first)">测试</span>
      </template>
      </Input>
      <Input v-model:value="testSpiderObj.league.second">
      <template #addonBefore>
        联赛2
      </template>
      <template #addonAfter>
        <span class="cursor-pointer" @click="testSpider(testSpiderObj.league.second)">测试</span>
      </template>
      </Input>

      <Input v-model:value="testSpiderObj.leagueName">
      <template #addonBefore>
        联赛名称
      </template>
      <template #addonAfter>
        <span class="cursor-pointer" @click="testSpider(testSpiderObj.leagueName)">测试</span>
      </template>
      </Input>

      <Input v-model:value="testSpiderObj.match.first">
      <template #addonBefore>
        比赛1
      </template>
      <template #addonAfter>
        <span class="cursor-pointer" @click="testSpider(testSpiderObj.match.first)">测试</span>
      </template>
      </Input>

      <Input v-model:value="testSpiderObj.match.second">
      <template #addonBefore>
        比赛2
      </template>
      <template #addonAfter>
        <span class="cursor-pointer" @click="testSpider(testSpiderObj.match.second)">测试</span>
      </template>
      </Input>

      <Input v-model:value="testSpiderObj.matchTime">
      <template #addonBefore>
        比赛时间
      </template>
      <template #addonAfter>
        <span class="cursor-pointer" @click="testSpider(testSpiderObj.matchTime)">测试</span>
      </template>
      </Input>

      <Input v-model:value="testSpiderObj.matchScore.home">
      <template #addonBefore>
        主队比分
      </template>
      <template #addonAfter>
        <span class="cursor-pointer" @click="testSpider(testSpiderObj.matchScore.home)">测试</span>
      </template>
      </Input>

      <Input v-model:value="testSpiderObj.matchScore.away">
      <template #addonBefore>
        客队比分
      </template>
      <template #addonAfter>
        <span class="cursor-pointer" @click="testSpider(testSpiderObj.matchScore.away)">测试</span>
      </template>
      </Input>

      <Input v-model:value="testSpiderObj.odd.first">
      <template #addonBefore>
        赔率1
      </template>
      <template #addonAfter>
        <span class="cursor-pointer" @click="testSpider(testSpiderObj.odd.first)">测试</span>
      </template>
      </Input>

      <Input v-model:value="testSpiderObj.odd.second">
      <template #addonBefore>
        赔率2
      </template>
      <template #addonAfter>
        <span class="cursor-pointer" @click="testSpider(testSpiderObj.odd.second)">测试</span>
      </template>
      </Input>

      <Input v-model:value="testSpiderObj.oddOu.first.home">
      <template #addonBefore>
        赔率-半场-主队
      </template>
      <template #addonAfter>
        <span class="cursor-pointer" @click="testSpider(testSpiderObj.oddOu.first.home)">测试</span>
      </template>
      </Input>
      <Input v-model:value="testSpiderObj.oddOu.first.away">
      <template #addonBefore>
        赔率-半场-客队
      </template>
      <template #addonAfter>
        <span class="cursor-pointer" @click="testSpider(testSpiderObj.oddOu.first.away)">测试</span>
      </template>
      </Input>

      <Input v-model:value="testSpiderObj.oddOu.second.home">
      <template #addonBefore>
        赔率-全场-主队
      </template>
      <template #addonAfter>
        <span class="cursor-pointer" @click="testSpider(testSpiderObj.oddOu.second.home)">测试</span>
      </template>
      </Input>

      <Input v-model:value="testSpiderObj.oddOu.second.away">
      <template #addonBefore>
        赔率-全场-客队
      </template>
      <template #addonAfter>
        <span class="cursor-pointer" @click="testSpider(testSpiderObj.oddOu.second.away)">测试</span>
      </template>
      </Input>

      <Input v-model:value="testSpiderObj.event">
      <template #addonBefore>
        特殊事件
      </template>
      <template #addonAfter>
        <span class="cursor-pointer" @click="testSpider(testSpiderObj.event)">测试</span>
      </template>
      </Input>
    </div>
  </div>
</template>