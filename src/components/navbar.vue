<template>
  <div>
    <p>Navbar</p>
    <button v-for="(e, index) in titles" :key=index :color="e.color" @click="handleMenuClicked(index)" name="btn-menu">{{e.text}} </button>

  </div>
</template>

<script>
import router from "@/router";

export default {
  name: 'NavBar',
  props: { titles: Array },

  methods: {
    handleMenuClicked(index){
      if(index==0){
        router.push("/shop/items").catch(()=>{})
      }else if(index == 1){
        router.push("/bank/account").catch(()=>{})
      }else if(index == 2){
        router.push("/shop/login").catch(()=>{})
      }
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>