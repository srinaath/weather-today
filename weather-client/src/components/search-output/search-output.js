import React from 'react';
import get from 'lodash.get';
import constants from '../../util/js/url-constants';

import './search-output.css';

function SearchOutput({searchResults}) {
    let cityState;
    let succesiveDaysWeather = [];

    if(searchResults) {
        cityState = `${searchResults.title}, ${searchResults.parent.title}`;
        console.log(searchResults);
        searchResults.consolidated_weather.forEach((dayResult) => {
            const obj = {
                minTemperature: get(dayResult, 'min_temp', 0),
                maxTemperature: get(dayResult, 'max_temp', 0),
                currentTemperature: get(dayResult, 'the_temp', 0),
                weatherState: constants.weatherStateAbbr[get(dayResult, 'weather_state_abbr', 'c')],
                day: constants.days[new Date(dayResult['applicable_date']).getDay()],
                windSpeed: get(dayResult, 'wind_speed', 0),
                windDirection: get(dayResult, 'wind_direction_compass', 'NE')
            };
            succesiveDaysWeather.push(obj);
        });
    }
    let searchBody;

    if (searchResults) {
       searchBody =
       <div className="search-output">
         <div className="background">
            <div class="card-1">
                <h1> {cityState} </h1>
                <h2> {succesiveDaysWeather[0].currentTemperature} </h2>
                <ul>
                    <li>
                        <img src={`img/${succesiveDaysWeather[0].weatherState.imgValue}`} alt={succesiveDaysWeather[0].weatherState.imgName}/>
                    </li>
                    <li id="clear"> {succesiveDaysWeather[0].weatherState.name}</li>
                    <li id="mph"> {succesiveDaysWeather[0].windSpeed} </li>
                    <li id="mph"> {succesiveDaysWeather[0].windDirection} </li>
                </ul>

                <div class="line1"> </div>
                <div class="line2"> </div>
                <div class="line3"> </div>

                <div class="tuesday">
                    <div class="day-tues"> {succesiveDaysWeather[1].day} </div>

                </div>
                <div class="wednesday">
                    <div class="day-wed"> {succesiveDaysWeather[2].day} </div>
                </div>
                <div class="thursday">
                    <div class="day-thurs"> {succesiveDaysWeather[3].day} </div>
                </div>
                <div class="friday">
                    <div class="day-fri"> {succesiveDaysWeather[4].day} </div>
                </div>
                <ul class="lows">
                    <li id="high2"> {succesiveDaysWeather[1].minTemperature}</li>
                    <li id="high"> {succesiveDaysWeather[2].minTemperature} </li>
                    <li id="high"> {succesiveDaysWeather[3].minTemperature} </li>
                    <li id="high3"> {succesiveDaysWeather[4].minTemperature} </li>
                </ul>

                <ul class="highs">
                    <li id="high2"> {succesiveDaysWeather[1].maxTemperature}</li>
                    <li id="high"> {succesiveDaysWeather[2].maxTemperature} </li>
                    <li id="high"> {succesiveDaysWeather[3].maxTemperature} </li>
                    <li id="high3"> {succesiveDaysWeather[4].maxTemperature} </li>
                </ul>
            </div>
        </div>
    </div>
   } else {
       searchBody = <div> </div>;
   }
    return (
        <div>
            {searchBody}
        </div>
    );
}

export default SearchOutput;
