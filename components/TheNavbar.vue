<template lang="pug">
  nav.navbar
    div.container
      div.flex.is-align-centered
        NuxtLink(
          class="logo"
          to="/"
        ) Alt.Point
        NuxtLink(
          v-if="currentUser && currentUser.admin"
          class="size-9 text-primary ml-3 fw-7 tt-u"
          to="/admin"
        ) Админ-панель
      div.navbar-menu
        div.navbar-item.is-hoverable(v-if="isAuthenticated")
          a.navbar-link <span class="navbar-icon mr-1">{{currentUserIcon}}</span> {{currentUser && currentUser.name}}
          div.dropdown.pt-1.pb-1
            NuxtLink(
              class="navbar-item text-secondary pb-1"
              to="/profile"
              @click.native="isUserOpened = false"
            ) Мой профиль
            div.divider
            a(
              class="navbar-item text-primary"
              @click="logout"
            ) Выйти
        NuxtLink(
          v-else
          to="/login"
          class="navbar-item text-secondary tt-u fw-7 size-9"
        ) Войти
</template>

<script>
import { mapState } from 'vuex';

export default {
  methods: {
    logout() {
      this.$store.dispatch('auth/logout');

      this.$router.push('/');
    },
  },
  computed: {
    ...mapState('auth', ['currentUser', 'isAuthenticated']),
    currentUserIcon() {
      if (this.currentUser) {
        return this.currentUser.name[0].toUpperCase();
      }
    }
  }
}
</script>