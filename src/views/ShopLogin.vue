<template>
  <div>
    <h1>Login</h1>
    <span>login</span><input v-model="login">
    <span>password</span><input v-model="password">
    <button @click="logIn({login, password})">Login</button>
    <p v-if="shopUser">{{shopUser}}</p>
    <p v-if="loginError">{{loginError}}</p>

  </div>

</template>

<script>

import {mapState, mapActions} from 'vuex'
export default {
  name: 'ShopLoginView',
  data: () => ({
    login: '',
    password:'',
    error: ''
  }),
  computed: {
    ...mapState("shop",['shopUser', "loginError"])
  },
  methods: {
    ...mapActions("shop",['shopLogin']),
    logIn(params){
      this.shopLogin(params)
    }
  }
}
</script>
