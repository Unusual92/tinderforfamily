<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 class="text-2xl font-bold mb-6 text-center">Регистрация</h2>
        <form @submit.prevent="register" class="space-y-4">
          <div>
            <label class="block text-gray-700">Username</label>
            <input v-model="username" type="text" placeholder="Username" required class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" />
          </div>
          <div>
            <label class="block text-gray-700">First Name</label>
            <input v-model="first_name" type="text" placeholder="First Name" required class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" />
          </div>
          <div>
            <label class="block text-gray-700">Last Name</label>
            <input v-model="last_name" type="text" placeholder="Last Name" required class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" />
          </div>
          <div>
            <label class="block text-gray-700">Email</label>
            <input v-model="email" type="email" placeholder="Email" required class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" />
          </div>
          <div>
            <label class="block text-gray-700">Age</label>
            <input v-model="age" type="number" placeholder="Age" required class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" />
          </div>
          <div>
            <label class="block text-gray-700">Gender</label>
            <select v-model="gender" required class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300">
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label class="block text-gray-700">Password</label>
            <input v-model="password" type="password" placeholder="Password" required class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" />
          </div>
          <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">Зарегистрироваться</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axiosInstance from '../plugins/axios';
  import { mapGetters, mapActions } from 'vuex';
  import Swal from 'sweetalert2';
  
  export default {
    data() {
      return {
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        age: '',
        gender: '',
        password: ''
      };
    },
    computed: {
      ...mapGetters(['apiUrl'])
    },
    methods: {
      ...mapActions(['login', 'setToken']),
      async register() {
        try {
          const response = await axiosInstance.post('/auth/register', {
            username: this.username,
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
            age: this.age,
            gender: this.gender,
            password: this.password
          });
          const token = response.data.Access_token;
          this.$store.dispatch('setToken', token);
          this.$store.dispatch('login', response.data.user);
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
  