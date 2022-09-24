<template>
    <Input v-model:value="props.value" @input="updateValue">
    <template #addonBefore class="w-30">
        <div class="min-w-12">{{ props.title }}</div>
    </template>
    <template #addonAfter>
        <span class="cursor-pointer" @click="test">测试</span>
    </template>
    </Input>
</template>
<script lang="ts" setup>
import { Input, message } from 'ant-design-vue';

const emit = defineEmits(['update:value', 'testClick']);

const props = defineProps({
    title: {
        type: String,
        default: '标题'
    },
    value: {
        type: String,
        default: ''
    }
})
function test() {
    // message.info(value.value)
    // if (!value.value) return;
    emit('testClick', props.value);
}
// watch(props.value, (nv, ov) => {
//     if (nv != ov && !nv)
//         emit('update:value', nv);
// })
// setInterval(() => { console.log('--', value.value) }, 2000)
function updateValue(event: Event) {
    emit('update:value', event.target!.value);
}
</script>
<style scoped lang='less'>

</style>