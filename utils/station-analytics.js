"use strict";

const stationAnalytics = {
  getLatestReading(readings) {
    return readings[readings.length - 1];
  },

  celsiusToFahrenheit(temperature){
    return temperature * 1.8 + 32;
  }
};

module.exports = stationAnalytics;
