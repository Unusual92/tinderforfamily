<template>
  <div id="app" class="min-h-screen bg-gray-100">
    <nav class="bg-blue-500 text-white p-4 shadow-md">
      <div class="container mx-auto flex justify-between items-center">
        <div class="text-2xl font-bold">Family Fun</div>
        <div class="space-x-4">
          <router-link v-if="!isAuthenticated" to="/login" class="hover:underline transition duration-300">Войти</router-link>
          <router-link v-if="!isAuthenticated" to="/register" class="hover:underline transition duration-300">Регистрация</router-link>
          <router-link v-if="isAuthenticated" to="/family" class="hover:underline transition duration-300">Семья</router-link>
          <router-link v-if="isAuthenticated" to="/events" class="hover:underline transition duration-300">События</router-link>
          <router-link v-if="isAuthenticated" to="/create-event" class="hover:underline transition duration-300">Создать Ивент</router-link>
          <button v-if="isAuthenticated" @click="logout" class="hover:underline transition duration-300">Выйти</button>
        </div>
      </div>
    </nav>
    <router-view class="p-8" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapGetters(['isAuthenticated'])
  },
  methods: {
    ...mapActions(['logout']),
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/login');
    }
  }
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
  background-color: #f8f9fa;
  margin: 0;
  padding: 0;
}

nav {
  background-color: #007bff;
  padding: 10px;
  text-align: center;
}

nav a {
  color: white;
  text-decoration: none;
}

nav a:hover {
  text-decoration: underline;
}
</style>
