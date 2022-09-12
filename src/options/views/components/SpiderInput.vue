<template>
    <div>
        <div v-if="typeof props.ruleItem == 'string'">
            <Input v-model:value="props.ruleItem">
            <template #addonBefore>
                {{props.keyName}}
            </template>
            <template #addonAfter>
                <span class="cursor-pointer" @click="testSpider(props.ruleItem)">测试</span>
            </template>
            </Input>
        </div>
        <div v-else>
            <div v-for="(value, key) in props.ruleItem">
                <SpiderInput :keyName="key" :rule-item="value" @on-test="emit('onTest', value)"></SpiderInput>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { Input } from 'ant-design-vue'
import { testSpiderObj } from '~/logic/storage'


const props = defineProps(['ruleItem', 'keyName']);
const emit = defineEmits(['onTest']);
function testSpider(xpath: string) {
    //   const target = registeredWindows.value.filter(item => selectWindow.value == item.frameId + '' + item.tabId)
    //   if (!target || !target.length) return;
    //   sendMessage(CHANNEL.SYSTEM_TEST_SPIDER, xpath, {
    //     tabId: target[0].tabId,
    //     context: 'content-script',
    //     frameId: target[0].frameId,
    //   })
    emit('onTest', xpath);
}
</script>
<style scoped lang='less'>

</style>