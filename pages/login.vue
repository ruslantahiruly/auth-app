<template lang="pug">
  section.section
    div.container
      div.row.is-centered
        div.col-3.box
          h2.title.size-6.text-centered Вход
          div(class="error mb-2" v-if="error") {{ error }}
          form(method="post" @submit.prevent="login")
            div.mb-2
              .form-group(:class="{ 'form-group--error': $v.loginInfo.email.$error }")
                input.input.form__input(placeholder="Email" type="text" name="email" v-model.trim="$v.loginInfo.email.$model")
              template(v-if="$v.loginInfo.email.$dirty")
                .text-danger.size-10.pt-1(v-if="!$v.loginInfo.email.required") Введите email
                .text-danger.size-10.pt-1(v-if="!$v.loginInfo.email.email") Укажите корректный email
            div.mb-2
              .form-group(:class="{ 'form-group--error': $v.loginInfo.password.$error }")
                input.input(placeholder="Пароль" type="password" name="password" v-model.trim="$v.loginInfo.password.$model")
              template(v-if="$v.loginInfo.password.$dirty")
                .text-danger.size-10.pt-1(v-if="!$v.loginInfo.password.required") Введите пароль
            button.button.is-fullwidth(type="submit") Войти
            div.text-centered.mt-2.mb-2.size-9
              span Ещё нет аккаунта? 
              NuxtLink(to="/register") Зарегистрируйтесь
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators';

export default {
  middleware: ['guest'],
  data() {
    return {
      loginInfo: {
        email: '',
        password: '',
      },
      error: null,
    }
  },
  validations: {
    loginInfo: {
      email: {
        required,
        email
      },
      password: {
        required,
      },
    }
  },
  methods: {
    async login() {
      this.$v.loginInfo.$touch();
      if (this.$v.loginInfo.$error) return;

      try {
        const response = await this.$axios.$post('/sessions/login', this.loginInfo);

        await this.$store.dispatch('auth/setToken', response.token);
        await this.$store.dispatch('auth/fetchUser');

        this.$router.push('/');
      } catch (err) {
        this.error = err.response.data.message;
      }
    }
  }
}
</script>
