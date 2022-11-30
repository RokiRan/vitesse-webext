<script lang="ts" setup>
import MatchItem from './components/MatchItem.vue'
const props = defineProps(['matches'])
</script>

<template>
  <div>
    <div>这是SB</div>
    <div>{{props.matches}}</div>
    <MatchItem v-for="match in props.matches" :match="match" :key="match" />
  </div>
</template>
