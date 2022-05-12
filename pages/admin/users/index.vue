<template lang="pug">
  section.section
    div.container
      div.pb-2
        button.button.is-light.is-small(@click="$router.go(-1)") назад
      div.flex.is-space-between
        h1.title.size-5 Пользователи
        NuxtLink(to="/admin/users/add" class="button" v-if="currentUser.manager") Добавить пользователя
      div.divider
      div.row
        div.col-10
          table.table.is-fullwidth
            thead
              tr
                th Имя пользователя
                th Электронная почта
                th Админ
                th Менеджер
                th(colspan="3") Действия
            tbody
              tr(v-for="user in users" :key="user.id")
                td {{user.name}}
                td {{user.email}}
                td {{ user.admin ? 'да' : 'нет' }}
                td {{ user.manager ? 'да' : 'нет' }}
                td
                  NuxtLink(:to="`/admin/users/${user.id}`") Просмотреть
                td
                  NuxtLink(:to="`/admin/users/${user.id}/edit`"  v-if="currentUser.manager") Редактировать
                td
                  NuxtLink(:to="`/admin/users/${user.id}/delete`"  v-if="currentUser.manager") Удалить
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
  computed: {
    users: {
      get: function() {
        return this.$store.getters['users/users'];
      },
      set: function(newValue) {
        this.$store.dispatch('users/updateUsers', newValue);
      }
    },
    ...mapState('auth', ['currentUser']),
  },
}
</script>