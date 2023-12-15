<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import TheNavigation from './components/TheNavigation.vue';
import TheNavigationDrawer from './components/TheNavigationDrawer.vue';
import { useAuth0 } from '@auth0/auth0-vue';

const { isLoading } = useAuth0();

const toggleDrawer = ref<boolean>(false)
</script>

<template>
    <div v-if="isLoading">
      <p>Loading...</p>
    </div>

    <div v-else>
      <TheNavigation @toggleDrawer="toggleDrawer = !toggleDrawer" />

      <TheNavigationDrawer v-if="toggleDrawer" />

      <div class="app">
        <RouterView />
      </div>
    </div>
</template>

<style lang="scss" scoped>
.app {
  height: calc(100vh - 66px);
  overflow: hidden;
}
</style>
