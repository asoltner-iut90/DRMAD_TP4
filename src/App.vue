<template>
  <div id="app">
    <NavBar :titles="[ {text: 'Viruses', color: 'red'} , {text: 'Compte bancaire', color: 'white'}, {text:'Login', color:'blue'}, {text:'pay', color: 'green'}]"/>
    <img alt="Vue logo" src="./assets/logo.png">
    <h1>Welcome to DrMad app</h1>

    <CheckedList :data='[{nom:"dupond", prenom:"jean",age:31}, {nom:"durand", prenom:"pierre",age:35} ]' :fields="[ 'prenom', 'nom' ] " :checked="[true, false]" :itemCheck="true" :itemButton="{'show':true, 'text':'du text'}" :listButton="{'show':true, 'text':'du text2'}"></CheckedList>

    <router-view></router-view>
  </div>

</template>

<script>

import {mapActions} from 'vuex'
import NavBar from "@/components/navbar.vue";
import CheckedList from "@/components/checkedList.vue";

export default {
  name: 'App',
  components: {CheckedList, NavBar},

  data: () => ({
    //
  }),
  methods: {
    ...mapActions(['getAllViruses'])
  },
  mounted() {
    this.getAllViruses();

  }
};
</script>
