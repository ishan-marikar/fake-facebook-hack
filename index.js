const inquirer = require("inquirer");
const chalk = require("chalk");
const ascii = require("ascii-art");
const ora = require("ora");
const async = require("async");
const facebook = require("facebook-chat-api");

inquirer.registerPrompt(
  "autocomplete",
  require("inquirer-autocomplete-prompt")
);

let API;

const initialize = done => {
  ascii.font("FB-HACK", "Doom", header => {
    console.log(chalk.bold.green(header.trim()));
    // Obviously fake handle and version number
    console.log(chalk.gray("-- DeirkSeid\t\t\t\t\tv1.0\n"));
    return done(null, true);
  });
};

const checkIfConnectedToInternet = (data, done) => {};

const getExploits = (data, done) => {
  const spinner = ora("Looking for known exploits.").start();
  setTimeout(() => {
    spinner.stop();
    return done(null, [
      "CVE-2014-9524 (more likely to work)",
      "CVE-2008-0660 (last resort)"
    ]);
  }, 1000);
};

const getCredentials = (data, done) => {
  let validateInput = value => {
    if (!value) {
      return "This is a required step.";
    } else if (value.trim().length <= 5) {
      return "Not long enough.";
    } else {
      return true;
    }
  };

  const questions = [
    {
      type: "list",
      name: "method",
      message: "Which exploit do you want to use?",
      choices: data
    },
    {
      type: "input",
      name: "skiddieUsername",
      message:
        "What is your username/email? (this exploit requires authentication)",
      validate: validateInput
    },
    {
      type: "password",
      name: "skiddiePassword",
      message: "What is your password? (this exploit requires authentication)",
      validate: validateInput
    }
  ];
  inquirer.prompt(questions).then(answers => {
    done(null, answers);
  });
};

const facebookLogin = (data, done) => {
  console.log("DEBUG:", data);
  const spinner = ora("Connecting to facebook.com ...").start();
  facebook(
    {
      email: data.skiddieUsername,
      password: data.skiddiePassword
    },
    {
      logLevel: "silent"
    },
    (error, api) => {
      if (error) {
        spinner.stop();
        console.log(chalk.red("CRITICAL ERROR:", error.error));
        process.exit(1);
      }
      API = api;
      spinner.stop();
      return done(null);
    }
  );
};

const getFriends = (data, done) => {
  if (typeof API === "undefined") {
    console.log(chalk.red("CRITICAL ERROR:", "Authentication Issue"));
  }
  const spinner = ora("Getting profile of friends..").start();
  API.getFriendsList((error, friends) => {
    if (error) console.log(chalk.red("CRITICAL ERROR:", error));
    if (!friends || friends.length === 0) {
      console.log(chalk.red("CRITICAL ERROR:", "Unable to fetch friend list."));
    }
    let validFriends = friends.filter(friend => {
      return friend.userID !== "0";
    });

    // TODO: Get list of friends and have a list/dropdown/fuzzy-search to choose
    // friend to "hack" from.
  });
};

async.waterfall([
  initialize,
  getExploits,
  getCredentials,
  facebookLogin,
  getFriends
]);
