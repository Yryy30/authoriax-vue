<script setup lang="ts">
import { ref } from 'vue';
import Toast from 'primevue/toast';
import ConfirmDialog from 'primevue/confirmdialog';
import Button from 'primevue/button';

const isDark = ref(false);

const toggleDarkMode = () => {
    isDark.value = !isDark.value;
    document.documentElement.classList.toggle('dark-mode', isDark.value);
};
</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
    <!-- Navbar -->
    <nav class="border-b-2 border-primary bg-white dark:bg-gray-800 px-4 py-2">
      <div class="relative flex items-center justify-center h-12">
        <!-- Logo -->
        <router-link to="/" class="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <img src="/src/assets/vue.svg" alt="Vue Logo" class="h-8 w-8" />
          <span class="text-2xl font-bold text-primary">AUTHORIAX</span>
        </router-link>

        <!-- Dark/Light Mode Toggle -->
        <div class="absolute right-0">
          <Button
            :icon="isDark ? 'pi pi-sun' : 'pi pi-moon'"
            rounded
            text
            severity="secondary"
            :aria-label="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
            @click="toggleDarkMode"
            v-tooltip.left="isDark ? 'Light Mode' : 'Dark Mode'"
          />
        </div>
      </div>
    </nav>

    <Toast />
    <ConfirmDialog />

    <!-- Render router view -->
    <div class="container mx-auto px-4 py-8 max-w-7xl">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1400px;
}
</style>