import { db }  from 'lib/storage';
import _ from 'lodash';

export const sessionModule = {
  namespaced: true,
  state: {
    items: []
  },
  actions: {
    async startNewSession({commit}, {interval}) {
      let config = {
        interval,
        status: 1
      };
      let [id] = await db('sessions').returning('id').insert(config);

      commit('addSession', {id, config})
    },
    loadData ({commit}, items) {
      _.each(items, (item) => {
        commit('addSession', {id: item.id, config: item});
      })
    }
  },
  mutations: {
    addSession (state, {id, config}) {
      state.items.push({
        id,
        config
      })
    }
  },
  getters: {
    items (state) {
      return state.items;
    }
  },
}
