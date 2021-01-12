
import Vue from 'vue';

const historyModule = {
    state: { 
        historyItems: []
    },
    namespaced: true,
    getters: {
        historyItems: state => state.historyItems
    },
}

export default historyModule;