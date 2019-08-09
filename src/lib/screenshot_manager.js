// A single utility which figures out whether or not to take a screenshot, and performs the
// actual process of taking the shot

import _ from 'lodash';
import mget from "util/mget";
import {info, debug, warn} from "util/log";
import store from 'store';
let screenshot = require ('screenshot-desktop')
let fs = require('fs');
let path = require('path');
let { exec } = require('child_process')
let sharp = window.require('sharp');

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

function getIdleTime () {
  return new Promise(function (resolve, reject) {
    exec("ioreg -c IOHIDSystem | awk '/HIDIdleTime/ {print $NF/1000000000; exit}'", (error, stdout, stderr) => {
      if(error) {
        resolve([true, 1000]);
      }
      resolve([false, parseInt(stdout)])
    })
  })
}

async function shouldTakeScreenshot(session) {
  let ticksSinceLastShot = ticks - getLastShot(session.id);

  if (ticksSinceLastShot < session.config.interval) {
    return [false, "Insufficient time elapsed"];
  }

  let [err, idleTime] = await getIdleTime();

  // TODO: make this configurable
  if(idleTime > 5) {
    return [false, "User is idle"];
  }

  return [true, "All conditions met"]
}

async function doTick() {
  let session = store.getters['session/runningSession'];
  if (!session) {
    return;
  }

  let [shotFlag, shotReason = ""] = await shouldTakeScreenshot(session);
  if (shotFlag) {
    console.log("Taking screenshot ", shotReason);

    let rawFilePath = "/tmp/sl/" + session.id + "/" + Date.now() + "_raw.png";
    let filePath = "/tmp/sl/" + session.id + "/" + Date.now() + ".png";
    fs.mkdirSync(path.dirname(filePath), {
      recursive: true
    });

    await screenshot({filename: rawFilePath})
    await sharp(rawFilePath)
      .resize({
        height: 1080
      })
      .toFile(filePath);
    fs.unlinkSync(rawFilePath);

    store.dispatch("screenshot/addScreenshot", {
      session_id: session.id,
      path: filePath
    });

    lastShot[session.id] = ticks;

  }
}

let intervalHandle = null;
export const initScreenshotManager = () => {
  intervalHandle = setInterval(async () => {
    ticks++;
    await doTick();
  }, 1000 / TICKS_IN_SEC)
};

export const stopScreenshotManager = () => {
  clearInterval(intervalHandle);
}