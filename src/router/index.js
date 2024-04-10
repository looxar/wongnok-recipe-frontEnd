import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Recipes from '../views/recipes/Recipes.vue'
import myRecipes from '../views/myRecipes/myRecipes.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/recipes',
    name: 'Recipes',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Recipes
  },
  {
    path: '/my-recipes',
    name: 'myRecipes',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: myRecipes
  },
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
