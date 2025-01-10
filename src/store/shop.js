import ShopService from '../services/shop.service'


export default {
    namespaced: true,
    state: {
        viruses: [],
        basket:[],
    },

    mutations:{
        updateViruses(state, viruses) {
            state.viruses = viruses
        },
    },

    actions: {
        async getAllViruses({commit}) {
            console.log('récupération des viruses');
            let response = await ShopService.getAllViruses()
            if (response.error === 0) {
                commit('updateViruses', response.data)
            }
            else {
                console.log(response.data)
            }
        },
    }
}