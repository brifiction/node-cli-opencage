/**
 * OpenCage API Client Demo + InquirerJS
 * 
 * Goal: Output user answers at the end, asking user first & last name, email and address via CLI.
 * 
 * Issue(s): 
 *   1. Don't know how to boolean check for Promise(s) used with Javascript, for address check.
 *      This issue needs a fix.
 *      Also, difficult to validate the most 'fake' address.
 *      E.g. Fake Street is a real street on Earth. Lol.
 *   2. Initially wanted to try out stdout, unable to apply proper usage in this repo.
 * 
 * Command: Run in console / terminal => 'npm run dev'
 */

'use strict';
var inquirer = require('inquirer');

// Add OpenCage API CLient
const opencage = require('opencage-api-client');

// Nice greeting 
console.log('Hello! Welcome to the OpenCage CLI Test Application!');

// Define inquirer questions and validation (optional)
var questions = [
  {
    type: 'input',
    name: 'first name',
    message: "What's your first name?",
    validate: function(value) {
      var pass = value.match(
        /^[a-zA-Z]+$/i
      );
      if (pass) {
        return true;
      }

      return 'Please enter text only, thank you.';
    }
  },
  {
    type: 'input',
    name: 'last name',
    message: "What's your last name?",
    validate: function(value) {
      var pass = value.match(
        /^[a-zA-Z]+$/i
      );
      if (pass) {
        return true;
      }

      return 'Please enter text only, thank you.';
    }
  },
  {
    type: 'input',
    name: 'email',
    message: "What's your email address?",
    validate: function(value) {
      var pass = value.match(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i
      );
      if (pass) {
        return true;
      }

      return 'Please enter a valid email address, thank you.';
    }
  },
  {
    type: 'input',
    name: 'address',
    message: "What's your address?",
    validate: function (value) {
      // run opencage and parse address entered
      var verify = opencage.geocode({
        q: value
      }).then(data => {
        // remove other data, not necessary
        // console.log(JSON.stringify(data));
        if (data.status.code == 200) {
          if (data.results.length > 0) {
            var place = data.results[0];
            // formatted string of address input, pretty nice and with best guess?
            console.log('We found your address: ' + place.formatted);
            // returns latitute and longtitude
            // console.log(place.geometry);
            // returns the timezone name, e.g. Australia/Melbourne
            // console.log(place.annotations.timezone.name);
            return true;
          }
        } else {
          return false;
        }
      }).catch(error => {
        // console.log('error', error.message);
        return false;
      });

      if(verify) {
        return true;
      }

      return 'Try again.';
    }
  },
];

/*
 * Return all command inputs to check / verify.
 * 
 */
inquirer.prompt(questions).then(answers => {
  console.log('\nYour Details:');
  // return all answers
  console.log(answers);
});