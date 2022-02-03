const locationDisplay = document.getElementById("location");
const quoteDisplay = document.getElementById("quote");
const timeDisplay = document.getElementById("time");
const weatherDisplay = document.getElementById("weather");
const greetingDisplay = document.getElementById("greeting");

fetch(
  "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=landscapes"
)
  .then((response) => response.json())
  .then((data) => {
    document.body.style.backgroundImage = `url(${data.urls.full}`;
    locationDisplay.innerText = data.location.title;
  });

fetch("https://game-of-thrones-quotes.herokuapp.com/v1/random")
  .then((response) => response.json())
  .then((data) => {
    quoteDisplay.innerText =
      data.sentence +
      "  \n - " +
      data.character.name +
      " (" +
      data.character.house.name +
      ")";
  });

function getTime() {
  const date = new Date();
  const mins = ("0" + date.getMinutes()).slice(-2);
  const time = date.getHours() + ":" + mins;
  const messageTime = date.getHours();
  let message;
  timeDisplay.innerText = time;
  if (messageTime < 12) {
    message = "Good Morning";
  } else if (messageTime < 18) {
    message = "Good Afternoon";
  } else {
    message = "Good Evening";
  }
  greetingDisplay.innerHTML = `${message}, Arbaaz`;
}

setInterval(getTime, 1000);

navigator.geolocation.getCurrentPosition((position) => {
  fetch(
    `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`
  )
    .then((res) => {
      if (!res.ok) {
        throw Error("Weather data not available");
      }
      return res.json();
    })
    .then((data) => {
      const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      document.getElementById("weather-details").innerHTML = `
                <img src=${iconUrl} />
                <p>${Math.round(data.main.temp)}º</p>
            `;
      document.getElementById("weather-location").innerHTML = `
                <p>${data.name}</p>
            `;
    })
    .catch((err) => console.error(err));
});
