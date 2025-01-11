<template>
  <div>
    <h1>Account</h1>
    <span>Account Number</span><br><input v-model="accountNumber"><br>
    <p v-if="accountNumberError == -1">Numéro de compte erroné</p>
    <button @click="getAccountAmount(accountNumber)" :disabled="!isValidFormat()">Login</button><br>
    <p v-if="accountNumberError==1">{{accountAmount}}</p><br>
    <button @click="getAccountTransactions(accountNumber)" :disabled="!isValidFormat()">Transactions</button>
    <ul v-if="accountNumberError==1">
      <li v-for="(transaction, index) in accountTransactions" :key="index"> {{transformation(transaction.date.$date)}} : {{transaction.amount}}</li>
    </ul>
    <button @click="reset">Reset</button>
  </div>
</template>

<script>

import {mapState, mapActions, mapMutations} from 'vuex'
export default {
  name: 'BankAccountView',
  data: () => ({
    accountNumber: '',
  }),
  computed: {
    ...mapState('bank', ['accountAmount', "accountTransactions", "accountNumberError"])
  },
  methods: {
    ...mapActions("bank",['getAccountAmount', "getAccountTransactions"]),
    ...mapMutations("bank",['updateAccountNumberError']),
    transformation(dateString){
      let date = new Date(dateString);
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let year = date.getFullYear();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      let formattedDate = `${month}/${day}/${year} at ${hours}:${minutes}:${seconds}`;
      return formattedDate
    },
    isValidFormat(){
      let regex = /^[a-zA-Z0-9]{22}-[0-9]{7}$/
      return regex.test(this.accountNumber);
    },
    reset(){
      this.updateAccountNumberError(0)
      this.accountNumber = ""
    }
  }
}


</script>
