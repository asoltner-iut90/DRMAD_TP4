import ShopService from '../services/shop.service'

export default {
    namespaced: true,
    state: {
        shopUser: null,
        viruses: [],
        basket: [],
        loginError: '',
    },

    mutations: {
        updateViruses(state, viruses) {
            state.viruses = viruses;
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

        async shopLogin({ commit }, data) {
            let response = await ShopService.shopLogin(data);
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
            let response = await ShopService.getBasket({ id: state.shopUser._id });
            if (response.error === 0) {
                commit('updateBasket', response.data);
            } else {
                console.log(response.data);
            }
        },

        async addItemToBasket({ commit, state }, newItem) {
            console.log('Ajout d\'un item au panier :', newItem);
            const updatedBasket = Array.isArray(state.basket) ? [...state.basket] : [];  // Assure que c'est un tableau
            const existingItemIndex = updatedBasket.findIndex(b => b.item._id === newItem.item._id);

            if (existingItemIndex !== -1) {
                updatedBasket[existingItemIndex].amount += newItem.amount;
            } else {
                updatedBasket.push(newItem);
                console.log(state.basket);
            }

            commit('updateBasket', updatedBasket);
            await ShopService.updateBasket({ id: state.shopUser._id, basket: updatedBasket });
        },

        async removeItemFromBasket({ commit, state }, itemId) {
            const updatedBasket = state.basket.filter(b => b.item._id !== itemId);
            commit('updateBasket', updatedBasket);
            await ShopService.updateBasket({ id: state.shopUser._id, basket: updatedBasket });
        },

        async incredecrementItemAmount({ commit, state }, { itemId, nombre }) {
            const updatedBasket = [...state.basket];
            const itemIndex = updatedBasket.findIndex(b => b.item._id === itemId);

            if (itemIndex !== -1) {
                updatedBasket[itemIndex].amount += nombre;

                if (updatedBasket[itemIndex].amount <= 0) {
                    updatedBasket.splice(itemIndex, 1); // Supprimer l'item si quantité <= 0
                }

                commit('updateBasket', updatedBasket);
            }
        },

        async clearBasket({ commit, state }) {
            const emptyBasket = [];
            commit('updateBasket', emptyBasket);
            await ShopService.updateBasket({ id: state.shopUser._id, basket: emptyBasket });
        },

    }
}


