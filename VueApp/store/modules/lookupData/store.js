import { loadGlobalLookupData, loadPatients } from './actions';
import Vue from 'vue';

const lookupDataModule = {
    state: { 
        loaded: false,
        clients: [],
        labs: [],
        patients: [],
        doctors: [],
    },
    namespaced: true,
    mutations: {
        LOAD_CLIENTS: (state, payload) => {
            Vue.set(state, 'clients', payload);
        },
        LOAD_PATIENTS: (state, payload) => {
            Vue.set(state, 'patients', payload);
        },
        LOAD_DOCTORS: (state, payload) => {
            Vue.set(state, 'doctors', payload);
        },
        LOAD_LABS: (state, payload) => {
            Vue.set(state, 'labs', payload);
        },
        LOADED: (state, payload) => {
            Vue.set(state, 'loaded', payload);
        }
    },

    actions: {
        loadGlobalLookupData,
        loadPatients
    },

    getters: {
        clients: state => state.clients,
        patients: state => state.patients,
        doctors: state => state.doctors,
        labs: state => state.labs,
        lookupDataLoaded: state => state.loaded
    },
}

export default lookupDataModule;