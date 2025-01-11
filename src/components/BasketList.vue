<template>
  <div class="basket-container">
    <h2>Panier</h2>
    <CheckedList
        :data="basket.map(b => ({
            display: `${b.item.name} - ${b.item.price}€ - Quantité: ${b.amount}`,
            _id: b.item._id,
            amount: b.amount
        }))"
        :fields="['display']"
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
import CheckedList from './checkedList.vue';
import ShopService from '../services/shop.service';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'BasketList',
  components: {
    CheckedList
  },
  computed: {
    ...mapState('shop', ['basket','shopUser', "loginError"]),
  },
  methods: {
    ...mapActions('shop', ['getBasket', 'removeItemFromBasket', 'clearBasket', 'incredecrementItemAmount']),

    async createOrder() {
      if (!this.shopUser || !this.basket.length) return;

      const orderData = { items: this.basket };


      const response = await ShopService.CreateOrder(this.shopUser._id, orderData);

      if (response.error === 0 && response.data && response.data.uuid) {
        await this.clearBasket();
        await this.$router.push(`/shop/pay/${response.data.uuid}`);
      } else {
        console.error('Erreur lors de la création de la commande:', response.message || response.data); // Log d'erreur plus détaillé
      }
    },

    async handleRemoveItem(index) {
      console.log('Suppression de l\'article avec ID:', this.basket[index].item._id);
      const itemId = this.basket[index].item._id; // Utilisation de b.item._id ici
      await this.removeItemFromBasket(itemId); // Suppression via mutation
    },

    async handleClearBasket() {
      await this.clearBasket();
    },

    // Ajout ou retrait d'une quantité
    async incredecrementItemAmount(itemId, nombre) {
      // Appelle l'action de mise à jour sans récursion infinie
      await this.incredecrementItemAmount({ itemId, nombre });
    }
  },
  created() {
    this.getBasket();
  }
}
</script>

<style scoped>
.basket-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}

.quantity-buttons {
  margin-top: 1rem;
}

.item-quantity {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.quantity-button, .remove-button {
  padding: 0.5rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 5px;
}

.remove-button {
  background-color: #f44336;
}

.remove-button:hover {
  background-color: #e53935;
}

.quantity-button:hover {
  background-color: #45a049;
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
