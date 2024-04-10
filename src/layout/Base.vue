<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <!-- sidebar -->
      <div class="wrapper">
        <side-bar>
          <sidebar-link to="/recipes">
            <v-icon medium class="mr-2 v-white"> mdi-silverware </v-icon>
            <p>เมนูอาหาร</p>
          </sidebar-link>
          <sidebar-link to="/my-recipes">
            <v-icon medium class="mr-2 v-white"> mdi-chef-hat </v-icon>
            <p>เมนูอาหารของฉัน</p>
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
import Vue from "vue";
import sideBar from "../components/SidebarPlugin/SideBar.vue";

import { mdiSilverware } from '@mdi/js';
Vue.component("mdiSilverware", mdiSilverware);
import { mdiChefHat } from '@mdi/js';
Vue.component("mdiChefHat", mdiChefHat);

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
