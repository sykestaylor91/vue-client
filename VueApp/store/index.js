import Vue from 'vue'
import Vuex from 'vuex'
import userModule from './modules/user/store'
import organizationModule from './modules/organization/store'
import lookupDataModule from './modules/lookupData/store'
import historyModule from './modules/history/store'
import orderModule from './modules/order/store'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        user: userModule,
        organization: organizationModule,
        history: historyModule,
        lookupData: lookupDataModule,
        order: orderModule
    },

    mutations: {
        TOGGLE_LOADING(state) {
            state.callingAPI = !state.callingAPI
        },
        TOGGLE_SEARCHING(state) {
            state.searching = (state.searching === '') ? 'loading' : ''
        },
    }

});

export default store;