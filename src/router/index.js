import Vue from 'vue'
import VueRouter from 'vue-router'
import ShopView from "@/views/ShopView.vue";
import ShopHome from "@/views/ShopHome.vue";
import ShopLogin from "@/views/ShopLogin.vue";
import ShopBuy from "@/views/ShopBuy.vue";
import ShopPay from "@/views/ShopPay.vue";
import ShopOrders from "@/views/ShopOrders.vue";

Vue.use(VueRouter)

const routes = [
  {
    path:'/shop',
    name: 'shop',
    component: ShopView
  },
  {
    path: '/home/home',
    name: 'home',
    component: ShopHome,
    alias: '/shop'
  },
  {
    path: '/shop/login',
    name: 'login',
    component: ShopLogin
  },
  {
    path: '/shop/buy',
    name: 'buy',
    component: ShopBuy
  },
  {
    path: '/shop/pay/:orderId',
    name: 'pay',
    component: ShopPay,
  },
  {
    path: '/shop/orders',
    name: 'orders',
    component: ShopOrders
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
