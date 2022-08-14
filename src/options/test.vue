<script setup lang="ts">
import type { Tab } from '~/util/Tab'
const regTabs = reactive<Tab[]>([{ id: '0', name: 'test2' }])
</script>

<template>
  <main class="px-4 py-10 text-center text-gray-700 dark:text-gray-200">
    <div>
      <div v-for="item in regTabs" :key="item.id">
        {{ item.name }}
      </div>
    </div>
  </main>
</template>
