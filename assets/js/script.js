
clickEl = $(".click-me");
cityName = "toronto";

var cityName = $(".city").val();


clickEl.on('click',function(){
    var cityName = $(".city").val();
    console.log(cityName);
    console.log("click");

    var url = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&APPID=1e6eaae9d442e0e35ea4708556663762"
    fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);

   
})
})

// function getApi(){
//     var url = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&APPID=1e6eaae9d442e0e35ea4708556663762"
//     fetch(url)
//     .then(function(response){
//         return response.json();
//     })
//     .then(function(data){
//         console.log(data);

//     })

// }









