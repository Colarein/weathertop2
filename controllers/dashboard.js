"use strict";

const logger = require("../utils/logger");
const stationCollection= require('../models/station-store.js');

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const viewData = {
      title: "WeatherTop Dashboard",
      station: stationCollection,
    };
 logger.info('about to render', stationCollection);
  response.render('dashboard', viewData);
},
};

module.exports = dashboard;
