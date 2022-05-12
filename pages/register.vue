<template lang="pug">
  section.section
    div.container
      div.row.is-centered
        div.col-3.box
          h2.title.size-6.text-centered Регистрация
          div(class="error mb-2" v-if="error") {{ error }}
          form(method="post" @submit.prevent="register")
            div.mb-2
              .form-group(:class="{ 'form-group--error': $v.registraionInfo.name.$error }")
                input.input.form__input(placeholder="Имя пользователя" type="text" name="name" v-model.trim="$v.registraionInfo.name.$model")
              template(v-if="$v.registraionInfo.name.$dirty")
                .text-danger.size-10.pt-1(v-if="!$v.registraionInfo.name.required") Введите имя
                .text-danger.size-10.pt-1(v-if="!$v.registraionInfo.name.minLength")
                  | Минимальное количество символов {{$v.registraionInfo.password.$params.minLength.min}}
            div.mb-2
              .form-group(:class="{ 'form-group--error': $v.registraionInfo.email.$error }")
                input.input.form__input(placeholder="Email" type="text" name="email" v-model.trim="$v.registraionInfo.email.$model")
              template(v-if="$v.registraionInfo.email.$dirty")
                .text-danger.size-10.pt-1(v-if="!$v.registraionInfo.email.required") Введите email
                .text-danger.size-10.pt-1(v-if="!$v.registraionInfo.email.email") Укажите корректный email
            div.mb-2
              .form-group(:class="{ 'form-group--error': $v.registraionInfo.password.$error }")
                input.input(placeholder="Пароль" type="password" name="password" v-model.trim="$v.registraionInfo.password.$model")
              template(v-if="$v.registraionInfo.password.$dirty")
                .text-danger.size-10.pt-1(v-if="!$v.registraionInfo.password.required") Введите пароль
                .text-danger.size-10.pt-1(v-if="!$v.registraionInfo.password.minLength")
                  | Пароль должен состоять минимум из {{$v.registraionInfo.password.$params.minLength.min}} символов
            button.button.is-fullwidth(type="submit") Зарегистрироваться
            div.text-centered.mt-2.mb-2.size-9
              span Уже зарегистрированы? 
              NuxtLink(to="/login") Войдите
</template>

<script>
import { required, email, minLength, between } from 'vuelidate/lib/validators';

export default {
  middleware: ['guest'],
  data() {
    return {
      registraionInfo: {
        name: '',
        email: '',
        password: '',
      },
      error: null,
    }
  },
  validations: {
    registraionInfo: {
      name: {
        required,
        minLength: minLength(2),
      },
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(4),
      },
    }
  },
  methods: {
    async register() {
      this.$v.registraionInfo.$touch();
      if (this.$v.registraionInfo.$error) return;

      try {
        await this.$axios.$post('/register', this.registraionInfo);
        await this.$store.dispatch('users/addUser', this.registraionInfo);

        // Login пользователя

        // const response = await this.$axios.$post('/sessions/login', ({ email: this.registraionInfo.email, password: this.registraionInfo.password }));
        // await this.$store.dispatch('auth/setToken', response.token);
        // await this.$store.dispatch('auth/fetchUser');

        this.$router.push('/');
      } catch (err) {
        this.error = err.response.data.message;
      }
    }
  }
}
</script>