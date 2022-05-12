<template lang="pug">
  section.section
    div.container
      div.pb-2
        button.button.is-light.is-small(@click="$router.go(-1)") назад
      h1.title.size-5 Создать пользователя
      div.divider
      div.row
        div.col-4
          div(class="error mb-2" v-if="error") {{ error }}
          form.form(@submit.prevent="register")
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
            div.flex
              button.fg-1.mr-2.button(type="submit") Создать
              button.fg-1.button.is-light(@click="$router.go(-1)") Отмена
</template>

<script>
import { required, email, minLength, between } from 'vuelidate/lib/validators';

export default {
  middleware: ['auth', 'admin', 'manager'],
  data() {
    return {
      registraionInfo: {
        name: '',
        email: '',
        password: '',
      },
      error: null,    
    };
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

        this.$router.push('/admin/users');
      } catch (err) {
        this.error = err.response.data.message;
      }


    }
  }
}
</script>