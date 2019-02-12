// const opencage = require('opencage-api-client');

// opencage.geocode({q: 'Theresienhöhe 11, München'}).then(data => {
//   console.log(JSON.stringify(data));
//   if (data.status.code == 200) {
//     if (data.results.length > 0) {
//       var place = data.results[0];
//       console.log(place.formatted);
//       console.log(place.geometry);
//       console.log(place.annotations.timezone.name);
//     }
//   } else if (data.status.code == 402) {
//     console.log('hit free-trial daily limit');
//     console.log('become a customer: https://opencagedata.com/pricing'); 
//   } else {
//     // other possible response codes:
//     // https://opencagedata.com/api#codes
//     console.log('error', data.status.message);
//   }
// }).catch(error => {
//   console.log('error', error.message);
// });

/**
 * CLI Command Input + Validation with Inquirer.js
 * 
 */

'use strict';
var inquirer = require('inquirer');

console.log('Hello! Welcome to the OpenCage CLI Test Application!');

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
];

inquirer.prompt(questions).then(answers => {
  console.log('\nYour Details:');
  console.log(JSON.stringify(answers, null, '  '));
});