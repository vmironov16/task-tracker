<template lang="pug">
    transition(
        name="slide-fade"
        mode="out-in"
        appear
    )
        slot
</template>

<script>
export default {
  name: 'PageTransition',
};
</script>

<style scoped>
    .slide-fade-enter-active {
        transition: transform .3s ease, opacity .4s;
    }
    .slide-fade-leave-active {
        transition: transform .3s cubic-bezier(1.0, 0.5, 0.8, 1.0), opacity .4s;
    }
    .slide-fade-enter, .slide-fade-leave-to {
        transform: translateX(100px);
        transform: scaleY(.3);
        opacity: 0;
    }
</style>
