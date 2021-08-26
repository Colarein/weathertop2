'use strict';

const logger = require('../utils/logger');
const stationCollection = require('../models/station-store.js');

const station = {
  index(request, response) {
    const viewData = {
      title: 'Station',
    };
    response.render('station', viewData);
  },
};

module.exports = station;