var cityEl = document.getElementById("city");
var searchEl = document.getElementById("search-button");
var nameEl = document.getElementById("city-name");

var apikey="642e551a87642c26af1ed36c43bc2d55"


console.log("before fetch");

function weatherNow (city) {fetch("https://community-open-weather-map.p.rapidapi.com/forecast?units=imperial&q="+city , {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
		"x-rapidapi-key": "d48f2401e3mshd5dacb912301d27p15decfjsne89ecf9a2819"
	}
})
.then(function(response) { return Promise.resolve(response); })

.then(function (response) {return response.json();})

.then(function (data) {
    console.log("data", data);
    //update the ui here
    weatherToday(data);
    fiveDay(data);
    
    
})

.catch(err => {
    console.error(err);
});
}


$("#search-button").click(
    function(){
        $("#weather-today").attr("style","display: block!important");
        $("#five-day").attr("style","display: block!important");

        var city= $("#city").val()
        weatherNow(city)
    }
)

function weatherToday(data){
    $("#temperature").append(data.list[0].main.temp);
    $("#humidity").append(data.list[0].main.humidity)
    $("wind-speed").append(data.list[0].wind)
} 

function fiveDay(data){
    var [dayOne, dayTwo, dayThree, dayFour, dayFive] = data.list;
    updateFiveDayParam(".temperature","temp",data);
    updateFiveDayParam(".humidity","humidity",data);


}

function updateFiveDayParam(param,value,data) {
    var [dayOne, dayTwo, dayThree, dayFour, dayFive] = data.list;
    $( $("#five-day").find(param).get(0)).append(dayOne.main[value]);
    $( $("#five-day").find(param).get(1)).append(dayTwo.main[value]);
    $( $("#five-day").find(param).get(2)).append(dayThree.main[value]);
    $( $("#five-day").find(param).get(3)).append(dayFour.main[value]);
    $( $("#five-day").find(param).get(4)).append(dayFive.main[value]);
   
}




