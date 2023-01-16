const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const port = process.env.PORT || 3000;

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup Handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to server CSS and JS
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Vincent Garcia",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Vincent Garcia",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Vincent Garcia",
    message: "You won't last 30 seconds watching this",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.render("error", {
      title: "Error",
      errorMessage: "Please provide an address",
      name: "Vincent Garcia",
    });
  }
  geocode(req.query.address, (error, { latitude, longitude, location }) => {
    if (error) {
      return res.render("error", {
        title: "Error",
        errorMessage: "Error invalid address",
        name: "Vincent Garcia",
      });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.render("error", {
          title: "Error",
          errorMessage: "Error invalid address",
          name: "Vincent Garcia",
        });
      }

      return res.render("index", {
        title: "Weather",
        location: location,
        forecastData: forecastData,
        name: "Vincent Garcia",
      });
    });
  });
});

app.get("/*", (req, res) => {
  res.render("error", {
    title: "Error",
    errorMessage: "404 Page Not Found",
    name: "Vincent Garcia",
  });
});
app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
