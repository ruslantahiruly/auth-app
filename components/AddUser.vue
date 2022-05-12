<template lang="pug">
  form.form(@submit.prevent="addUser")
    select.select.mb-2(required)
      option(disabled value="") Роль
      option(
        v-for="role in roles"
        :value="role"
      ) {{role}}
    input.input.mb-2(required placeholder="Имя пользователя" type="text" name="username" v-model="email")
    input.input.mb-2(required placeholder="Email" type="text" name="email" v-model="email")
    input.input.mb-2(required placeholder="Пароль" type="password" name="password" v-model="password")
    button.button.is-fullwidth(type="submit") Добавить
</template>

<script>
export default {
  data() {
    return {
      roles: ['admin', 'manager', 'user'],
      selectedRole: '',
      username: '',
      email: '',
      password: '',
    };
  },
}
</script>