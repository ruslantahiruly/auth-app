<template lang="pug">
  section.section
    div.container
      button(@click="$router.go(-1)") Назад
      h1.title Вы действительно хотите удалить пользователя?
      button(@click="removeUser" class="button is-danger mr-2" v-if="currentUser.id != user.id") Удалить
      button(@click="$router.go(-1)" class="button is-light") Отмена
</template>

<script>
import { mapState } from 'vuex';

export default {
  middleware: ['auth', 'admin', 'manager'],
  async fetch() {
    if (this.$store.getters['users/users'].length === 0) {
      await this.$store.dispatch('users/fetchUsers');
    }
  },
  computed: {
    users: {
      get: function() {
        return this.$store.getters['users/users'];
      },
    },
    user() {
      return this.users.find(item => item.id == this.$route.params.id);
    },
    ...mapState('auth', ['currentUser']),
  },
  methods: {
    removeUser() {
      try {
        // Запрос на API
        // await this.$axios.$delete('/users', this.user);

        this.$store.dispatch('users/deleteUser', this.user);
        this.$router.push('/admin/users');
      } catch (err) {
        this.error = err.response.data.message;
      }
    },
  }
}
</script>