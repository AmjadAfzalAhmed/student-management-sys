import inquirer from "inquirer";
import chalk from "chalk";

let studentIDCounter = 1;

function generateStudentID() {
  const prefix = "STU";
  const studentID = prefix + studentIDCounter.toString().padStart(4, "0");
  studentIDCounter++;
  return studentID;
}



const studentDataBase: any = [];

async function addStudent() {
  let answers = await inquirer.prompt([
    { type: "input", name: "name", message: "Enter student name:" },
    { type: "number", name: "age", message: "Enter student age:" },
    { type: "input", name: "fName", message: "Enter father name:" },
    {
        name: 'enrol',
        type: 'list',
        message: 'Select the course You wish to enrol the student in:',
        choices: ['Typescript', 'Python', 'ReactJS', 'TailwindCss']
      }
    
  ]);
  let courseFee = 0;
  if(answers.enrol === 'Typescript'){
    courseFee = 5000;
     
  }else if(answers.enrol === 'Python'){
    courseFee = 10000;
  }else if(answers.enrol === 'ReactJS'){
    courseFee = 8000;
  }else if(answers.enrol === 'TailwindCss'){
    courseFee = 6000;
  }else{
    
  }

  let isFeePaid = await inquirer.prompt(
    {
        name: 'feePayment',
        type: 'confirm'
    }
  )
let confirmation = isFeePaid.feePayment
if (confirmation == true){
    confirmation = 'O.K'
}else if(confirmation == false){
    confirmation = 'Fees is yet to be paid'
}

  const studentID = generateStudentID();
  studentDataBase.push({
    Name: answers.name,
    Age: answers.age,
    FName: answers.fName,
    // Class: answers.class,
    Course: answers.enrol,
    UniqueId: studentID,
    Fee: courseFee,
    FeeStatus: confirmation
  });
}
console.log(
  chalk.blueBright.bold(
    "\n---***---Welcome to the student management system!---***---\n"
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
        "\n---***---Thanx for using Student Management System---***---\n"
      )
    );
    console.log(
      chalk.blueBright.bold(
        "\n*-*-*-* Status *-*-*-*\n"
      )
    );
    console.log(studentDataBase);
    break;
  }
}
