<template>
  <div>
    <h2>Orders</h2>
    <ul v-if="shopUser">
      <li v-for="(order, order_id) in shopUser.orders" :key="order_id">
          OrderId: {{order._id}}, Total:{{order.total}}, Etat:{{order.status}}
        <div v-if="order.status === 'waiting_payment'">
          <button @click="$router.push('/shop/pay/'.concat(order._id))">Payer</button>
          <button @click="cancel(order._id)" >Annuler</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";


  export default {
    name: "ShopOrders",
    components: {},
    computed: {
      ...mapState('shop', ['shopUser']),
    },
    methods: {
      ...mapActions('shop', ["updateOrders","cancelOrder"]),
      cancel(id){
        this.cancelOrder(id)
      }
    },

    mounted() {
      if (this.shopUser) {
        this.updateOrders()
      }
    }
  }
</script>

<style scoped>

</style>