<template>
  <div id="app" class="min-h-screen bg-gray-100">
    <nav class="bg-blue-500 text-white p-4 shadow-md">
      <div class="container mx-auto flex justify-between items-center">
        <div class="text-2xl font-bold">Family Fun</div>
        <div class="space-x-4">
          <router-link to="/family" class="hover:underline transition duration-300">Семья</router-link>
          <router-link to="/events" class="hover:underline transition duration-300">События</router-link>
          <router-link to="/create-event" class="hover:underline transition duration-300">Создать Ивент</router-link>
          <router-link to="/create-family" class="hover:underline transition duration-300">Создать Семью</router-link>
        </div>
      </div>
    </nav>
    <router-view class="p-8" />
  </div>
</template>

<script>
export default {
  name: 'App'
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
