import { getKeyValue, TOKEN_DICTIONARY } from './storage.js'
import axios from 'axios'

export const getIcon = (icon) => {
   switch (icon.slice(0, -1)) {
      case '01':
         return '☀️';
      case '02':
         return '🌤️';
      case '03':
         return '☁️';
      case '04':
         return '☁️';
      case '09':
         return '🌧️';
      case '10':
         return '🌦️';
      case '11':
         return '🌩️';
      case '13':
         return '❄️';
      case '50':
         return '🌫️';
   }
};

const getCoordinates = async (city, token) => {

   const { data: coord } = await axios('https://api.openweathermap.org/geo/1.0/direct', {
      params: {
         q: city,
         appid: token
      }
   })

   if (!coord.length) {
      throw new Error('неверно указан город')
   }

   return {
      lat: coord[0].lat,
      lon: coord[0].lon
   }
}

export const getWeather = async () => {
   const token = process.env.TOKEN ?? await getKeyValue(TOKEN_DICTIONARY.token)
   const city = await getKeyValue(TOKEN_DICTIONARY.city)

   if (token === true || !token) {
      throw new Error('Не задан ключ API, задайте его через команду -t [API_KEY]')
   }

   if (city === true || !city) {
      throw new Error('Не задан город, задайте его через команду -s [CITY] ')
   }

   const coord = await getCoordinates(city, token)


   const { data: weather } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
         lat: coord.lat,
         lon: coord.lon,
         appid: token
      }
   })

   return weather
}