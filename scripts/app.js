const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");
const forecast = new Forecast();

const updateUI = (data) => {
  // const citydets = data.citydet;
  // const weather = data.weather;
  console.log(data);
  // destructure properties
  const { citydets, weather } = data;
  // update details template
  details.innerHTML = `
      <h5 class="my-3">${citydets.EnglishName}</h5>
          <div class="my-3">${weather.WeatherText}</div>
          <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
          </div>
    `;
  // updating the icon
  const iconsrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconsrc);
  // update night/day and icon images
  let timesrc = weather.IsDayTime ? "img/day.svg" : "img/night.svg"; //ternoray operator
  // if (weather.IsDayTime) {
  //   timesrc = "img/day.svg";
  // } else {
  //   timesrc = "img/night.svg";
  // }
  time.setAttribute("src", timesrc);
  // remove d-none class
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

cityForm.addEventListener("submit", (e) => {
  // prevent default action
  e.preventDefault();
  // get city value
  const city = cityForm.city.value.trim();
  cityForm.reset();
  // update the new ui with new city
  forecast
    .updateCity(city)
    .then((data) => {
      updateUI(data);
    })
    .catch((err) => {
      console.log(err);
    });
  // set local storage
  localStorage.setItem("city", city);
});

if (localStorage.getItem("city")) {
  forecast
    .updateCity(localStorage.getItem("city"))
    .then((data) => {
      updateUI(data);
    })
    .catch((err) => {
      console.log(err);
    });
}
