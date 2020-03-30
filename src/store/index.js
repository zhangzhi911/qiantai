import Vue from 'vue'
import Vuex from 'vuex'
import {
    getToken,
    setToken
} from '../permissions/auth'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        user: getToken()

    },
    mutations: {
        setUser(state, user) {
            state.user = user;
            setToken(user)
        }

    }
});

export default store;
