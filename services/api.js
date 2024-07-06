import { getKeyValue, TOKEN_DICTIONARY } from './storage.js'
import axios from 'axios'

const getCoordinates = async (city, token) => {

   const { data: coord } = await axios('https://api.openweathermap.org/geo/1.0/direct', {
      params: {
         q: city,
         appid: token
      }
   })

   return {
      lat: coord[0].lat,
      lon: coord[0].lon
   }
}

export const getWeather = async (city) => {
   const token = await getKeyValue(TOKEN_DICTIONARY.token)
   if (!token) {
      throw new Error('Не задан ключ API, задайте его через команду -t [API_KEY]')
   }

   const coord = await getCoordinates(city, token)

   const { data: weather } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
         lat: coord.lat,
         lon: coord.lon,
         appid: token
      }
   })

   console.log(weather);
}