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
      }else if(index == 3){
        router.push("/shop/pay").catch(()=>{})
      }else if(index == 4){
        router.push("/shop/orders").catch(()=>{})
      }
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>