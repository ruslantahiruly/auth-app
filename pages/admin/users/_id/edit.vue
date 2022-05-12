<template lang="pug">
  div.container
    section.section
      button(@click="$router.go(-1)") Назад
      h1.title.size-5 Редактировать пользователя
      div.divider
      div.row
        div.col-4
          div(class="error mb-2" v-if="error") {{ error }}
          form.form(@submit.prevent="editUser")
            div.mb-2
              .form-group(:class="{ 'form-group--error': $v.editInfo.name.$error }")
                input.input.form__input(placeholder="Имя пользователя" type="text" name="name" v-model.trim="$v.editInfo.name.$model")
              template(v-if="$v.editInfo.name.$dirty")
                .text-danger.size-10.pt-1(v-if="!$v.editInfo.name.required") Введите имя
                .text-danger.size-10.pt-1(v-if="!$v.editInfo.name.minLength")
                  | Минимальное количество символов {{$v.editInfo.password.$params.minLength.min}}
            div.mb-2
              .form-group(:class="{ 'form-group--error': $v.editInfo.email.$error }")
                input.input.form__input(placeholder="Email" type="text" name="email" v-model.trim="$v.editInfo.email.$model")
              template(v-if="$v.editInfo.email.$dirty")
                .text-danger.size-10.pt-1(v-if="!$v.editInfo.email.required") Введите email
                .text-danger.size-10.pt-1(v-if="!$v.editInfo.email.email") Укажите корректный email
            div.mb-2
              .form-group(:class="{ 'form-group--error': $v.editInfo.password.$error }")
                input.input(placeholder="Пароль" type="password" name="password" v-model.trim="$v.editInfo.password.$model")
              template(v-if="$v.editInfo.password.$dirty")
                .text-danger.size-10.pt-1(v-if="!$v.editInfo.password.required") Введите пароль
                .text-danger.size-10.pt-1(v-if="!$v.editInfo.password.minLength")
                  | Пароль должен состоять минимум из {{$v.editInfo.password.$params.minLength.min}} символов
            div.flex
              button.fg-1.mr-2.button(type="submit") Редактировать
              button.fg-1.button.is-light(@click="$router.go(-1)") Отмена
</template>

<script>
import { required, email, minLength, between } from 'vuelidate/lib/validators';

export default {
  middleware: ['auth', 'admin', 'manager'],
  data() {
    return {
      editInfo: {
        name: '',
        email: '',
        password: '',
      },
      error: null,    
    };
  },
  validations: {
    editInfo: {
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
  async fetch() {
    if (this.$store.getters['users/users'].length === 0) {
      await this.$store.dispatch('users/fetchUsers');
    }
  },
  created() {
    this.editInfo.name = this.user.name;
    this.editInfo.email = this.user.email;
    this.editInfo.password = this.user.password;
  },
  computed: {
    users: {
      get: function() {
        return this.$store.getters['users/users'];
      },
    },
    user() {
      return this.users.find(item => item.id == this.$route.params.id);
    }
  },
  methods: {
    async editUser() {
      this.$v.editInfo.$touch();
      if (this.$v.editInfo.$error) return;

      try {
        const editedUser = {
          id: this.user.id,
          name: this.editInfo.name,
          password: this.editInfo.password,
          email: this.editInfo.email
        }

        // Запрос на API
        // await this.$axios.$put('/users', this.editedUser);

        this.$store.dispatch('users/editUser', editedUser);
        this.$router.push('/admin/users');
      } catch (err) {
        this.error = err.response.data.message;
      }


    }
  }
}
</script>