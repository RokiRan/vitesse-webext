<script lang="ts" setup>
import { onMessage } from 'webext-bridge'
import MenuVue from '../views/components/Menu.vue'
import { CHANNEL } from '~/types/Orders'

const matchOdds = reactive<{ sb: any }>({
  sb: {},
})
onMessage(CHANNEL.ODD_POST, (data) => {
  console.log('收到赔率', data)
  matchOdds.sb = data.data
})
</script>

<template>
  <div class="flex flex-row">
    <div>
      <MenuVue />
    </div>
    <div class="flex-1">
      <router-view />
    </div>
  </div>
</template>
