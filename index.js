const inquirer = require('inquirer');
const util = require("util");


function prompts (){
    return inquirer.prompt([
        {
          type: 'list',
          message: 'What would you like to do?',
          name: 'optionsList',
          choices: ["View all Employees", "View All Roles", "View All Departments"]
        }

        ])}