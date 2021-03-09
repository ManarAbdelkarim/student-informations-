'use strict';
const form = document.getElementsByTagName('form')[0];
let studentEmail = document.getElementById('studentEmail');
let studentNumber = document.getElementById('studentNumber');
let studentTuition = document.getElementById('studentTuition');
let submit = document.getElementById('submit');
let studentTable = document.getElementById('studentTable');
let table = document.createElement('table');
let trEl = document.createElement('tr');
let h2El = document.createElement('h2');


function createTableHeader (){
  let thEl = document.createElement('th');
  table = document.createElement('table');
  studentTable.appendChild(table);
  trEl = document.createElement('tr');
  table.appendChild(trEl);

  thEl = document.createElement('th');
  trEl.appendChild(thEl);
  thEl.textContent = 'ID';

  thEl = document.createElement('th');
  trEl.appendChild(thEl);
  thEl.textContent = 'Name';

  thEl = document.createElement('th');
  trEl.appendChild(thEl);
  thEl.textContent = 'Email';

  thEl = document.createElement('th');
  trEl.appendChild(thEl);
  thEl.textContent = 'Mobile';

  thEl = document.createElement('th');
  trEl.appendChild(thEl);
  thEl.textContent = 'Age';

  thEl = document.createElement('th');
  trEl.appendChild(thEl);
  thEl.textContent = 'Tuition';



}
createTableHeader();



class Student{
  constructor(stdName, stdEmail,stdMobile, stdAge, fee){
    this.stdName = stdName;
    this.stdEmail =stdEmail;
    this.stdMobile = stdMobile;
    this.stdAge = stdAge;
    this.fee = fee;
  }
}

Student.all =[];
let student= new Student();


function retrieveOldData (){
  if ( localStorage.getItem('StoredStudents')!== null) {
    let oldData = JSON.parse( localStorage.getItem('StoredStudents'));
    for (let i = 0; i < oldData.length; i++) {
      Student.all.push(oldData[i]);

    }
    render();
  }
}
retrieveOldData();

Student.prototype.generateName = function (){
  this.stdEmail = studentEmail.value;
  this.stdName = this.stdEmail.split('@')[0];
};

Student.prototype.saveData = function (){
  this.fee = studentTuition.value;
  this.stdMobile = studentNumber.value.toString();
  Student.all.push(new Student (this.stdName , this.stdEmail , this.stdMobile ,this.stdAge , this.fee));
  saveLocal();
};

Student.prototype.generateAge = function (){
  this.stdAge = Math.floor(Math.random() * 24) + 18 ;
};

function saveLocal (){

  localStorage.setItem('StoredStudents',JSON.stringify(Student.all));
}



function clearTable (){

  while(table.rows.length >1){
    table.removeChild(table.lastChild);
  }

  studentTable.removeChild(h2El);

}

function calculateTotal(){

  let total =0;
  for (let i = 0; i < Student.all.length; i++) {
    total += parseInt(Student.all[i].fee);

  }
  return total;
}


function render (){

  let tdEl = document.createElement('td');
  for (let i = 0; i < Student.all.length; i++) {
    trEl = document.createElement('tr');
    table.appendChild(trEl);

    tdEl = document.createElement('td');
    trEl.appendChild(tdEl);
    tdEl.textContent = i;


    tdEl = document.createElement('td');
    trEl.appendChild(tdEl);
    tdEl.textContent = Student.all[i].stdName;

    tdEl = document.createElement('td');
    trEl.appendChild(tdEl);
    tdEl.textContent = Student.all[i].stdEmail;

    tdEl = document.createElement('td');
    trEl.appendChild(tdEl);
    tdEl.textContent = Student.all[i].stdMobile;

    tdEl = document.createElement('td');
    trEl.appendChild(tdEl);
    tdEl.textContent = Student.all[i].stdAge;


    tdEl = document.createElement('td');
    trEl.appendChild(tdEl);
    tdEl.textContent = Student.all[i].fee;





  }
  h2El = document.createElement('h2');
  studentTable.appendChild(h2El);
  h2El.textContent =`Total= ${calculateTotal()}` ;

}
submit.addEventListener('click',eventHandel);
function eventHandel(event){

  event.preventDefault();
  clearTable();
  student.generateName();
  student.generateAge();
  student.saveData();
  form.reset();
  render();

}
