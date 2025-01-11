<template>
  <div>
    <h1>ItemList</h1>
    <checked-list
        :data="viruses"
        :fields="[ 'name', 'price', 'promotion' ]"
        :itemCheck="true"
        :itemButton="{ 'show': true, 'text': 'Ajouter au panier' }"
        :listButton="{ 'show': true, 'text': 'Ajouter sélection au panier' }"
        :checked="Array.from({ length: viruses.length }, () => true)"
        :itemAmount="true"
        @item-button-clicked="itemButtonClicked"
        @list-button-clicked="listButtonChecked"
        @checked-changed="checkedChanged"
    />

    <h2>Panier</h2>
    <ul>
      <li v-for="(basketItem, index) in basket" :key="index">
        {{ basketItem.item.name }} - {{ basketItem.amount }} pièces - {{ basketItem.item.price }}€
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import CheckedList from "@/components/checkedList.vue";

export default {
  components: { CheckedList },
  computed: {
    ...mapState("shop", ['viruses', 'basket']), // Ajout de 'basket' pour afficher le contenu du panier
  },
  methods: {
    ...mapActions("shop", ['addItemToBasket']),

    async itemButtonClicked(index, amount) {
      const selectedItem = this.viruses[index];
      if (amount > 0) {
        const newItem = {
          item: selectedItem,
          amount: parseInt(amount)
        };
        await this.addItemToBasket(newItem);
        console.log(`Ajout de l'article ${selectedItem.name} au panier, quantité : ${amount}`);
      } else {
        console.log("Quantité invalide pour l'ajout au panier.");
      }
    },

    async listButtonChecked(tab) {
      for (let i = 0; i < tab.length; i++) {
        if (tab[i].checked && tab[i].amount > 0) {
          const newItem = {
            item: this.viruses[i],
            amount: parseInt(tab[i].amount)
          };
          await this.addItemToBasket(newItem);
          console.log(`Ajout de l'article ${this.viruses[i].name} au panier, quantité : ${tab[i].amount}`);
        }
      }
    },

    checkedChanged(index) {
      console.log("Changement de l'état de sélection pour l'élément :", index);
    }
  }
};
</script>
