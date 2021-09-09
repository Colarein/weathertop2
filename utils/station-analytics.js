"use strict";
//stationAnalytics already an object so doing this seperately 
const { max } = require("lodash");
const mappedCodes = {
  "100": "Clear",
  "200": "Partial Clouds",
  "300": "Cloudy",
  "400": "Light Showers",
  "500": "Heavy Showers",
  "600": "Rain",
  "700": "Snow",
  "800": "Thunder",

  // weatherIcons(code) {
  //   let weatherIcons = code;
  //   switch (code) {
  //     case "100":
  //       return  "sun";
  //       break;
  //     case "200":
  //       return "cloud sun";
  //       break;
  //     case "300":
  //       return "cloud";
  //       break;
  //     case "400":
  //       return "cloud sun rain";
  //       break;
  //     case "500":
  //       return "cloud showers heavy";
  //       break;
  //     case "600":
  //       return "cloud rain";
  //       break;
  //     case "700":
  //       return "snowflake";
  //       break;
  //     case "800":
  //       return "bolt";
  //       break;
  //     default:
  //       return "";
  //   }
  // },

}

const stationAnalytics = {
  getLatestReading(readings) {
    return readings[readings.length - 1];
  },

  celsiusToFahrenheit(temperature){
    return temperature * 1.8 + 32;
  },

  convertToBeafourt(windSpeed) {
    if (windSpeed == 0) {
      return 0;
    } else if (windSpeed >= 1 && windSpeed <= 6) {
      return 1;
    } else if (windSpeed >= 7 && windSpeed <= 11) {
      return 2;
    } else if (windSpeed >= 12 && windSpeed <= 19) {
      return 3;
    } else if (windSpeed >= 20 && windSpeed <= 29) {
      return 4;
    } else if (windSpeed >= 30 && windSpeed <= 39) {
      return 5;
    } else if (windSpeed >= 40 && windSpeed <= 50) {
      return 6;
    } else if (windSpeed >= 51 && windSpeed <= 62) {
      return 7;
    } else if (windSpeed >= 63 && windSpeed <= 75) {
      return 8;
    } else if (windSpeed >= 76 && windSpeed <= 87) {
      return 9;
    } else if (windSpeed >= 88 && windSpeed <= 102) {
      return 10;
    } else if (windSpeed >= 103 && windSpeed <= 117) {
      return 11;
    } else if (windSpeed >= 117) {
      return 12;
    }
    return -1;
  },

    calculateWindChill(temperature, windSpeed) {
      return Math.round(13.12 + 0.6215 * temperature -  11.37 * (Math.pow(windSpeed, 0.16)) + 0.3965 * temperature * (Math.pow(windSpeed, 0.16)));
    },

    windCompass(windDirection) {
      if (windDirection > 11.25 && windDirection <= 33.75) {
        return "North North East";
      } else if (windDirection > 33.75 && windDirection <= 56.25) {
        return "East North East";
      } else if (windDirection > 56.25 && windDirection <= 78.75) {
        return "East";
      } else if (windDirection > 78.75 && windDirection <= 101.25) {
        return "East South East";
      } else if (windDirection > 101.25 && windDirection <= 123.75) {
        return "East South East";
      } else if (windDirection > 123.75 && windDirection <= 146.25) {
        return "South East";
      } else if (windDirection > 146.25 && windDirection <= 168.75) {
        return "South South East";
      } else if (windDirection > 168.75 && windDirection <= 191.25) {
        return "South";
      } else if (windDirection > 191.25 && windDirection <= 213.75) {
        return "South South West";
      } else if (windDirection > 213.75 && windDirection <= 236.25) {
        return "South West";
      } else if (windDirection > 236.25 && windDirection <= 258.75) {
        return "West South West";
      } else if (windDirection > 258.75 && windDirection <= 281.25) {
        return "West";
      } else if (windDirection > 281.25 && windDirection <= 303.75) {
        return "West North West";
      } else if (windDirection > 303.75 && windDirection <= 326.25) {
        return "North West";
      } else if (windDirection > 326.25 && windDirection <= 348.75) {
        return "North North West";
      } else {
        return "North";
      }
  },
  
  
 weatherIcon(code) {
  return mappedCodes[String(code)];
},

 // getMax(readings) {
 //   return max[Math.max(readings)];
 // },

  // getMaxTemperature(temperature){
  //   let maxTemperature;
  //   return maxTemperature[Math.max(temperature)];
  // },


// public static double min(double values[]) {
//   double min = values[0];
//   for (double value : values) {
//     if (value < min) {
//       min = value;
//     }
//   }
//   return min;
// }

};

module.exports = stationAnalytics;
