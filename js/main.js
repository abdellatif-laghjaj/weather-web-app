const wrapper = document.querySelector(".wrapper");
const inputPart = wrapper.querySelector(".input-part");
const infoText = inputPart.querySelector(".info-text");
const inputField = inputPart.querySelector("input");

inputField.addEventListener("keyup", (e) => {
  //if user presses enter and input is not empty
  if (e.key == "Enter" && inputField.value != "") {
    requestApi(inputField.value);
    inputField.value = "";
  }
});

//request API
function requestApi(city) {
  let apiKey = "07334a881c572f9314ab02c71984919b";
  let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  infoText.innerText = "Getting weather data...";
  infoText.classList.add("pending");
  infoText.style.display = "block";

  fetch(api).then((response) =>
    console.log(response.json()).then((result) => weatherDetails(result))
  );
}


//weather details
function weatherDetails(info) {
  console.log(info);
}