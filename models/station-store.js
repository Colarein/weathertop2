"use strict";

const _ = require("lodash");

const stationStore = {
  stationCollection: require("./station-store.json").stationCollection,

  getAllStations() {
    return this.stationCollection;
  },

  getStation(id) {
    return _.find(this.stationCollection, { id: id });
  },

  removeReading(id, readingId) {
    const station = this.getStation(id);
    _.remove(station.readings, { id: readingId });
  },

  removeStation(id) {
    _.remove(this.stationCollection, { id: id });
  },

  addReading(id, reading) {
    const station = this.getStation(id);
    station.readings.push(reading);
  },

};

module.exports = stationStore;
