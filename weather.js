#!/usr/bin/env node

import { getArgs } from "./helpers/args.js";
import { getIcon, getWeather } from "./services/api.js";
import { printHelp, printError, printSuccess, printWeather } from "./services/logService.js";
import { saveKeyValue, TOKEN_DICTIONARY } from "./services/storage.js";

const saveToken = async (token) => {
   try {
      await saveKeyValue(TOKEN_DICTIONARY.token, token)
      if (token?.length) printSuccess('токен сохранён')
   } catch (e) {
      printError(e.message)
   }
}


const saveCity = async (city) => {
   try {
      await saveKeyValue(TOKEN_DICTIONARY.city, city)
      if (city?.length) printSuccess('город сохранён')

   } catch (e) {
      printError(e.message)
   }

}

const getForcast = async () => {
   try {
      const weather = await getWeather()
      printWeather(weather, getIcon(weather.weather[0].icon))
   } catch (e) {
      if (e?.response?.status === 404) {
         printError('неверно указан город')
      }
      else if (e?.response?.status === 401) {
         printError('неверно указан токен')
      }
      else {
         'не понял'
         printError(e.message)
      }
   }
}

const initCLI = async () => {
   const args = getArgs(process.argv)

   if (args.h) return printHelp()

   if (args.s) await saveCity(args.s)

   if (args.t) await saveToken(args.t)


   await getForcast()
}

initCLI()