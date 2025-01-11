<template>
  <div class="basket-container">
    <h2>Panier</h2>
    <CheckedList
        :data="basket"
        :fields="['name', 'price']"
        :itemCheck="false"
        :itemButton="{ show: true, text: 'Supprimer' }"
        :listButton="{ show: true, text: 'Vider le panier' }"
        @item-button-clicked="handleRemoveItem"
        @list-button-clicked="handleClearBasket"
    />
    <button
        class="buy-button"
        :disabled="!basket.length"
        @click="createOrder"
    >
      Acheter
    </button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import CheckedList from './checkedList.vue';
import ShopService from '@/services/shop.service';

export default {
  name: 'BasketList',
  components: {
    CheckedList
  },
  computed: {
    ...mapState('shop', ['basket', 'shopUser']),
  },
  methods: {
    ...mapActions('shop', ['loadBasket', 'removeItem', 'clearBasket']),

    async createOrder() {
      if (!this.shopUser || !this.basket.length) return;
      const orderData = { items: this.basket };
      const response = await ShopService.createOrder(this.shopUser._id, orderData);
      if (response.error === 0 && response.data.uuid) {
        await this.clearBasket();
        await this.$router.push(`/shop/pay/${response.data.uuid}`);
      }
    },

    async handleRemoveItem(index) {
      // Supprimer un item via son index dans le tableau
      const itemId = this.basket[index]._id;
      await this.removeItem(itemId);
    },

    async handleClearBasket() {
      // Vider le panier
      await this.clearBasket();
    },
  },
  created() {
    this.loadBasket();
  }
}
</script>

<style scoped>
.basket-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}

.buy-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.buy-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>
