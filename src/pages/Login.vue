<template lang="pug">
    v-layout
        v-flex(xs-12)
            PageTransition
                v-tabs(
                    v-model='activeKeyTab'
                    dark
                    slider-color='yellow'
                    centered
                    v-if="!isUserLoggedIn"
                )
                    v-tab(
                        key='login'
                        ripple
                    )
                        | Login
                    v-tab(
                        key='registration'
                        ripple
                    )
                        | Registration
                    v-tab-item(key='login')
                        v-card(flat)
                            v-layout
                                LoginForm
                    v-tab-item(key='registration')
                        v-card(flat)
                            RegistrationForm
                v-layout(
                    v-if="isUserLoggedIn"
                    row
                    wrap
                ).pa-5
                    v-flex(d-block xs12)
                        h2.text-xs-center You are already logged in
                    v-flex(d-block).text-xs-center
                        v-btn(
                            color="primary"
                            large
                            @click="logout"

                        ) Logout
</template>

<script>
import LoginForm from '@/components/Auth/Login';
import RegistrationForm from '@/components/Auth/Registration';
import PageTransition from '@/components/UI/PageTransition';

export default {
  name: 'Login',

  components: {
    LoginForm,
    RegistrationForm,
    PageTransition,
  },
  data() {
    return {
      activeKeyTab: 0,
    };
  },
  computed: {

    loading() {
      return this.$store.getters.loading;
    },
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn;
    },
  },
  created() {
    if (this.$route.query.loginError) {
      this.$store.dispatch('setError', 'Please log in to access this page.');
    }
    if (this.$route.query.logout) {
      this.logout();
      this.$router.push('/');
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logoutUser');
    },
  },
};
</script>

<style scoped>

</style>
