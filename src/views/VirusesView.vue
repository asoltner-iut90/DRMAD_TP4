<template>
  <div>
    <h1>Les virus</h1>
    <p>Le tableau dans le store : {{ viruses }}</p>
    <p>sous forme de liste avec certains champs</p>
    <span>Filtres :</span>
    <br><input type="checkbox" v-model="filterPriceActive" id="filterpriceactive" @change="computedFilter"><label for="filterpriceactive">par prix</label>
    <br><input type="checkbox" v-model="filterNameActive" id="filternameactive" @change="computedFilter"><label for="filternameactive">par nom</label>
    <br><input type="checkbox" v-model="filterStockActive" id="filterstockactive" @change="computedFilter"><label for="filterstockeactive" >par stock</label>
    <hr />
    <div v-if="filterPriceActive">
      <label for="filterprice">prix inférieur à : </label><input v-model="priceFilter" id="filterprice" @input="computedFilter">
    </div>
    <div v-if="filterNameActive">
      <label for="filtername">Nom contenant : </label><input type="text" v-model="nameFilter" id="filtername" @input="computedFilter" >
    </div>
    <div v-if="filterStockActive">
      <label for="filterstock">En stock :</label>
      <input type="radio" v-model="stockFilter" name="filterstock" id="filterstockyes" :value="true" >
      <label for="filterstockyes">Oui</label>
      <input type="radio" v-model="stockFilter" name="filterstock" id="filterstockno" :value="false">
      <label for="filterstockno">Non</label>
    </div>
    <table>
      <thead>
      <th>Nom</th>
      <th>Prix</th>
      </thead>
      <tbody>
      <tr v-for="(virus, index) in computedFilter" :key="index">
        <td>{{virus.name}}</td>
        <td>{{virus.price}}</td>
      </tr>
      </tbody>
    </table>
    <checked-list :data="computedFilter()" :fields="[ 'name', 'price' ]" :itemCheck="true" :itemButton="{'show':true, 'text':'buttonItem'}" :listButton="{'show':true, 'text':'buttonList'}" :checked="computedSelectedViruses()"
                  @item-button-clicked="itemButtonClicked"  @list-button-clicked="listButtonChecked" @checked-changed="checkedChanged"></checked-list>
  </div>

</template>

<script>

import {mapState} from 'vuex'
import CheckedList from "@/components/checkedList.vue";
export default {
  name: 'VirusesView',
  components: {CheckedList},
  data: () => ({
    priceFilter:0,
    nameFilter:"",
    stockFilter: false,
    filterPriceActive: false,
    filterNameActive: false,
    filterStockActive: false,
    selectedViruses: [],
  }),
  computed: {
    ...mapState("shop",['viruses']),
  },
  methods:{
    computedFilter(){
      let viruses = this.viruses
      if(this.filterNameActive){
        if (this.nameFilter.length > 0 ) viruses = viruses.filter(v => v.name.includes(this.nameFilter))
      }
      if(this.filterStockActive){
        if(this.stockFilter) {
          viruses = viruses.filter(v => v.stock > 0)
        } else{
          viruses = viruses.filter(v => v.stock === 0)
        }
      }
      if(this.filterPriceActive){
        if (this.priceFilter >0 ) viruses = viruses.filter(v => v.price < this.priceFilter)
      }
      return viruses
    },

    computedSelectedViruses(){
      let filteredViruses = this.computedFilter()
      let selected = new Array(filteredViruses.length).fill(false)
      this.selectedViruses.forEach(index => {
        var newIndex = filteredViruses.indexOf(this.viruses[index])
        if(newIndex !== -1) selected[newIndex] = true
      })
      return selected
    },

    itemButtonClicked(index){
      let virus = this.filteredViruses[index]
      console.log("test item button: ", virus.name, virus.price, virus.stock)
    },

    listButtonChecked(){
      let tab = []
      let filteredViruses = this.computedFilter()
      this.selectedViruses.forEach(index => {
        if(filteredViruses.includes(this.viruses[index])) tab.push(this.viruses[index])
      })
      console.log("test list button ", tab)
    },
    checkedChanged(index){
      console.log("test checked changed: ", index)
      let realIndex = this.viruses.indexOf(this.computedFilter()[index])
      if(this.selectedViruses.includes(realIndex)){
        this.selectedViruses = this.selectedViruses.filter(i => i !== realIndex)
      } else{
        this.selectedViruses.push(realIndex)
      }
    }


  },
  mounted(){
    this.computedFilter()
  }

}
</script>
