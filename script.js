fetch("https://api.meteo.lt/v1/places")
  .then((response) => {
    const responseInput = document.getElementById("response");
    const status = response.statusText;
    responseInput.innerText = `response: ${status}`;
    return response.json();
  })
  .then((placesJson) => {
    const selectInput = document.getElementById("places");

    placesJson.forEach((place) => {
      const optionNode = document.createElement("option");

      optionNode.innerText = place.name;
      optionNode.value = place.code;

      selectInput.append(optionNode);
    });
  });

const selectInput = document.getElementById("places");

const onSelect = () => {
  const cityCode = selectInput.value;

  fetch(`https://api.meteo.lt/v1/places/${cityCode}/forecasts/long-term`)
    .then((response) => response.json())
    .then((forecastJson) => {
      const forecast = forecastJson.forecastTimestamps[0];

      const temperature = document.getElementById("temperature");
      temperature.innerText = `Oro temperatūra dabar yra: ${forecast.airTemperature}`;
    });
};

selectInput.addEventListener("change", onSelect);

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      initMap(latitude, longitude);
    });
  } else {
    console.log("Browser does not support geo location");
  }
}

function initMap(latitude, longitude) {
  if (latitude && longitude) {
    const iframeNode = document.createElement("iframe");
    const url = `http://maps.google.com/maps?q=${latitude},${longitude}&z=16&output=embed`;
    iframeNode.src = url;
    iframeNode.style = "border: 0; margin-bottom: 24px";
    iframeNode.width = 450;
    iframeNode.height = 300;
    iframeNode.setAttribute("loading", "lazy");
    iframeNode.setAttribute("allowfullscreen", "");

    const mapDiv = document.getElementById("map");
    mapDiv.append(iframeNode);
  }
}

getLocation();
