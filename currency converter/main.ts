#! /usr/bin/env node
// Importing inquirer and chalk modules
import inquirer from "inquirer";
import chalk from "chalk";

// Print separator line with yellow color
console.log(
  chalk.yellow(
    "<<<=========================================================================>>>"
  )
);
// Print welcome message with blueBright color
console.log(
  chalk.yellow(
    "<<<============= ",
    chalk.blueBright("Welcome to code-with-ashu Currency_Converter "),
    "=============>>>"
  )
);
// Print closing separator line with yellow color
console.log(
  chalk.yellow(
    "<<<===========================================================================>>>"
  )
);

// Currency converter API link
let apiLink =
  "https://v6.exchangerate-api.com/v6/0ff928b65ee37afb77688a86/latest/PKR";

// Fetching data from the API
let fetchData = async (data: any) => {
  let dataFetch = await fetch(data);
  let formatData = await dataFetch.json();
  return formatData.conversion_rates;
};
let data = await fetchData(apiLink);

// Converting the fetched data to an array of country codes
let countries = Object.keys(data);
// Styling the country choices using chalk
let styledCountries = countries.map((country) =>
  chalk.blueBright.bold(country)
);
// Prompting user to select the currency they want to convert from
let convertFrom = await inquirer.prompt({
  name: "from",
  type: "list",
  message: chalk.green.italic("Select from currency:"),
  choices: countries,
});
console.log(
  chalk.yellow.italic(
    `Converting from ${chalk.blackBright.italic.bold(convertFrom.from)}`
  )
);

// Prompting user to enter the amount to be converted
let convertAmount = await inquirer.prompt([
  {
    name: "amount",
    type: "number",
    message: chalk.green.italic(
      `Enter the amount in ${chalk.blackBright.italic.bold(convertFrom.from)}:`
    ),
  },
]);

// Prompting user to select the currency they want to convert to
let convertTo = await inquirer.prompt({
  name: "to",
  type: "list",
  message: chalk.green.italic("Select to currency"),
  choices: countries,
});

// Constructing the URL for fetching the conversion rate between selected currencies
let conversionRate = `https://v6.exchangerate-api.com/v6/0ff928b65ee37afb77688a86/pair/${convertFrom.from}/${convertTo.to}`;

// Fetching the conversion rate
let fetchRate = async (data: any) => {
  let rate = await fetch(data);
  let format = await rate.json();
  return format.conversion_rate;
};
let rateData = await fetchRate(conversionRate);

// Displaying the conversion details to the user
console.log(
  chalk.greenBright.italic(
    `You are converting from ${chalk.blueBright.bold.italic(
      convertFrom.from
    )} to ${chalk.blueBright.bold.italic(
      convertTo.to
    )}. Amount: ${chalk.blueBright.bold.italic(
      convertAmount.amount
    )}. ${chalk.blueBright.bold.italic(
      convertFrom.from
    )} at a conversion rate of ${chalk.blueBright.bold.italic(rateData)}.`
  )
);
