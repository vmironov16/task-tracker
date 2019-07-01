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
                strong.subheading Get connected with me!
                v-spacer
                v-btn.mx-3(
                    v-for='icon in icons'
                    :key='icon'
                    dark icon
                )
                    v-icon(
                        size='24px'
                    ) {{ icon }}
            v-card-actions.grey.darken-3.justify-center
                | ©2019 —
                strong Vladislav Mironov
</template>

<script>
export default {
  data: () => ({
    icons: [
      'face',
      'fab fa-twitter',
      'fab fa-google-plus',
      'fab fa-linkedin',
      'fab fa-instagram',
    ],
  }),
};
</script>

<style scoped>

</style>
