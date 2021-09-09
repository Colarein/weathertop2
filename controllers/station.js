"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/station-store");
const stationAnalytics = require("../utils/station-analytics");
const uuid = require('uuid');
const axios = require("axios");
const oneCallRequest = 'https://api.openweathermap.org/data/2.5/onecall?lat=52.160858&lon=-7.152420&units=metric&appid=4945dcfc76e24ac10153c424a842c0d9'

const station = {
  index(request, response) {
    const stationId = request.params.id;
    logger.debug("Station id = ", stationId);
    const station = stationStore.getStation(stationId)
    const latestReading = stationAnalytics.getLatestReading(station.readings);
    // const maxTemperature = stationAnalytics.getMaxTemperature(station.readings);

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

         // maxTemperature: stationAnalytics.getMaxTemperature(station.temperature),

        },
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

  async addreport(request, response) {
    logger.info("rendering new report");
    let report = {};
    const lat = request.body.lat;
    const lng = request.body.lng;
    const requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=52.160858&lon=-7.152420&units=metric&appid=4945dcfc76e24ac10153c424a842c0d9'
    const result = await axios.get(requestUrl);
    if (result.status == 200) {
      const reading = result.data.current;
      report.code = reading.weather[0].id;
      report.temperature = reading.temp;
      report.windSpeed = reading.wind_speed;
      report.pressure = reading.pressure;
      report.windDirection = reading.wind_deg;
    }
    console.log(report);
    const viewData = {
      title: "Weather Report",
      reading: report
    };
    response.render("station", viewData);
  }

};

module.exports = station;
