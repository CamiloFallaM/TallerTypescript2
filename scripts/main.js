import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudent.js';
var coursesTbody = document.getElementById('courses');
var totalCreditos = document.getElementById('creditos');
var infoEstBody = document.getElementById('infoEst');
var btnfilterByName = document.getElementById("button-filterByName");
var inputSearchBox = document.getElementById("search-box");
var btnfilterByCredits = document.getElementById("button-filterByCredits");
var inputSearchBoxCreditsMax = document.getElementById("search-box-cred-max");
var inputSearchBoxCreditsMin = document.getElementById("search-box-cred-min");
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnfilterByCredits.onclick = function () { return applyFilterByCredits(); };
renderInfoStudent(dataStudent);
renderCoursesInTable(dataCourses);
renderCreditos();
function renderInfoStudent(student) {
    console.log('Desplegando info del estudiante');
    var trElement = document.createElement("tr");
    trElement.innerHTML = "<td>C\u00F3digo</td>\n                         <td>" + student.codigo + "</td>";
    infoEstBody.appendChild(trElement);
    trElement = document.createElement("tr");
    trElement.innerHTML = "<td>C\u00E9dula</td>\n                         <td>" + student.cedula + "</td>";
    infoEstBody.appendChild(trElement);
    trElement = document.createElement("tr");
    trElement.innerHTML = "<td>Edad</td>\n                         <td>" + student.edad + "</td>";
    infoEstBody.appendChild(trElement);
    trElement = document.createElement("tr");
    trElement.innerHTML = "<td>Direcci\u00F3n</td>\n                         <td>" + student.direccion + "</td>";
    infoEstBody.appendChild(trElement);
    trElement = document.createElement("tr");
    trElement.innerHTML = "<td>Telefono</td>\n                         <td>" + student.telefono + "</td>";
    infoEstBody.appendChild(trElement);
}
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function renderCreditos() {
    var numCreditos = getTotalCredits(dataCourses);
    totalCreditos.innerText = "Número total del creditos: " + numCreditos;
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function applyFilterByCredits() {
    var max = Number(inputSearchBoxCreditsMax.value);
    var min = Number(inputSearchBoxCreditsMin.value);
    clearCoursesInTable();
    var coursesFiltered = searchCourseByCredits(min, max, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function searchCourseByCredits(min, max, courses) {
    var resp = [];
    courses.forEach(function (course) {
        if (course.credits >= min && course.credits <= max) {
            resp.push(course);
        }
    });
    return resp;
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
