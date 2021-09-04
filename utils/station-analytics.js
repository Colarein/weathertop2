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
  }
};

module.exports = stationAnalytics;
