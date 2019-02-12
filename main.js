/**
 * OpenCage API Client Demo + InquirerJS
 * 
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
    message: "What's your address?"
  },
];

/*
 * Return all command inputs to check / verify.
 * 
 */
inquirer.prompt(questions).then(answers => {
  console.log('\nYour Details:');
  // return all answers
  console.log(JSON.stringify(answers, null, '  '));
  // run opencage and parse address entered
  opencage.geocode({q: answers.address }).then(data => {
    // remove other data, not necessary
    // console.log(JSON.stringify(data));
    if (data.status.code == 200) {
      if (data.results.length > 0) {
        var place = data.results[0];
        // formatted string of address input, pretty nice and with best guess?
        console.log(place.formatted);
        // returns latitute and longtitude
        console.log(place.geometry);
        // returns the timezone name, e.g. Australia/Melbourne
        console.log(place.annotations.timezone.name);
      }
    } else if (data.status.code == 402) {
      // i'm on free account, lol so all good?
      console.log('hit free-trial daily limit');
      console.log('become a customer: https://opencagedata.com/pricing'); 
    } else {
      // other possible response codes:
      // https://opencagedata.com/api#codes
      console.log('error', data.status.message);
    }
  }).catch(error => {
    console.log('error', error.message);
  });
});