<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <!-- sidebar -->
      <div class="wrapper">
        <side-bar>
          <sidebar-link to="/recipes">
            <i class="nc-icon nc-zoom-split"></i>
            <p>เมนูอาหาร</p>
          </sidebar-link>
        </side-bar>
      </div>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <!-- hideSidebar icon-->

      <v-toolbar-title>Wongnok Recipes</v-toolbar-title>
      <!-- title -->
    </v-app-bar>

    <v-main>
      <router-view @click="toggleSidebar" />
    </v-main>
  </v-app>
</template>

<script>
import sideBar from "../components/SidebarPlugin/SideBar.vue";

export default {
  data: () => ({ drawer: null }),

  contents: {
    sideBar,
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
  },
};
</script>
