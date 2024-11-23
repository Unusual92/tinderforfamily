<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 class="text-2xl font-bold mb-6 text-center">Добавить члена семьи</h2>
        <form @submit.prevent="addMember" class="space-y-4">
          <div>
            <label class="block text-gray-700">Имя</label>
            <input v-model="name" type="text" placeholder="Имя" required class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" />
          </div>
          <div>
            <label class="block text-gray-700">Возраст</label>
            <input v-model="age" type="number" placeholder="Возраст" required class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" />
          </div>
          <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">Добавить</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import Swal from 'sweetalert2';
  
  export default {
    data() {
      return {
        name: '',
        age: ''
      };
    },
    methods: {
      async addMember() {
        try {
          const response = await axios.post('/api/family', {
            name: this.name,
            age: this.age
          });
          // Handle successful addition
          console.log(response.data);
          this.$router.push('/family');
        } catch (error) {
          console.error(error);
          this.showErrorAlert();
        }
      },
      showErrorAlert() {
        Swal.fire({
          icon: 'error',
          title: 'Ошибка',
          text: 'Проверьте подключение к интернету',
        });
      }
    }
  };
  </script>
  