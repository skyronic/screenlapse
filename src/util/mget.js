// Utility class to get a model

import store from "store";
import _ from "lodash";

function findFromItems(items, key, keyName = "id") {
  let result = _.find(items, { [keyName]: key });

  if (!result) {
    warn("Unable to find item for key", keyName);
    return {};
  }

  return result;
}

let mget = {
  session: {
    fromId(key) {
      return findFromItems(store.state.session.items, key);
    }
  }
}

export default mget;
