import BankService from "@/services/bankaccount.service";
import ShopService from "@/services/shop.service";
import router from "@/router";

export default {
    namespaced: true,
    state: {
        shopUser: null,
        accountAmount: 0,
        accountTransactions: [],
        accountNumberError :0,
        loginError: '',
    },

    mutations:{
        updateAccountAmount(state, amount){
            state.accountAmount = amount
        },
        updateAccountTransactions(state, transactions){
            state.accountTransactions = transactions
        },
        updateAccountNumberError(state, error){
            state.accountNumberError = error
        },
        updateShopUser(state, user) {
            state.shopUser = user
        },
        updateLoginError(state, error){
            state.loginError = error
        },
    },

    // actions = fonctions asynchrone pour mettre à jour le state, en faisant appel aux mutations, via la fonction commit()
    actions: {
        async getAccountTransactions({commit}, data) {
            console.log('recupération des transactions du compte');
            let response = await BankService.getAccountTransactions(data)
            if (response.error === 0) {
                commit('updateAccountTransactions', response.data)
                commit('updateAccountNumberError', 1)
            }
            else {
                commit('updateAccountNumberError', -1)}
        },

        async getAccountAmount({commit}, data) {
            console.log('recupération de la valeur du compte');
            let response = await BankService.getAccountAmount(data)
            if (response.error === 0) {
                commit('updateAccountAmount', response.data)
                commit('updateAccountNumberError', 1)
            }
            else {
                commit('updateAccountNumberError', -1)
            }
        },

        async shopLogin({commit}, data) {
            let response = await ShopService.shopLogin(data)
            if (response.error === 0) {
                commit('updateShopUser', response.data)
                commit('updateLoginError', '')
                await router.push('/shop/buy')
            }
            else {
                commit('updateLoginError', response.data)
            }
        }
    }
}