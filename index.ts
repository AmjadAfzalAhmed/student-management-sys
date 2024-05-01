#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

let studentIDCounter = 1;

function generateStudentID() {
  const prefix = "student";
  const studentID = prefix + studentIDCounter.toString().padStart(5, "0");
  studentIDCounter++;
  return studentID;
}



const studentDataBase: any = [];

async function addStudent() {
  let answers = await inquirer.prompt([
    { type: "input", name: "name", message: "Enter student name:" },
    { type: "input", name: "fName", message: "Enter father name:" },
    {
        name: 'enrol',
        type: 'list',
        message: 'Select the course You wish to enrol the student in:',
        choices: ['Typescript', 'Python', 'ReactJS', 'TailwindCss']
      }
    
  ]);
  let studentName = answers.name
  let fName = answers.fName
  let course = answers.enrol

  let courseFee = 0;
  if(answers.enrol === 'Typescript'){
    courseFee = 5000;
    console.log(chalk.yellow.italic(`\t\nThe course fee for Typescript is Rs. ${5000} To enrol in the selected course, you must pay the fee first!.\n`));
  }else if(answers.enrol === 'Python'){
    courseFee = 10000;
    console.log(chalk.greenBright.italic(`\t\nThe course fee for Python is Rs. ${10000} To enrol in the selected course, you must pay the fee first!.\n`));
  }else if(answers.enrol === 'ReactJS'){
    courseFee = 8000;
    console.log(chalk.blueBright.italic(`\t\nThe course fee for ReactJS is Rs. ${8000} To enrol in the selected course, you must pay the fee first!.\n`));
  }else if(answers.enrol === 'TailwindCss'){
    courseFee = 6000;
    console.log(chalk.redBright.italic(`\t\nThe course fee for TailwindCss is Rs. ${6000} To enrol in the selected course, you must pay the fee first!.\n`));
  }
    answers = await inquirer.prompt(
      {
        name:'paymentMethod',
        message: 'please select payment method below:',
        type: 'list',
        choices: ['Easy Paisa','JazzCash','Bank Transfer']
      },
    )
    while(answers.paymentMethod){
      answers = await inquirer.prompt(
        {
          name: 'payment',
          message: 'Enter the fee amount',
          type: 'input'
        }
      )
        const feePayment:any = parseFloat(answers.payment)

        if(feePayment === 5000){
          console.log('\t\nYou have successfully been enrolled in Typescript Course\n');
        }else if(feePayment ===10000){
          console.log('\t\nYou have successfully been enrolled in Python Course\n');
        }else if(feePayment === 8000){
          console.log('\t\nYou have successfully been enrolled in ReactJS Course\n')
        }else if(feePayment === 6000){
          console.log('\t\nYou have successfully been enrolled in TailwindCss course\n')
        }else{
         console.log('\t\nYou must clear the fee to be enrolled in Typescript Course\n')
       }
    

let confirmation = feePayment
if (confirmation === 5000 || 10000 ||8000 || 6000 ){
    confirmation = 'O.K'
}else {
    confirmation = 'Fees is yet to be paid'
}

  const studentID = generateStudentID();
  studentDataBase.push({
    Name: studentName,
    FName: fName,
    Course:course,
    UniqueId: studentID,
    FeePaid: courseFee,
    FeeStatus: confirmation
  });
}}
console.log(
  chalk.greenBright.bold(
    "\t\n---***---Welcome to the student management system!---***---\n"
  )
);
await addStudent();

while (true) {
  let addMore = await inquirer.prompt([
    {
      type: "list",
      name: "edit",
      message: "add more students?",
      choices: ["Yes", "No"],
    },
  ]);
  if (addMore.edit === "Yes") {
    await addStudent();
    console.log(studentDataBase);
  } else {
    console.log(
      chalk.yellowBright.bold(
        "\t\n---***---Thanx for using Student Management System---***---\n"
      )
    );
    console.log(
      chalk.blueBright.bold(
        "\n*-*-*-* Final Status *-*-*-*\n"
      )
    );
    console.log(studentDataBase);
    break;
  }
}
