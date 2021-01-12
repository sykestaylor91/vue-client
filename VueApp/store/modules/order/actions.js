import axios from 'axios';

/**
    specimen
    organization
    quantity
    cost
*/
export const saveOrder = ({ commit }, order) => {
    axios.post('/api/Order/save/', order).then( response  => {
        commit("SAVE_ORDER", response.data);
    }).catch( err => {
        console.log(err);
    });
};

export const addSpecimen = ({commit}, params) => {
    var order = {
        Id: params.id,
        Specimens: params.specimens,
    };

    axios.post('/api/Order/save/', order).then( response  => {
        commit("ADD_SPECIMEN", response.data);
    }).catch( err => {
        console.log(err);
    });
};

export const loadOrder = ({ commit }, guid) => {
    axios.get('/api/Order/' + guid).then( response  => {
        commit("LOAD_ORDER", response.data);
    }).catch( err => {
        console.log(err);
    });

};

