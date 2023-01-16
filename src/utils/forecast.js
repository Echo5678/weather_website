const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=0657f76240a03b5bfd7ed8e62cc5c840&query=" +
    latitude +
    "," +
    longitude;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          " It is currently " +
          body.current.temperature +
          " degress out. There is a " +
          body.current.precip +
          "% chance of rain." +
          " Feels like " +
          body.current.feelslike
      );
    }
  });
};

module.exports = forecast;
