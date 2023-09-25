<template lang="pug">
.container
    .home-inputs
        slot(name="inputs")
    .home-grid
        slot
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
.container{
    max-width: min(1280px,100%);
    margin-left: auto;
    margin-right: auto;
    padding: 20px;
}
.home-grid{
    display: grid;
    grid-template-columns: repeat(6,1fr);
}
.home-inputs{
    margin-bottom: 20px;
}
@media (min-width: 756px) and (max-width: 1279.998px) {
    .container{
        max-width: min(1250px,100%);
    }
    .home-grid{
        grid-template-columns: repeat(4,1fr);
    }
}
@media (min-width: 320px) and (max-width: 755.998px) {
    .container{
        max-width: min(750px,100%);
    }
    .home-grid{
        grid-template-columns: repeat(2,1fr);
    }
}
</style>