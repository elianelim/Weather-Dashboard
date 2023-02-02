//countries
var cities = ["Atlanta", "Denver", "seattle", "San Francisco", "Orlando", "New York", "Chicago", "Austin"]
//Assigning API key 
var APIKey = "822415cdef222fbb18ec1a2abbf9c0bc";

//display weather for cities
var outputCities = "";
for (var i = 0; i < cities.length; i++) {
    outputCities += `<button class="btn btn-secondary mb-3" type="submit" value='${cities[i]}' onclick="display(this.value)">${cities[i]}</button>`
}

document.getElementById("cities").innerHTML = outputCities

function search() {
    var searchCity = document.getElementById("city").value 
    //console.log(searchCity)
    display(searchCity)
}

function display(city) {
    var outputCity = ""
    var store = []
    var checkdates = []
}

    //URL statement for today's weather
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;

    //fetch API
    axios.get(queryURL)
    .then(response => {

        console.log(response.data.list)

        for (var i = 0; < response.data.list.length; i++) {

            //api returns 5 days/3 hours
            if (!checkdates.includes(response.data.list[i].dt_txt.substring(0,10))) {

                //change date
                let day = response.data.list[i].dt_txt.substring(5,7)
                let month = response.data.list[i].dt_txt.substring(8,10)
                let year = response.data.list[i].dt_txt.substring(0,4)

                let reformat_date = day + "/" + month + "/" + year

                var dict = {
                    date: reformat_date,
                    temp: response.data.list[i].main.temp,
                    wind: response.data.list[i].wind.speed,
                    humidity: response.data.list[i].main.humidity,
                    weather: response.data.list[i].weather[0].main
                }

                //store inside dictionary
                store.push(dict)
                //push into check dates array
                checkdates.push(response.data.list[i].dt_txt.substring(0,10))
            }
        }
    })

    // console.log(store)