<template>
  <div class="shop-buy">
    <ItemsList/>
    <BasketList />
  </div>
</template>

<script>


import ItemsList from "@/components/ItemsList.vue";
import BasketList from "@/components/BasketList.vue";

export default {
  name: 'ShopBuy',
  components:{
    ItemsList,
    BasketList,
  }

};
</script>

<style scoped>
.shop-buy {
  display: flex;
  justify-content: space-between;
}

.items-list {
  flex: 1;
  margin-right: 1rem;
}

.basket-list {
  flex: 1;
  margin-left: 1rem;
}
</style>
