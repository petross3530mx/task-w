import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
        darkTheme: false,
        websites: []
	},
	mutations: {
		toggleTheme(state): void {
            state.darkTheme = !state.darkTheme
        },
        addWebsite(state, website){
            state.websites.push(website)
        },
        deleteWebsite(state, website){
            const stateWebsites = state.websites;
            const index = stateWebsites.findIndex(w=>w.url == website.url);
            stateWebsites.splice(index, 1);
            state.websites = stateWebsites;
        }
	},
	actions: {
		changeTheme({ commit }) {
			commit('toggleTheme');
        },
        addWebsite({ commit }, website: any){
            const {url, cms, blockchain, address} = website ;
            commit('addWebsite', {url, cms, blockchain, address});
        },
        deleteWebsite({ commit }, website){
            commit('deleteWebsite', website);
        }
	},
	getters: {
        darkTheme: s => s.darkTheme,
        websites: s => s.websites
    },
    plugins: [createPersistedState()],
	modules: {}
});
