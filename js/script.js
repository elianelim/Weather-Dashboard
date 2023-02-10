//countries
var countries = ["Atlanta", "Denver", "Seattle", "San Francisco", "Orlando", "New York", "Chicago", "Austin"]
//Api key
var APIKey = "822415cdef222fbb18ec1a2abbf9c0bc";

//Display cities
var outputCities = "";
for ( var i = 0; i < countries.length; i++)
{
    outputCities += `<button class="btn btn-secondary mb-3" type="submit" value='${countries[i]}' onclick="display(this.value)">${countries[i]}</button>`
    
}
document.getElementById("cities").innerHTML = outputCities

function search(){
    var searchCity = document.getElementById("city").value
    //console.log(searchCity)
    display(searchCity)
}

function display(city){
    
    var outputCity = ""
    var store = []
    var checkdates = []

    //url statement for today's weather
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;

    //fetch api
    axios.get(queryURL)
    .then(response => {

        //console.log(response.data.list)

        for ( var i = 0; i < response.data.list.length; i++)
        {   
            //api returns 5 days/ 3hours. 
            if (!checkdates.includes(response.data.list[i].dt_txt.substring(0,10))){

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
        
        //console.log(store)

        //Did not take into account of snow
        if (store[0].weather=="Sun"){
            var icon = '<i class="fa-solid fa-sun"></i>'
        }else if (store[0].weather=="Rain"){
            //if weather is rain, show rain icon
            var icon = '<i class="fa-solid fa-cloud-rain"></i>'
        }else{
            //rest show as cloudy icon
            var icon = '<i class="fa-solid fa-cloud"></i>'
        }

        outputCity += `
        <h2>
            ${city} (${store[0].date})
            ${icon}
        </h2>
        <span>
            Temp: ${store[0].temp} &#8457
            <br/><br/>
            Wind: ${store[0].wind} MPH
            <br/><br/>
            Humidity: ${store[0].humidity} %
        </span>
        `;

        document.getElementById("selectedCity").innerHTML = outputCity

        var forecasts = ""

        for ( var i = 1; i < store.length; i++){

            if (store[i].weather=="Sun"){
                var icon = '<i class="fa-solid fa-sun"></i>'
            }else if (store[i].weather=="Rain"){
                //if weather is rain, show rain icon
                var icon = '<i class="fa-solid fa-cloud-rain"></i>'
            }else{
                //rest show as cloudy icon
                var icon = '<i class="fa-solid fa-cloud"></i>'
            }

            forecasts += `
            <div id = "ind_card" class = "col p-2 m-2">
                <h4>
                    (${store[i].date})
                    <br/>
                    <br/>
                    ${icon}
                </h4>
                <span>
                    Temp: ${store[i].temp} &#8457
                    <br/><br/>
                    Wind: ${store[i].wind} MPH
                    <br/><br/>
                    Humidity: ${store[i].humidity} %
                </span>
            </div>
                `
        }

        document.getElementById("cards").innerHTML = forecasts

        document.getElementById("error").innerText = ""

    })
    .catch(error => {
        console.log(error.message)
        document.getElementById("error").innerText = "Invalid City"
    })

}

