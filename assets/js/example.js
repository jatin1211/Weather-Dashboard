clickEl = $(".click-me");
historyEl = $(".history");
var tempEl = $(".tempData");
var windEl = $(".windData");
var humidityEl = $(".humidityData");
var uvIndexEl = $(".uvData");
var nameEl = $(".name");
var dayOneEl = $("#day-1");
var dayTwoEl = $("#day-2");
var dayThreeEl = $("#day-3");
var dayFourEl = $("#day-4");
var dayFiveEl = $("#day-5");
var resetEl = $(".reset");
var dayData = [dayOneEl, dayTwoEl, dayThreeEl, dayFourEl, dayFiveEl];


const cityArr = [];

clickEl.on("click", function () {
  var cityName = $(".city").val();
//   $(".forecast-data").empty();

  getApi(cityName);

  cityHistory(cityName);
  $(".city").val("");

  //tempEl.text(data.main.temp);
});

function cityHistory(cityName) {
  // cityArr.push(cityName);
  // //localStorage.setItem("cityName" ,cityName);
  // console.log(cityArr);

  var li = $("<button>");
  li.attr("id", cityName);

  li.text(cityName);
  historyEl.append(li);


//   }
 
  let location = localStorage.getItem('cityNames');
    
        if (location === null) {
            let saveCityObj = JSON.stringify([{ city: cityName }])
            location = localStorage.setItem('cityNames', saveCityObj)
        } else {
            console.log(location);
            location = JSON.parse(location);
            location.push({ city: cityName });
            localStorage.setItem('cityNames', JSON.stringify(location));
        }


  $("#" + cityName).on("click", function () {
    console.log("click");
    
    getApi(cityName);
  });

}

function loadCityHistory() {
  let location = localStorage.getItem("cityNames");

  if (location === null) {
    console.log("empty");
  } else {
    let locationParse = JSON.parse(location);
    console.log(locationParse);

    for (let i = 0; i < locationParse.length; i++) {
      let loadButton = locationParse[i].city;
      console.log(locationParse[i].city);


      const justLi = $("<li>");
      justLi.addClass("city-history");
      const savedCity = document.createElement("button");
      savedCity.textContent = loadButton;
      savedCity.classList = "city-history";
      justLi.append(savedCity);
      savedCity.setAttribute("id", loadButton);
      historyEl.append(justLi);
      $("#" + loadButton).on("click", function () {
        console.log("click");
        getApi(loadButton);
      });
    }
  }


}

loadCityHistory();

function getApi(cityName) {

  
    
  var url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&units=metric&APPID=1e6eaae9d442e0e35ea4708556663762";
  fetch(url).then(function (response) {
    if (response.ok) {
      return response.json().then(function (data) {
        var latitude = data.coord.lat;
        var longitude = data.coord.lon;
        //console.log(latitude);
        var tempEl = $(".tempData");
        getInfo(data);
        getInfo5(latitude, longitude);
      });
      
    }
       
  });
 

}
function getInfo(data) {
     var iconcode = data.weather[0].icon;
    //console.log(data.weather[0].icon);
     var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
     $('#wicon').attr('src', iconurl);
    
  nameEl.text(data.name + "  " + moment().format('MMMM Do YYYY'));
  //$(".date").text(moment());
  tempEl.text(data.main.temp + "°C");
  windEl.text(data.wind.speed + " MPH");
  humidityEl.text(data.main.humidity);
  uvIndexEl.text(" not found");
}

function getInfo5(latitude, longitude) {
    // $(".forecast-data").empty();
    dayOneEl.empty();
    dayTwoEl.empty();
    dayThreeEl.empty();
    dayFourEl.empty();
    dayFiveEl.empty();

    
  var url2 =
    "https://api.openweathermap.org/data/2.5/forecast?lat=" +
    latitude +
    "&lon=" +
    longitude +
    "&units=metric&APPID=1e6eaae9d442e0e35ea4708556663762";

  fetch(url2).then(function (res) {
    return res.json().then(function (data) {
      console.log(data);



      for (var i = 0; i < 5; i++) {
        var date = $("<p>");
        date.text(data.list[i*8].dt_txt);
        date.addClass("card-date");

        dayData[i].append(date);

        var li = $("<p>");
        li.text("Temp: " + data.list[i*8].main.temp + "°C");
        li.addClass("card-data");

        dayData[i].append(li);

        var li2 = $("<p>");
        li2.text("Wind speed: " + data.list[i*8].wind.speed + "MPH");
        li2.addClass("card-data");

        dayData[i].append(li2);

        var li3 = $("<p>");
        li3.text("Humidity: " + data.list[i*8].main.humidity);
        li3.addClass("card-data");

        dayData[i].append(li3);
      }
    });
  });
}

resetEl.on('click',function(){
    localStorage.clear();
    $(".history").empty();
      
})
