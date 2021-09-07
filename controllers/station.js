"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/station-store");
const stationAnalytics = require("../utils/station-analytics");
const uuid = require('uuid');

const station = {
  index(request, response) {
    const stationId = request.params.id;
    logger.debug("Station id = ", stationId);
    const station = stationStore.getStation(stationId)
    const latestReading = stationAnalytics.getLatestReading(station.readings);

    if (latestReading) {
      const viewData = {
        title: "Station",
        station: station,
        stationSummary: {
          latestCode: latestReading.code,
          latestWeatherIcon: stationAnalytics.weatherIcon(latestReading.code),
          latestTempC: latestReading.temperature,
          latestTempF: stationAnalytics.celsiusToFahrenheit(latestReading.temperature),
          latestWindChill: stationAnalytics.calculateWindChill(latestReading.temperature, latestReading.windSpeed),
          latestWindSpeedBeaufort: stationAnalytics.convertToBeafourt(latestReading.windSpeed),
          latestWindCompass: stationAnalytics.windCompass(latestReading.windDirection),
          latestPressure: latestReading.pressure,

        }
      };
      response.render("station", viewData);
    } else {
      const viewData = {
        title: "Station",
        station: station,
      };
      response.render("station", viewData);
    }
  },

  deleteReading(request, response) {
    const stationId = request.params.id;
    const readingId = request.params.readingid;
    logger.debug(`Deleting Reading ${readingId} from Station ${stationId}`);
    stationStore.removeReading(stationId, readingId);
    response.redirect("/station/" + stationId);
  },

  addReading(request, response) {
    const stationId = request.params.id;
    const station = stationStore.getStation(stationId);
    const newReading = {
      id: uuid.v1(),
      code: request.body.code,
      temperature: request.body.temperature,
      windSpeed: request.body.windSpeed,
      pressure: request.body.pressure,
      windDirection: request.body.windDirection,
      date: new Date().toString(),
    };
    logger.debug('New Reading = ', newReading);
    stationStore.addReading(stationId, newReading);
    response.redirect('/station/' + stationId);
  },

};

module.exports = station;
