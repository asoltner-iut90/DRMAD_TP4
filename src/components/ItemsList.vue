<template>
  <div>
    <h1>ItemList</h1>
    <checked-list :data="viruses" :fields="[ 'name', 'price', 'promotion' ]" :itemCheck="true" :itemButton="{'show':true, 'text':'Ajouter au panier'}" :listButton="{'show':true, 'text':'buttonList'}" :checked="Array.from({ length: viruses.length }, () => true)" :itemAmount="true"
                  @item-button-clicked="itemButtonClicked"  @list-button-clicked="listButtonChecked" @checked-changed="checkedChanged"/>
  </div>
</template>

<script >
import {mapState} from "vuex";
import CheckedList from "@/components/checkedList.vue";

export default {
  components: {CheckedList},
  computed: {
    ...mapState(['viruses']),
  },
  methods: {
    checkedChanged(index) {
      console.log("test checked changed: ", index);
    },
    itemButtonClicked(index, amount) {
      console.log("test item button: ", index, amount);
    },
    listButtonChecked(tab) {
      console.log("test list button: ", tab);
    }
  }
}

</script>