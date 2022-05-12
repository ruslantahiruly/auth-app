<template lang="pug">
  div
    section.section
      div.container
        h1.title Мой профиль
        div.pb-2
          <span class="fw-6">Имя пользователя:</span> пользователь
        div
          <span class="fw-6">Email:</span> example@mail.com
</template>

<script>
export default {
  middleware: 'auth',
}
</script>