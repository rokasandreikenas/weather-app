fetch("https://api.meteo.lt/v1/places")
  .then((response) => response.json())
  .then((placesJson) => {
    const selectInput = document.getElementById("places");

    placesJson.length = 100;

    placesJson.forEach((place) => {
      const optionNote = document.createElement("option");

      optionNote.innerText = place.name;
      optionNote.value = place.code;

      selectInput.append(optionNote);
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
