<template>
    <div class="min-h-screen bg-gray-100 p-8">
      <div class="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
        <div class="flex items-center mb-6">
          <img src="../assets/family-icon.png" alt="Family Icon" class="w-12 h-12 mr-4" />
          <div>
            <h2 class="text-2xl font-bold">{{ familyName }}</h2>
            <p v-if="!isEditing" class="text-gray-700">{{ familyDescription }}</p>
            <textarea v-if="isEditing" v-model="familyDescription" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"></textarea>
          </div>
        </div>
        <div v-if="!isEditing" class="flex justify-center mb-6">
          <button @click="isEditing = true" class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">Редактировать</button>
        </div>
        <div v-if="isEditing" class="flex justify-center mb-6 space-x-4">
          <button @click="saveDescription" class="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300">Сохранить</button>
          <button @click="isEditing = false" class="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300">Отмена</button>
        </div>
        <div>
          <h3 class="text-xl font-bold mb-4">Моя семья</h3>
          <ul>
            <li v-for="member in familyMembers" :key="member.name" class="flex items-center mb-4">
              <img :src="member.avatar" alt="Member Avatar" class="w-10 h-10 mr-4 rounded-full" />
              <div>
                <p class="text-gray-900">{{ member.name }}, {{ member.relation }}, {{ member.age }}</p>
              </div>
            </li>
          </ul>
          <button @click="addFamilyMember" class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">Добавить</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import Swal from 'sweetalert2';
  
  export default {
    data() {
      return {
        familyName: 'Семья Даун',
        familyDescription: 'Любим спорт, гольф, бадминтон и спать всей семьей.',
        familyMembers: [
          { name: 'Megan Smith', relation: 'Mom', age: 40, avatar: 'path_to_megan_avatar.jpg' },
          { name: 'Jacob Smith', relation: 'Dad', age: 42, avatar: 'path_to_jacob_avatar.jpg' },
          { name: 'Sophia Smith', relation: 'Daughter', age: 6, avatar: 'path_to_sophia_avatar.jpg' },
          { name: 'Liam Smith', relation: 'Son', age: 8, avatar: 'path_to_liam_avatar.jpg' }
        ],
        isEditing: false
      };
    },
    methods: {
      addFamilyMember() {
        this.$router.push('/add-family-member');
      },
      async saveDescription() {
        try {
          const response = await axios.post('/api/family/description', {
            description: this.familyDescription
          });
          // Handle successful save
          console.log(response.data);
          this.isEditing = false;
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
  