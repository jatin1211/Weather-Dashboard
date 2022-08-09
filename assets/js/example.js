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
var dayData = [dayOneEl,dayTwoEl,dayThreeEl,dayFourEl,dayFiveEl];

const cityArr = [];

clickEl.on('click',function(){
    var cityName = $(".city").val();
        
    getApi(cityName);

    cityHistory(cityName);
    $(".city").val("");
    
    //tempEl.text(data.main.temp);
});


function cityHistory(cityName){

        cityArr.push(cityName);
        localStorage.setItem("cityName" ,cityName);
        console.log(cityArr);

        var li = $("<li>");
        li.attr("id",cityName);
        var currentId = li.attr("id");
        
        li.addClass("city-history");
        li.text(cityName);
        historyEl.append(li);



        $("#cityName").on('click',function(){
            console.log("click");
            getApi(cityName);

        })
        $(currentId).on('click',function(cityName){
            getApi(cityName);
        })
}



function getApi(cityName){
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&APPID=1e6eaae9d442e0e35ea4708556663762"
    fetch(url)
    .then(function(response){
        if(response.ok){
        return response.json()
        .then(function(data){
            var latitude = data.coord.lat;
            var longitude = data.coord.lon;
            console.log(latitude);
            var tempEl = $(".tempData");
            getInfo(data);
            getInfo5(latitude,longitude);
        
    })
    }
   


    });
}
function getInfo(data){
    console.log(data);
    console.log(data.main.temp);
    console.log(data.wind.speed);
    console.log(data.main.humidity);
    nameEl.text(data.name);
    tempEl.text(data.main.temp + " degC");
    windEl.text(data.wind.speed + " MPH");
    humidityEl.text(data.main.humidity);
    uvIndexEl.text(" not found");



}

function getInfo5(latitude,longitude){

    var url2 = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&units=metric&APPID=1e6eaae9d442e0e35ea4708556663762";
   
        fetch(url2)
        .then(function(res){
            return res.json()
           .then(function(data){
            console.log(data);

            console.log(data.list[0].main.temp);
            console.log(data.list[0].wind.speed);
            console.log(data.list[0].main.humidity);
        
        
        for (var i = 0; i < 5; i++ ){
       
            var li = $("<p>");
            li.text("Temp: " + data.list[i].main.temp + "degC");
            li.addClass("card-data");

            dayData[i].append(li);

            var li2 = $("<p>");
            li2.text("Wind speed: " + data.list[i].wind.speed + "MPH");
            li2.addClass("card-data");

            dayData[i].append(li2);

            var li3 = $("<p>");
            li3.text("Humidity: " + data.list[i].main.humidity);
            li3.addClass("card-data");

            dayData[i].append(li3);

        }        
        })
    })
    }
