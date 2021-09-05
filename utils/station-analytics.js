"use strict";

const stationAnalytics = {
  getLatestTempC(station) {
    let latestTempC = null;
    if (station.readings.length > 0) {
      latestTempC = station.readings[0];
      for (let i = 1; i < station.readings.length; i++) {
        if (station.readings[i].temperature < latestTempC.temperature) {
          latestTempC = station.readings[i];
        }
      }
    }
    return latestTempC;
  },

getLatestTempF(station) {
  let latestTempF = null;
  if (station.readings.length > 0) {
    latestTempF = station.readings[0];
    for (let i = 1; i < station.readings.length; i++) {
      if (station.readings[i].temperature < latestTempF.temperature) {
        latestTempF = station.readings[i];
      }
    }
  }
  return latestTempF;
}
};

module.exports = stationAnalytics;
