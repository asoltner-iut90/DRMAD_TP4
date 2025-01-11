import ShopService from '../services/shop.service'

export default {
    namespaced: true,
    state: {
        shopUser: null,
        viruses: [],
        basket:[],
        loginError: '',
    },

    mutations:{
        updateViruses(state, viruses) {
            state.viruses = viruses
        },
        updateBasket(state, basket) {
            state.basket = basket
    },
        updateShopUser(state, user) {
            state.shopUser = user;
        },
        updateLoginError(state, error){
            state.loginError = error;
        },
    },

    actions: {
        async getAllViruses({ commit }) {
            console.log('Récupération des viruses');
            let response = await ShopService.getAllViruses();
            if (response.error === 0) {
                commit('updateViruses', response.data);
            } else {
                console.log(response.data);
            }
        },

        async shopLogin({commit}, data) {
            let response = await ShopService.shopLogin(data)
            if (response.error === 0) {
                await commit('updateShopUser', response.data)
                await commit('updateLoginError', '')
                return response.data
            }
            else {
                commit('updateLoginError', response.data)
            }
        },

        async getBasket({ commit, state }) {
            console.log('Récupération du panier');
            let response = await ShopService.getBasket({ id: state.shopUser._id});
            if (response.error === 0) {
                commit('updateBasket', response.data);
            } else {
                console.log(response.data);
            }
        },
        async addItemToBasket({ commit, state }, newItem) {
            commit('addItemToBasket', newItem);
            // Mettre à jour la source locale via ShopService
            await ShopService.updateBasket({ id: state.shopUser._id, basket: state.basket });
        },
        async removeItemFromBasket({ commit, state }, itemId) {
            commit('removeItemFromBasket', itemId);
            // Mettre à jour la source locale via ShopService
            await ShopService.updateBasket({ id: state.shopUser._id, basket: state.basket });
        },
        async decrementItemAmount({ commit, state }, itemId) {
            commit('decrementItemAmount', itemId);
            // Mettre à jour la source locale via ShopService
            await ShopService.updateBasket({ id: state.shopUser._id, basket: state.basket });
        },
        async clearBasket({ commit, state }) {
            commit('clearBasket');
            // Mettre à jour la source locale via ShopService
            await ShopService.updateBasket({ id: state.shopUser._id, basket: state.basket });
        }
    }
}

