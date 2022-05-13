<template lang="pug">
  section.section
    div.container
      button(@click="$router.go(-1)") Назад
      h1.title Пользователь
      div.pb-2
        <span class="fw-6">Имя пользователя:</span> {{ user.name }}
      div.pb-2
        <span class="fw-6">Email:</span>  {{ user.email }}
      div.pb-2
        <span class="fw-6">Админ:</span>  {{ user.admin ? 'да' : 'нет' }}
      div.pb-2
        <span class="fw-6">Менеджер:</span>  {{ user.manager ? 'да' : 'нет' }}
      div.mt-2
        NuxtLink(:to="`/admin/users/${user.id}/delete`" class="button is-danger mr-2"  v-if="currentUser.manager") Удалить
        NuxtLink(:to="`/admin/users/${user.id}/edit`" class="button"  v-if="currentUser.manager") Редактировать
</template>

<script>
import { mapState } from 'vuex';

export default {
  middleware: ['auth', 'admin'],
  async fetch() {
    if (this.$store.getters['users/users'].length === 0) {
      await this.$store.dispatch('users/fetchUsers');
    }
  },
  async asyncData({ $axios, params }) {
    try {
      let response = await $axios.$get(`/users/${params.id}`);
      let user = response.user

      return { user };
    } catch(e) {
      return { user: [] };
    }
  },
  computed: {
    users: {
      get: function() {
        return this.$store.getters['users/users'];
      },
    },
    ...mapState('auth', ['currentUser']),
  },
}
</script>