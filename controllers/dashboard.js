"use strict";

const accounts = require("./accounts.js");
const logger = require("../utils/logger");
const stationStore = require("../models/station-store");
const uuid = require("uuid");
const axios = require("axios");
const oneCallRequest = 'https://api.openweathermap.org/data/2.5/onecall?lat=52.160858&lon=-7.152420&units=metric&appid=4945dcfc76e24ac10153c424a842c0d9'


const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      title: "Station Dashboard",
      stations: stationStore.getUserStations(loggedInUser.id)
    };
    logger.info("about to render", stationStore.getAllStations());
    response.render("dashboard", viewData);
  },

  deleteStation(request, response) {
    const stationId = request.params.id;
    logger.debug(`Deleting Station ${stationId}`);
    stationStore.removeStation(stationId);
    response.redirect('/dashboard');
  },

  addStation(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newStation = {
      id: uuid.v1(),
      userid: loggedInUser.id,
      name: request.body.name,
      latitude: request.body.latitude,
      longitude: request.body.longitude,
      readings: [],
    };
    logger.debug('Creating a new Station', newStation);
    stationStore.addStation(newStation);
    response.redirect('/dashboard');
  },

  // async addreport(request, response) {
  //   logger.info("rendering new report");
  //   let report = {};
  //   const result = await axios.get(oneCallRequest);
  //   if (result.status == 200) {
  //     const reading = result.data.current;
  //     report.code = reading.weather[0].id;
  //     report.temperature = reading.temp;
  //     report.windSpeed = reading.wind_speed;
  //     report.pressure = reading.pressure;
  //     report.windDirection = reading.wind_deg;
  //   }
  //   console.log(report);
  //   const viewData = {
  //     title: "Weather Report",
  //     reading: report
  //   };
  //   response.render("dashboard", viewData);
  // }
};

module.exports = dashboard;
