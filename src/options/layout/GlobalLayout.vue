<script lang="ts" setup>
import MenuVue from '../views/components/Menu.vue'

</script>

<template>
  <div class="flex flex-row">
    <div>
      <MenuVue/>
    </div>
    <div class="flex-1">
      <router-view></router-view>
    </div>
  </div>
</template>
