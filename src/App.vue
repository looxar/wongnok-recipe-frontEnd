<template>
  <v-app>

      <component v-bind:is="layout"></component>
  </v-app>
</template>

<script>
import BaseLayout from './layout/Base'

export default {
  name: 'App',

  data: () => ({

  }),
  computed: {
    layout(){
      return this.$store.state.layout;
    }
  },
  components: {
    'baseLayout': BaseLayout,
  },
  methods: {
    setAuthenticated(status) {
      this.authenticated = status;
    },
    logout() {
      localStorage.clear();
      this.authenticated = false;
    }
  },
  mounted() {
    // if (!this.authenticated) {
    //   // this.$router.replace({ name: "/" });
    // }
  },
};
</script>
