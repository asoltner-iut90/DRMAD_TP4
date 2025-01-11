import ShopService from '../services/shop.service'


export default {
    namespaced: true,
    state: {
        viruses: [],
        basket: [],
    },

    mutations: {
        updateViruses(state, viruses) {
            state.viruses = viruses;
        },
        updateBasket(state, basket) {
            state.basket = basket;
        },
        addItemToBasket(state, newItem) {
            let existingItem = state.basket.items.find(item => item.item === newItem.item);
            if (existingItem) {
                existingItem.amount += newItem.amount;
            } else {
                state.basket.items.push(newItem);
            }
        },
        removeItemFromBasket(state, itemId) {
            state.basket.items = state.basket.items.filter(item => item.item !== itemId);
        },
        decrementItemAmount(state, itemId) {
            let existingItem = state.basket.items.find(item => item.item === itemId);
            if (existingItem) {
                if (existingItem.amount > 1) {
                    existingItem.amount -= 1;
                } else {
                    state.basket.items = state.basket.items.filter(item => item.item !== itemId);
                }
            }
        },
        clearBasket(state) {
            state.basket = { items: [] };
        }
    },

    actions: {
        async getAllViruses({commit}) {
            console.log('Récupération des viruses');
            let response = await ShopService.getAllViruses();
            if (response.error === 0) {
                commit('updateViruses', response.data);
            } else {
                console.log(response.data);
            }
        },
        async getBasket({commit}, userId) {
            console.log('Récupération du panier');
            let response = await ShopService.getBasket({id: userId});
            if (response.error === 0) {
                commit('updateBasket', response.data);
            } else {
                console.log(response.data);
            }
        },
        async addItemToBasket({commit, state}, newItem) {
            commit('addItemToBasket', newItem);
            await ShopService.updateBasket({id: state.userId, basket: state.basket});
        },
        async removeItemFromBasket({commit, state}, itemId) {
            commit('removeItemFromBasket', itemId);
            await ShopService.updateBasket({id: state.userId, basket: state.basket});
        },
        async decrementItemAmount({commit, state}, itemId) {
            commit('decrementItemAmount', itemId);
            await ShopService.updateBasket({id: state.userId, basket: state.basket});
        },
        async clearBasket({commit, state}) {
            commit('clearBasket');
            await ShopService.updateBasket( {id: state.userId, basket: state.basket});
        }
    }
}