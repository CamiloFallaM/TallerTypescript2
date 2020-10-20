import { Course } from './course.js';
import { dataCourses } from './dataCourses.js';
import { Student } from './student.js';
import { dataStudent } from './dataStudent.js';

let coursesTbody: HTMLElement = document.getElementById('courses')!;
let totalCreditos: HTMLElement = document.getElementById('creditos')!;
let infoEstBody: HTMLElement = document.getElementById('infoEst')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const btnfilterByCredits: HTMLElement = document.getElementById("button-filterByCredits")!;
const inputSearchBoxCreditsMax: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box-cred-max")!;
const inputSearchBoxCreditsMin: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box-cred-min")!;


btnfilterByName.onclick = () => applyFilterByName();

btnfilterByCredits.onclick = () => applyFilterByCredits();

renderInfoStudent(dataStudent);

renderCoursesInTable(dataCourses);

renderCreditos();

function renderInfoStudent(student: Student):void {
  console.log('Desplegando info del estudiante');
  let trElement = document.createElement("tr");
  trElement.innerHTML = `<td>Código</td>
                         <td>${student.codigo}</td>`;
  infoEstBody.appendChild(trElement);
  trElement = document.createElement("tr");
  trElement.innerHTML = `<td>Cédula</td>
                         <td>${student.cedula}</td>`;
  infoEstBody.appendChild(trElement);
  trElement = document.createElement("tr");
  trElement.innerHTML = `<td>Edad</td>
                         <td>${student.edad}</td>`;
  infoEstBody.appendChild(trElement);
  trElement = document.createElement("tr");
  trElement.innerHTML = `<td>Dirección</td>
                         <td>${student.direccion}</td>`;
  infoEstBody.appendChild(trElement);
  trElement = document.createElement("tr");
  trElement.innerHTML = `<td>Telefono</td>
                         <td>${student.telefono}</td>`;
  infoEstBody.appendChild(trElement);
}

function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}
 
function renderCreditos()
{
    let numCreditos:number = getTotalCredits(dataCourses);
    totalCreditos.innerText = "Número total del creditos: " + numCreditos ;
}
 

function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function applyFilterByCredits() { 
  let max = Number(inputSearchBoxCreditsMax.value);
  let min = Number(inputSearchBoxCreditsMin.value);
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByCredits(min, max, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}

function searchCourseByCredits(min: number,max: number,  courses: Course[]) {
  let resp: Course[] = [];
  courses.forEach((course) => {
    if(course.credits>=min && course.credits<=max)
    {
      resp.push(course);
    }
  });
  return resp;
}

function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }
}