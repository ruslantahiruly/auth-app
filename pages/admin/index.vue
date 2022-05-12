<template lang="pug">
  div
    section.section
      div.container
        div.row
          div.col-7
            h1.title.size-6 Администрирование сайта
            div.divider
            div.pt-3.flex.is-space-between
              NuxtLink(to="/admin/users") Пользователи
              NuxtLink(to="/admin/users/add" class="button" v-if="currentUser.manager") Добавить пользователя
</template>

<script>
import { mapState } from 'vuex';

export default {
  middleware: ['auth', 'admin'],
  computed: {
    ...mapState('auth', ['currentUser']),
  }
}
</script>