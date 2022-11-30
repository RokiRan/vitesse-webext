<script lang="ts" setup>
const props = defineProps(['match'])
</script>

<template>
    <div>
        <div>这是一场比赛</div>
        <div>{{props.match}}</div>
    </div>
</template>
