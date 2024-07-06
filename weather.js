#!/usr/bin/env node

import { getArgs } from "./helpers/args.js";
import { getWeather } from "./services/api.js";
import { printHelp, printError, printSuccess } from "./services/logService.js";
import { saveKeyValue, TOKEN_DICTIONARY } from "./services/storage.js";

const saveToken = async (token) => {
   if (!token.length) {
      printError('не передан token')
      return
   }

   try {
      await saveKeyValue(TOKEN_DICTIONARY.token, token)
      printSuccess('токен сохранён')
   } catch (e) {
      printError(e.message)
   }
}

const initCLI = () => {
   const args = getArgs(process.argv)

   if (args.h) printHelp()
   if (args.s) {
   }
   if (args.t) {
      saveToken(args.t)
   }

   getWeather('London')
}

initCLI()