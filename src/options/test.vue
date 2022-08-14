<script setup lang="ts">
import {Tab} from '~/util/Tab'
const regTabs = reactive<Tab[]>([{id:'0',name:'test'}])
</script>

<template>
  <main class="px-4 py-10 text-center text-gray-700 dark:text-gray-200">
    <div>
        <div v-for="tab in regTabs" :key="tab.id">
        {{Tab.name}}
        </div>
    </div>
  </main>
</template>
