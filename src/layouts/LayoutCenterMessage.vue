<template lang="pug">
.layout-center-message
    .message-box
        slot
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
.layout-center-message{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
}
.message-box{
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0 0 20px 20px #0002;
}
</style>