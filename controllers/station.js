'use strict';

const logger = require('../utils/logger');
const stationCollection = require('../models/station-store.js');

const station = {
    index(request, response) {
      const stationId = request.params.id;
      logger.info('Station id = ' + stationId);
      const viewData = {
        name: 'Station',
      };
      response.render('station', viewData);
    },
};

module.exports = station;