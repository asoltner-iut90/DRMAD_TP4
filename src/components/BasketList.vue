<script>

export default {
  props:{
    data:Array,
  },

  data:()=> {
    return {

      fields: ['name', 'price', 'promotion'],

    }
  },
}

</script>

<template>
  <div>
    <h1>BasketList</h1>

    <checked-list :data="data" :fields="fields" :itemCheck="false" itemButton="supprimer" list-button="vider le panier"/>

  </div>
</template>

<style>

</style>
