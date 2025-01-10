<template>
  <div>
    <ul>
      <li v-for="(row, rowIndex) in data" :key="rowIndex">
        <input v-if="itemCheck" type="checkbox" :checked="checked[rowIndex]" @change="checkedChanged(rowIndex)" :id="rowIndex+'_checkbox'" />
        <p v-for="(col, colIndex) in fields" :key="colIndex" class="inline-block" >
          {{row[col]}}
        </p>
        <input v-if="itemAmount" type="number" :id="rowIndex+'_amount'">
        <button v-if="itemButton.show" @click="itemButtonClicked(rowIndex)">{{itemButton.text}}</button>
      </li>
    </ul>
    <button v-if="listButton.show" @click="listButtonClicked"> {{listButton.text}}</button>
  </div>
</template>

<script>

export default {
  name: 'CheckedList',
  props: {
    data: Array, // les données sources
    fields: Array, // le tableau contenant le nom des champs
    itemCheck: Boolean, // s'il y a des case à cocher
    checked: Array, // le tableau des cases cochées
    itemButton: Object, // l'objet pour les boutons d'items
    listButton: Object, // l'objet pour le bouton de liste
    itemAmount: Boolean,
  },
  data : () => {
    return {
    }
  },
  methods: {
    checkedChanged(index) {
      this.$emit('checked-changed', index)
    },

    itemButtonClicked(index) {
      let amount = document.getElementById(index+'_amount').value;
      if(this.itemAmount) {
        this.$emit('item-button-clicked', index, amount)
      }else{
        this.$emit('item-button-clicked', index)
      }
    },

    listButtonClicked() {
      if(!this.itemAmount) {
        this.$emit('list-button-clicked')
        return;
      }
      let tab = [];
      for(let i = 0; i < this.data.length; i++) {
        if(document.getElementById(i +'_checkbox').checked) {
          let amount = document.getElementById(i +'_amount').value;
          tab.push([i, amount]);
        }
      }
      this.$emit('list-button-clicked', tab)
    },
  }

}
</script>

<style scoped>
.inline-block {
  display: inline-block;
}
</style>