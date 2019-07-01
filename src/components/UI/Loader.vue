<template lang="pug">
    v-container
        v-layout(
            row
        )
            v-flex.text-xs-center.pt-5(xs12)
                v-progress-circular(
                    indeterminate
                    :size='100'
                    :width='4'
                    color='primary'
                )

</template>

<script>
export default {
  name: 'Loader',
};
</script>

<style scoped>

</style>
