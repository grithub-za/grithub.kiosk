import axios from 'axios'
import { 
    hubs, 
    accuweather_daily_url, 
    accuweather_hourly_url, 
    accuweather_location 
} from '../lib/constants';


// const openWeather = {
//     lat: hubs.george.lat,
//     lon: hubs.george.lon,
//     appid: open_weather_api_key,
//     units: "metric",
//     cnt: 5,
//     exclude: "minutely,hourly,alerts"
// };

const accuweather = {
    apikey: process.env.REACT_APP_ACCUWEATHER_API_KEY,
    language: "en-gb",
    details: false,
    metric: true
};


export async function getCurrentForecast(){
    console.log(accuweather)
    return await axios({
        method: "GET",
        baseURL: accuweather_hourly_url + accuweather_location,
        params: accuweather
    })
    .then(res => {
        console.log(res.data)
        return res.data[0]
    })
    .catch(err => {
        console.log(err)
    })
}


export async function getForecast(){
    return await axios({
        method: "GET",
        baseURL: accuweather_daily_url +"/"+ accuweather_location,
        params: accuweather
    })
    .then(res =>res.data)
    .catch(err => {
        console.log(err)
    })
}