<template>
  <div>
    <h2>Votre Panier</h2>
    <CheckedList
        v-if="basket.items.length > 0"
        :data="basket.items"
        :fields="['item.name', 'item.price', 'amount']"
        :itemButton="{ show: true, text: 'Supprimer' }"
        :listButton="{ show: true, text: 'Vider le panier' }"
        @item-button-clicked="removeItem"
        @list-button-clicked="clearBasket"
    />
    <p v-else>Votre panier est vide.</p>

    <button v-if="basket.items.length > 0" @click="validateOrder">Acheter</button>
  </div>
</template>

<script>
import CheckedList from './checkedList.vue';
import ShopService from '../services/shop.service';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'BasketList',
  components: { CheckedList },
  computed: {
    ...mapState('shop', ['basket','shopUser', "loginError"]),
  },
  methods: {
    ...mapActions('shop', ['getBasket', 'removeItemFromBasket', 'clearBasket']),

    async removeItem(index) {
      let itemId = this.basket.items[index].item._id;
      await this.removeItemFromBasket(itemId);
    },

    async clearBasket() {
      await this.clearBasket();
    },

    async validateOrder() {
      let order = {
        items: this.basket.items.map(item => ({
          item: {
            name: item.item.name,
            description: item.item.description,
            price: item.item.price,
            promotion: item.item.promotion,
            object: item.item.object
          },
          amount: item.amount
        }))
      };

      let response = await ShopService.createOrder(order);
      if (response.error === 0) {
        let uuid = response.data.uuid;
        await this.clearBasket();
        this.$router.push(`/shop/pay/${uuid}`);
      } else {
        console.error('Erreur lors de la validation de la commande');
      }
    }
  },
  mounted() {
    this.getBasket();
  }
};
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}
button {
  margin-top: 10px;
}
</style>
