<template lang="pug">
    v-container(
        fluid
        fill-height
    )
        v-layout(
            align-center
            justify-center
        )
            v-flex(
                xs12
                sm8
                md6
            )
                v-card.elevation-12
                    v-toolbar(
                        dark
                        color='primary'
                    )
                        v-toolbar-title Login form
                    v-card-text
                        v-form(
                            v-model='valid'
                            ref='form'
                            validation
                        )
                            v-text-field(
                                prepend-icon='person'
                                name='email'
                                label='Email'
                                type='email'
                                v-model='email'
                                autocomplete="username"
                                :rules='emailRules'
                            )
                            v-text-field(
                                prepend-icon='lock'
                                name='password'
                                label='Password'
                                type='password'
                                v-model='password'
                                autocomplete="current-password"
                                :rules='passwordRules'
                            )
                    v-card-actions
                        v-spacer
                        v-btn(
                            color='primary'
                            @click='onSubmit'
                            :loading='loading'
                            :disabled='!valid || loading'
                        ) Login

</template>

<script>
const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

export default {
  data() {
    return {
      email: '',
      password: '',
      valid: false,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => emailRegex.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= this.passwordLengthRule) || `Password must be equal or more than ${this.passwordLengthRule} characters`,
      ],
    };
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    passwordLengthRule() {
      return this.$store.getters.passwordLengthRule;
    },
  },
  methods: {
    onSubmit() {
      if (this.$refs.form.validate()) {
        const user = {
          email: this.email,
          password: this.password,
        };

        this.$store.dispatch('loginUser', user)
          .then(() => {
            this.$router.push('/');
          })
          .catch((error) => {
            this.$store.dispatch('setError', error);
          });
      }
    },
  },
};
</script>
