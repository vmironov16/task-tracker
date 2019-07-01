<template lang="pug">
  #app
    v-app
        Header
            Navigation
        Body
            PageTransition
                router-view
            Error
        Footer
</template>

<script>
import Header from '@/components/Layouts/Header';
import Body from '@/components/Layouts/Body';
import Footer from '@/components/Layouts/Footer';

import Navigation from '@/components/UI/Navigation';
import PageTransition from '@/components/UI/PageTransition';

import Error from '@/components/UI/ErrorSnackbar';

export default {
  name: 'App',
  components: {
    Header,
    Navigation,
    Body,
    Error,
    Footer,
    PageTransition,
  },
};
</script>

<style></style>
