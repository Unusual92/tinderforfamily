<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 class="text-2xl font-bold mb-6 text-center">Создать профиль семьи</h2>
        <form @submit.prevent="createFamily" class="space-y-4">
          <div>
            <label class="block text-gray-700">Название семьи</label>
            <input v-model="familyName" type="text" placeholder="Название семьи" required class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" />
          </div>
          <div>
            <label class="block text-gray-700">Описание семьи</label>
            <textarea v-model="familyDescription" placeholder="Описание семьи" required class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"></textarea>
          </div>
          <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">Создать</button>
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
        familyName: '',
        familyDescription: ''
      };
    },
    methods: {
      async createFamily() {
        try {
          const response = await axios.post('/api/family', {
            name: this.familyName,
            description: this.familyDescription
          });
          // Handle successful creation
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
  