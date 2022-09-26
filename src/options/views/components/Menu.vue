<script lang="ts" setup>
// 运行时
// const emit = defineEmits(['update'])
// 基于类型
// const emit = defineEmits<{
//   (e: 'update', value: string): void

import router from '~/options/router'

// }>()
const pagePath = [
  {
    title: '主页',
    path: '/',
  },
  {
    title: '赛事',
    path: '/matches',
  },
  {
    title: '设置',
    path: '/setting',
  },
  {
    title: '测试',
    path: '/test',
  },
]
const navToPage = (path: string) => {
  router.push({
    path,
  })
}
</script>

<template>
  <div class="flex flex-col min-w-25 dark:bg-dark-50 dark:font-light">
    <div v-for="menu in pagePath" :key="menu.title" class="hover:cursor-pointer px-8 py-5"
      @click="navToPage(menu.path)">
      {{ menu.title }}
    </div>
  </div>
</template>
