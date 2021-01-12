import axios from 'axios'

export const getUser = ({ commit }) => {
    axios.get('/me').then( response  => {
        commit("GET_USER", response.data);
        axios.get('/api/User/GetGroups').then( groupResponse =>
        {
            commit("SET_GROUP_CUSTOM_DATA", groupResponse.data);
        });                       
    }).catch( err => {
        console.log(err);
    });
}
export const updateCustomData = ({ commit }, params) => {
    axios.post('/api/User/UpdateCustomData', {
        key: params.dataKeyValue.key, 
        value: params.dataKeyValue.value
    }).then( response  => {
        commit("UPDATE_CUSTOM_DATA", response.data);
    }).catch( err => {
        console.log(err);
    });
}