import { newOrder, addSpecimen, loadOrder, saveOrder } from './actions';
import Vue from 'vue';

const uuidV1 = require('uuid/v1');

const orderModule = {
    state: { 
        order:{
            "id": 0,
            "guid": "",
            "createdHref": "",
            "createdFullName": "",
            "orgNameKey": "",
            "specimens": [
            /*{
                "groupGuid": null,
                "guid": null,
                "id": null,
                "externalId": null,
                "type":{
                    "type":null,
                    "code":null
                },
                "transport":{
                    "name": null,
                    "code": null
                },
                "customData": {}
            } */           
            ],
            "customData": ""
        }
    },
    namespaced: true,
    mutations: {
        SAVE_ORDER: (state, payload) =>
        { 
            var order = payload.order;
            if(order){
                Vue.set(state, "order", order);
            }
        },
        LOAD_ORDER: (state, order) => {
            if(order){
                Vue.set(state, "order", order);
            }
        },
    },

    actions: {
        newOrder,
        addSpecimen,
        loadOrder,
        saveOrder
    },

    getters: {
        order: state => state.order
    }
};

export default orderModule;