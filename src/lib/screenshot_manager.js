// A single utility which figures out whether or not to take a screenshot, and performs the
// actual process of taking the shot

import _ from 'lodash';
import mget from "util/mget";
import {info, debug, warn} from "util/log";
import store from 'store';

let ticks = 0;

// 1 tick = 1 second
const TICKS_IN_SEC = 1;

// Store when the last shot was taken
let lastShot = {};

function getLastShot(key) {
  if (lastShot.hasOwnProperty(key)) {
    return lastShot[key]
  }
  // return a very low value so the first call to this would
  return -100;
}

function shouldTakeScreenshot(session) {
  let ticksSinceLastShot = ticks - getLastShot(session.id);

  return [true, "Always true"]
}

function doTick() {
  let session = store.getters['session/runningSession'];
  if (!session) {
    return;
  }

  let [shotFlag, shotReason = ""] = shouldTakeScreenshot(session)
  if (shotFlag) {
    console.log("TODO: Taking screenshot ", shotReason);
    store.dispatch("screenshot/addScreenshot", {
      session_id: session.id,
      path: "foobar"
    })
  }
}

let intervalHandle = null;
export const initScreenshotManager = () => {
  intervalHandle = setInterval(() => {
    ticks++;
    doTick();
  }, 1000 / TICKS_IN_SEC)
};

export const stopScreenshotManager = () => {
  clearInterval(intervalHandle);
}