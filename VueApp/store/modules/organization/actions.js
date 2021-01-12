import axios from 'axios'

export const loadOrganization = ({ commit }) => {
    axios.get('/api/Organization/Get').then( response  => {
        commit("LOAD_ORGANIZATION", response.data);
    }).catch( err => {
        console.log(err);
    });

};

export const saveOrganization = ({ commit }, organization) => {
    axios.post('/api/Organization/Save/', JSON.parse(organization)).then( response  => {
        commit("SAVE_ORGANIZATION", response.data);
    }).catch( err => {
        console.log(err);
    });

};