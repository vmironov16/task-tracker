<template lang="pug">
    v-layout
        v-navigation-drawer(
            v-model='drawer'
            fixed
            app
        )
            v-list(dense)
                v-list-tile(
                    @click=''
                    v-for="nav in navsData"
                    :key="nav.title"
                    :to="nav.path"
                )
                    v-list-tile-action
                        v-icon {{nav.icon}}
                    v-list-tile-content
                        v-list-tile-title(v-text="nav.title")
                v-list-tile(
                    v-if="isUserLoggedIn"
                    @click='onLogout'
                )
                    v-list-tile-action
                        v-icon exit_to_app
                    v-list-tile-content
                        v-list-tile-title(v-text="'Logout'")
        v-toolbar(
            color='primary'
            dark
            fixed
            app
        )
            v-toolbar-side-icon(@click.stop='drawer = !drawer')
            v-toolbar-title Task Tracker
</template>

<script>

import routes from '@/router/routes';

export default {
  name: 'Navigation',
  data: () => ({
    drawer: false,
  }),
  computed: {
    navsData() {
      const navs = routes.map(
        (route) => {
          const navItem = {
            path: route.path,
          };

          if (navItem.path === '/') {
            navItem.icon = 'home';
            navItem.title = 'Main';
            return navItem;
          }
          if (navItem.path === '/login') {
            navItem.icon = 'account_box';
            navItem.title = 'Login';
            return false;
          }
          if (navItem.path === '/registration') {
            navItem.icon = 'account_box';
            navItem.title = 'Registration';
            return navItem;
          }
          if (navItem.path === '/tasks') {
            navItem.icon = 'featured_play_list';
            navItem.title = 'Tasks';
            return navItem;
          }
          return null;
        },
      ).filter(navItem => ((navItem) || false));

      return navs;
    },
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn;
    },
  },
  methods: {
    onLogout() {
      this.$router.push('/login?logout=true');
    },
  },
};
</script>

<style scoped>

</style>
