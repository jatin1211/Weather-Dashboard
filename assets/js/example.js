clickEl = $(".click-me");
historyEl = $(".history");
var tempEl = $(".tempData");
var windEl = $(".windData");
var humidityEl = $(".humidityData");
var uvIndexEl = $(".uvData"); 
var nameEl = $(".name");

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
        //var currentId = li.attr("id",cityName);
        li.addClass("city-history");
        li.text(cityName);
        historyEl.append(li);



        $("#cityName").on('click',function(){
            console.log("click");
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
    // .then(function(data){
    //     var tempEl = $(".tempData");

        //getInfo(data);
        // console.log(data);
        // console.log(data.main.temp);
        // console.log(data.wind.speed);
        // console.log(data.main.humidity);
        // nameEl.text(data.name);
        // tempEl.text(data.main.temp + " degC");
        // windEl.text(data.wind.speed + " MPH");
        // humidityEl.text(data.main.humidity);
        // uvIndexEl.text(" not found");


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

    var url2 = "api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&units=metric&APPID=1e6eaae9d442e0e35ea4708556663762";
    fetch(url2).then(function(response){
        
        return response.json()})
        .then(function(data){

            console.log(data.main.temp);
            console.log(data.wind.speed);
            console.log(data.main.humidity);

                       
            //var tempEl = $(".tempData");
            //getInfo(data);
            //getInfo5(latitude,longitude)

       
        })
    }
