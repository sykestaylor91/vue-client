import { loadOrganization, saveOrganization } from './actions';
import Vue from 'vue';

const organizationModule = {
    state: { 
        loaded: false,
        organization:{
            "href": null,
            "name": null,
            "nameKey": null,
            "groups": [
            {
                "name": null,
                "users": [
                {
                    "href": null,
                    "email": null,
                    "fullName": null
                }
                ]
            }
            ],
        }
    },
    namespaced: true,
    mutations: {
        LOAD_ORGANIZATION: (state, payload) => {
            Vue.set(state.organization, "customData", payload.customData);
            Object.assign(state.organization, payload);            
            state.loaded = true;
        },
        SAVE_ORGANIZATION: (state, payload) => {
        },
    },

    actions: {
        loadOrganization,
        saveOrganization
    },

    getters: {
        organization: state => state.organization,
        organizationLoaded: state => state.loaded
    },
}

export default organizationModule;