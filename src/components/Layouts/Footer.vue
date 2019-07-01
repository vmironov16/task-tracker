<template lang="pug">
    v-footer(
        dark
        height='auto'
    )
        v-card.flex(
            flat
            tile

            color="primary"
        ).darken-4
            v-card-title
                strong.subheading Social links
                v-spacer
                v-btn.mx-3(
                    v-for='(item, key) in socialLinks'
                    :key='key'
                    dark
                    icon
                    :href="item.link"
                    target="_blank"
                )
                    v-icon(
                        size='24px'
                    ) {{ item.icon }}
            v-card-actions.grey.darken-3.justify-center
                | ©2019 —
                strong Vladislav Mironov
</template>

<script>
export default {
  computed: {
    socialLinks() {
      return this.$store.getters.socialLinks;
    },
  },
};
</script>

<style scoped>

</style>
