$(document).ready(function(){
const APIKEY = "ff08eb5d4213f782c579bf4227c2f56d";

console.log("JS and Jquery working!")

$('#searchBtn').on('click', function(){
   var term = $('#searchTerm').val().trim();
   $.ajax({
       method: "GET",
       url: "https://api.openweathermap.org/data/2.5/weather?q="+term+"&appid="+APIKEY+"&units=imperial"
   }).then(function(data){
        console.log('yay', data);
        console.log(`temperature - ${data.main.temp}F`);
        console.log(`pressure - ${data.main.pressure/10}kPa`);
        console.log(`humidity - ${data.main.humidity}%`);
        console.log(`wind speed - ${data.wind.speed}mph`);
        $("#currentCity").append(`<div class="card" style="width: 18rem;">
        <img src="..." class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${data.main.temp}</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>`)
   }).catch(function(err){
       console.log(err)
   })
})
})
function makeList() {
  let listItem = $("<li>").addClass("list-group-item").text(city);
  $(".list").append(listItem);
}

function getCurrentConditions (response) {

  // get the temperature and convert to fahrenheit 
  let tempF = (response.main.temp - 273.15) * 1.80 + 32;
  tempF = Math.floor(tempF);

  $('#currentCity').empty();

  // get and set the content 
  const card = $("<div>").addClass("card");
  const cardBody = $("<div>").addClass("card-body");
  const city = $("<h4>").addClass("card-title").text(response.name);
  const cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
  const temperature = $("<p>").addClass("card-text current-temp").text("Temperature: " + tempF + " °F");
  const humidity = $("<p>").addClass("card-text current-humidity").text("Humidity: " + response.main.humidity + "%");
  const wind = $("<p>").addClass("card-text current-wind").text("Wind Speed: " + response.wind.speed + " MPH");
  const image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png")

  // add to page
  city.append(cityDate, image)
  cardBody.append(city, temperature, humidity, wind);
  card.append(cardBody);
  $("#currentCity").append(card)
 
}

function getCurrentForecast () {

$.ajax({
  url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + apiKey,
  method: "GET"
}).then(function (response){

  console.log(response)
  console.log(response.dt)
  $('#forecast').empty();

  
  let results = response.list;
  console.log(results)
  

  for (let i = 0; i < results.length; i++) {

    let day = Number(results[i].dt_txt.split('-')[2].split(' ')[0]);
    let hour = results[i].dt_txt.split('-')[2].split(' ')[1];
    console.log(day);
    console.log(hour);

    if(results[i].dt_txt.indexOf("12:00:00") !== -1){
      
      // get the temperature and convert to fahrenheit 
      let temp = (results[i].main.temp - 273.15) * 1.80 + 32;
      let tempF = Math.floor(temp);

      const card = $("<div>").addClass("card col-md-2 ml-4 bg-primary text-white");
      const cardBody = $("<div>").addClass("card-body p-3 forecastBody")
      const cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
      const temperature = $("<p>").addClass("card-text forecastTemp").text("Temperature: " + tempF + " °F");
      const humidity = $("<p>").addClass("card-text forecastHumidity").text("Humidity: " + results[i].main.humidity + "%");

      const image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + results[i].weather[0].icon + ".png")

      cardBody.append(cityDate, image, temperature, humidity);
      card.append(cardBody);
      $("#forecast").append(card);

    }
  }
});

}