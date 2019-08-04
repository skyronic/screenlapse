import { db }  from 'lib/storage';
import _ from 'lodash';
import mget from "util/mget";

export const screenshotModule = {
  namespaced: true,
  state: {
  },
  actions: {
    async addScreenshot({commit}, {path, session_id}) {
      // Just adding a screenshot doesn't affect the store
      // since we don't write to the vue store.

      await db('screenshots').insert({
        path,
        session_id
      });
    }
  },
  mutations: {
  },
  getters: {
  },
};

