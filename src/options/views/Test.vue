<script lang="ts" setup>
import { testSpiderObj, registeredWindows } from '~/logic/storage'
import { Select, message, Button } from 'ant-design-vue';
import { sendMessage } from 'webext-bridge';
import { CHANNEL } from '~/types/Orders';
import MyInput from './components/Input.vue';

const selectWindow = ref<string | number>('');
const first = ref('//*[@id="juejin"]/div[1]/main/div/div/div/div/div/div/div/li[1]/div/div[2]/div/div[1]/a')
const second = ref('//*[@id="juejin"]/div[1]/main/div/div/div/div/div/div/div/li[2]/div/div[2]/div/div[1]/a')

function test() {

}
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
    <div class="w-80">
        <Select v-model:value="selectWindow" class="w-[calc(100%)]"
            :options="registeredWindows.map(item => ({ label: item.title + ':' + item.frameId, key: (item.frameId + '' + item.tabId), value: (item.frameId + '' + item.tabId) }))"></Select>
    </div>
    <MyInput v-model:value="first" title="First" @testClick="testSpider" />
    <MyInput v-model:value="second" title="Second" @testClick="testSpider" />
    <div>

        <button class="border-dark-50 border-solid btn mt-5" @click="test()">
            重置
        </button>
    </div>
</template>