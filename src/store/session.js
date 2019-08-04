import { db }  from 'lib/storage';
import _ from 'lodash';
import {STATUS_RUNNING, STATUS_STOPPED} from "util/constants";
import mget from "util/mget";

export const sessionModule = {
  namespaced: true,
  state: {
    running_id: null,
    items: []
  },
  actions: {
    async startNewSession({commit}, {interval}) {
      let config = {
        interval,
        status: STATUS_RUNNING
      };
      let [id] = await db('sessions').returning('id').insert(config);

      commit('addSession', {id, config})
      commit('setRunning', {id});
    },
    loadData ({commit}, items) {
      _.each(items, (item) => {
        commit('addSession', {id: item.id, config: item});
      })
    },
  },
  mutations: {
    addSession (state, {id, config}) {
      state.items.push({
        id,
        config
      })
    },
    setRunning (state, {id}) {
      let session = mget.session.fromId(id);
      session.config.status = STATUS_RUNNING;
      state.running_id = id;
    },
    setStopped (state, {id}) {
      let session = mget.session.fromId(id);
      session.config.status = STATUS_STOPPED;
      state.running_id = null;
    }
  },
  getters: {
    items (state) {
      return state.items;
    },
    runningSession(state) {
      if(state.running_id) {
        return mget.session.fromId(state.running_id)
      }
      return null;
    }
  },
};

