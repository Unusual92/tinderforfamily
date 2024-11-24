<template>
    <div class="min-h-screen bg-gray-100 p-8">
      <div class="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
        <h2 class="text-2xl font-bold mb-6 text-center">Список событий</h2>
        <div class="flex justify-center mb-6 space-x-4">
          <button @click="filterEvents('today')" class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">Сегодня</button>
          <button @click="filterEvents('tomorrow')" class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">Завтра</button>
          <button @click="filterEvents('next_week')" class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">На следующей неделе</button>
        </div>
        <div v-for="event in filteredEvents" :key="event.id" class="bg-white p-4 rounded-lg shadow-md mb-4 transition duration-300 hover:shadow-lg">
          <h3 class="text-xl font-bold">{{ event.name }}</h3>
          <p class="text-gray-700">{{ event.description }}</p>
          <p class="text-gray-500">{{ event.date }}, {{ event.time }}</p>
          <p class="text-gray-500">{{ event.location }}</p>
          <button @click="registerForEvent(event.id)" class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">Register now</button>
        </div>
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
        events: [],
        filteredEvents: []
      };
    },
    computed: {
      ...mapGetters(['apiUrl'])
    },
    async created() {
      try {
        const response = await axios.get(`${this.apiUrl}/events`);
        this.events = response.data;
        this.filteredEvents = response.data;
      } catch (error) {
        console.error(error);
        this.showErrorAlert();
      }
    },
    methods: {
      filterEvents(filter) {
        if (filter === 'today') {
          this.filteredEvents = this.events.filter(event => new Date(event.date).toDateString() === new Date().toDateString());
        } else if (filter === 'tomorrow') {
          const tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          this.filteredEvents = this.events.filter(event => new Date(event.date).toDateString() === tomorrow.toDateString());
        } else if (filter === 'next_week') {
          const nextWeek = new Date();
          nextWeek.setDate(nextWeek.getDate() + 7);
          this.filteredEvents = this.events.filter(event => new Date(event.date) >= new Date() && new Date(event.date) <= nextWeek);
        } else {
          this.filteredEvents = this.events;
        }
      },
      async registerForEvent(eventId) {
        try {
          const response = await axios.post(`${this.apiUrl}/events/${eventId}/register`);
          // Handle successful registration
          console.log(response.data);
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
  