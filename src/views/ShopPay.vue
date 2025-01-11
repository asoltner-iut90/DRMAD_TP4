<template>
  <div class="shop-pay">
      <h1>Paiement</h1>
      <form>
        <input v-model="currentOrderId" required />
        <button @click="payOrder">Payer</button>
      </form>
      <p v-if="error">{{error}}</p>
  </div>
</template>

<script>

import ShopService from "@/services/shop.service";
import {mapState} from "vuex";

export default {
  ...mapState('bank', ['shopUser']),
  name: 'ShopPay',
  props: {
    orderId: String,
  },
  data(){
    return {
      currentOrderId: this.orderId || '',
      error: '',
    }
  },
  methods:{
    async payOrder(){
      let data = {orderId: this.orderId, userId: this.shopUser.id};
      let result = ShopService.payOrder(data);
      if(!result.success){
        this.error = result.message;
        return;
      }
      this.router.push({ path: "/shop/orders" });
    }
  },
  mounted() {
    ShopService.payOrder({userId: '66d58122c08b4d64db14cd04', orderId:'66d58122c08b4d64db14cd05'})
  }
}

</script>