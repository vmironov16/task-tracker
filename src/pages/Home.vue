<template lang="pug">
    v-container
        PageTransition
            TasksList(v-if="!loading" key="item")
            Loader(v-if="loading" key="item")
</template>

<script>
import TasksList from '@/components/Tasks/TasksList';
import Loader from '@/components/UI/Loader';

import PageTransition from '@/components/UI/PageTransition';

export default {
  name: 'Home',
  components: {
    Loader,
    TasksList,
    PageTransition,
  },
  data: () => ({
  }),
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
  },
  methods: {
  },
};
</script>

<style>
    .list-item {
        display: inline-block;
        margin-right: 10px;
    }
    .list-enter-active, .list-leave-active {
        transition: all 1s;
    }
    .list-enter, .list-leave-to /* .list-leave-active до версии 2.1.8 */ {
        opacity: 0;
        transform: translateY(30px);
    }
</style>
