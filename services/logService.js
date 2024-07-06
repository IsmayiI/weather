
import chalk from 'chalk'

export const printError = (err) => {
   console.log(`${chalk.bgRed('ERROR')} ${err}`);
}

export const printSuccess = (mes) => {
   console.log(`${chalk.bgYellow('SUCCESS')} ${mes}`);
}

export const printHelp = () => {
   console.log(
      `${chalk.bgCyan('HELP')}
      без параметров - вывод погоды
      -s [CITY] для установки города
      -h для вывода помощи
      -t [API_KEY] для сохранения токена
      `
   );
}

