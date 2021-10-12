const inquirer = require('inquirer');
const util = require("util");
const cTable = require('console.table');
const mysql = require('mysql2');
const echo = require('node-echo');

var express = require('express');  
var app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

////////////////////////////////////////////////////////////////
////////////Dependencies////////////////////////////////////////
////////////////////////////////////////////////////////////////

//Yoinked from another similar github, cool effect ! https://github.com/karur0su/Employee-Management-System/blob/master/app.js
echo ("                                                                                                                                                                             ");
echo ("                                                                                                                                                                             ");
echo (":::::::::: ::::    ::::  :::::::::  :::        ::::::::  :::   ::: :::::::::: ::::::::::      ::::::::::: :::::::::      :::      ::::::::  :::    ::: :::::::::: :::::::::  ");
echo (":+:        +:+:+: :+:+:+ :+:    :+: :+:       :+:    :+: :+:   :+: :+:        :+:                 :+:     :+:    :+:   :+: :+:   :+:    :+: :+:   :+:  :+:        :+:    :+: ");
echo ("+:+        +:+ +:+:+ +:+ +:+    +:+ +:+       +:+    +:+  +:+ +:+  +:+        +:+                 +:+     +:+    +:+  +:+   +:+  +:+        +:+  +:+   +:+        +:+    +:+ ");
echo ("+#++:++#   +#+  +:+  +#+ +#++:++#+  +#+       +#+    +:+   +#++:   +#++:++#   +#++:++#            +#+     +#++:++#:  +#++:++#++: +#+        +#++:++    +#++:++#   +#++:++#:  ");
echo ("+#+        +#+       +#+ +#+        +#+       +#+    +#+    +#+    +#+        +#+                 +#+     +#+    +#+ +#+     +#+ +#+        +#+  +#+   +#+        +#+    +#+ ");
echo ("#+#        #+#       #+# #+#        #+#       #+#    #+#    #+#    #+#        #+#                 #+#     #+#    #+# #+#     #+# #+#    #+# #+#   #+#  #+#        #+#    #+# ");
echo ("########## ###       ### ###        ########## ########     ###    ########## ##########          ###     ###    ### ###     ###  ########  ###    ### ########## ###    ### ");
echo ("                                                                                                                                                                             ");
echo ("                                                                                                                                                                     ver 1.0 ");

//Normal SQL connection until I figure out env files
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'Ganbatte23!',
    database: 'employee_management'
  },
  console.log(`Connected to the employee_management database.`)
);

//Upon connection calls the inquirer prompt function, kicking things off.
db.connect((err) => {
  if (err) throw err;
  start();
}); 

function start (){
    inquirer.prompt([
        {
          type: 'list',
          message: 'What would you like to do?',
          name: 'optionsList',
          choices: ["View all Employees", "View All Roles", "View All Departments", "Add a new department", "Add a new role", "Add a new Employee", "Quit"],
          name:"choice" //cleans up the output
        }

      ])        
        .then((res) => {
          console.log(res.choice); //shows output of res

          switch(res.choice){

            case "View all Employees":
            employeeView();
            break;

            case "View All Roles":
            roleView()
            break;

            case "View All Departments":
            departmentView()
            break;

            case "Add a new department":
            addDepartment()
            break;

            case "Add a new role":
            addRole()
            break;

            case "Add a new Employee":
            addEmployee()
            break;

            case "Quit":
            db.end();
            console.log("Bye!")
            break;
          }

          })}




///////////////////////////////////
//////Functions below/////////////
/////////////////////////////////


//viewing functions
   const employeeView =  () => {
    db.query("SELECT employee.first_name, employee.last_name, employee.manager_id, roles.title, roles.salary, department.dep_name AS department FROM employee LEFT JOIN roles ON employee.role_id = roles.id LEFT JOIN department ON roles.department_id = department.id", (err, res) =>  {
      if (err) throw err;
      console.table(res)
      start()
    });
  } 

  const roleView =  () => {
    db.query("SELECT roles.id, roles.title,  department.dep_name AS department, roles.salary FROM roles LEFT JOIN department ON roles.department_id = department.id", (err, res) =>  {
      if (err) throw err;
      console.table(res)
      start()
    });
  } 

  const departmentView =  () => {
    db.query("SELECT department.id, department.dep_name AS department FROM department", (err, res) =>  {
      if (err) throw err;
      console.table(res)
      start()
    });
  } 


// Adding functions

  const addDepartment = () => {
    inquirer.prompt({
        name: "addDepartment",
        type: "input",
        message: "What is the name of the department?"
      }) 
    .then((answer) => {

      let department = answer.addDepartment

      let sql = "INSERT INTO department (dep_name) VALUES (?)"

      db.query(sql, department, (err, res) => {
        if (err) throw err;
        console.log(`${department} successfully added to departments!`)
        start()}
        )
      })}


      const addRole = () => {
        inquirer.prompt([
          
          {
            name: "addRoleName",
            type: "input",
            message: "What is the new role's name?"
          },

          {
            name: "roleSalary",
            type: "input",
            message: "What is the new role's salary?",
            validate: numInput => {
              if(isNaN(numInput)){
                console.log("Please enter a valid salary amount!")
                return false
              }
              else{
                return true}}
          },    

          {
            name: "depNum",
            type: "input",
            message: "Please input a valid department ID number #",
            validate: numInput => {
              if(isNaN(numInput)){
                console.log("Please enter a valid department ID amount! (View all departments for valid numbers)")
                return false
              }
              else{
                return true}}
          },           
        
        ]) 
        .then((answer) => {
          let roleName = answer.addRoleName;
          let roleSalary = answer.roleSalary;
          let depNum = answer.depNum;

          console.log(roleName, roleSalary, depNum)
          let sql = `INSERT INTO roles (title, salary, department_id) VALUES ('${roleName}', ${roleSalary}, ${depNum})`

          db.query(sql, (err, res) => {
            if (err) throw err;
            console.log(`New role successfully added to the database!`)
            start()
            })

          })}      



  const addEmployee = () => {
    inquirer.prompt([
      
      {
      type: "input",
      message: "What is the new employee's first name?",
      name: "first_name"
  },

  {
      type: "input",
      message: "What is the new employee's last name?",
      name: "last_name"
},

{
  type: "input",
  message: "What is the new employee's role ID?",
  name: "role",
  validate: numInput => {
    if(isNaN(numInput)){
      console.log("Please enter a valid role number! (Usually between 1-4)")
      return false
    }
    else{
      return true

    }

  }
},

{
  type: "input",
  message: "Please enter their manager's ID #",
  name: "manager",
  validate: numInput => {
    if(isNaN(numInput)){
      console.log("Please enter a valid manager ID number!")
      return false
    }
    else{
      return true

    }

  }
}])
.then((answers)=> {
let firstName = answers.first_name
let lastName = answers.last_name
let newRole = answers.role 
let newManager = answers.manager

console.log(firstName,lastName,newRole,newManager)

let sql1 = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${firstName}', '${lastName}', ${newRole}, ${newManager})`

db.query(sql1, (err, res) => {
  if (err) throw err;
  console.log(`New employee successfully added to the database!`)
  start()
  })


})

}