const wrapper = document.querySelector(".wrapper");
const inputPart = wrapper.querySelector(".input-part");
const infoText = inputPart.querySelector(".info-text");
const inputField = inputPart.querySelector("input");
const locationBtn = inputPart.querySelector("button");

locationBtn.addEventListener("click", () => {
    if(navigator.geolocation){//check if geolocation is available
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }else{
        alert("Geolocation is not supported by this browser.");
    }
});

//if the user has granted permission to use geolocation
function onSuccess(position) {
    //get latitude and longitude
    const { latitude, longitude } = position.coords;
    let apiKey = "07334a881c572f9314ab02c71984919b";
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    fetchData(api);
}

//if the user has denied permission to use geolocation
function onError(error) {
    infoText.innerText = error.message;
    infoText.classList.add("error");
    infoText.style.display = "block";
}

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

  fetchData(api);
}

//fetch data from API
function fetchData(api) {
  infoText.innerText = "Getting weather data...";
  infoText.classList.add("pending");
  infoText.style.display = "block";

  fetch(api).then((response) =>
    console.log(response.json()).then((result) => weatherDetails(result))
  );
}


//weather details
function weatherDetails(info) {
    if(info.cod == "404"){
        infoText.innerText = `${inputField.value} is not a valid city.`;
        infoText.classList.add("error");
        infoText.style.display = "block";
    }
    console.log(info);
}