<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-96">
      <h2 class="text-2xl font-bold mb-6 text-center">Создание семейного мероприятия</h2>
      <form @submit.prevent="createEvent" class="space-y-4">
        <div>
          <label class="block text-gray-700">Название</label>
          <input v-model="name" type="text" placeholder="Название" required class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" />
        </div>
        <div>
          <label class="block text-gray-700">Описание</label>
          <input v-model="description" type="text" placeholder="Описание" required class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" />
        </div>
        <div>
          <label class="block text-gray-700">Дата</label>
          <input v-model="date" type="date" required class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" />
        </div>
        <div>
          <label class="block text-gray-700">Время</label>
          <input v-model="time" type="time" required class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" />
        </div>
        <div>
          <label class="block text-gray-700">Локация</label>
          <input v-model="location" type="text" placeholder="Локация" required class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" />
        </div>
        <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">Добавить</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      name: '',
      description: '',
      date: '',
      time: '',
      location: ''
    };
  },
  computed: {
    ...mapGetters(['apiUrl'])
  },
  methods: {
    async createEvent() {
      try {
        const response = await axios.post(`${this.apiUrl}/events`, {
          name: this.name,
          description: this.description,
          date: this.date,
          time: this.time,
          location: this.location
        });
        // Handle successful addition
        console.log(response.data);
        this.$router.push('/events');
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
