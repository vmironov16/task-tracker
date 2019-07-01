<template>
        <v-snackbar
                :timeout="5000"
                :multi-line="true"
                color="error"
                @input="closeError"
                :value="true"
                v-if="error"
        >
            {{error}}
            <v-btn flat dark @click.native="closeError">Close</v-btn>
        </v-snackbar>
</template>

<script>
export default {
  data() {
    return {
      name: 'ErrorSnackbar',
      message: 'message',
    };
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },
  },
  methods: {
    closeError() {
      this.$store.dispatch('clearError');
    },
  },

};
</script>

<style scoped>

</style>
