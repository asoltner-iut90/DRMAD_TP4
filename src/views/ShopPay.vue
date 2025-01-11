<template>
  <div class="shop-pay">
      <h1>Paiement</h1>
      <input v-model="currentOrderId" required />
      <button @click="payOrder">Payer</button>
      <p v-if="error">{{error}}</p>
  </div>
</template>

<script>

import ShopService from "@/services/shop.service";
import {mapState} from "vuex";
import router from "@/router";

export default {
  computed: {
    ...mapState('shop', ['shopUser']),
  },
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
      let data = {orderId: this.currentOrderId, userId: this.shopUser._id};
      let result = await ShopService.payOrder(data);
      if(result.error){
        this.error = result.data;
        return;
      }
      this.error = '';
      await router.push("/shop/orders");
    }
  },
  mounted() {
    this.currentOrderId = this.$route.params.orderId;
  }
}

</script>