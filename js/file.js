var student_name = document.getElementById("studentName");
var student_email = document.getElementById("studentEmail");
var student_id = document.getElementById("studentId");
var student_gender = document.getElementById("studentGender");
var table_body = document.getElementById("tableBody");
var btnAction = document.getElementById("btnRigesterAndUpdate");
var currentIndex = 0;
btnAction.onclick = function(){
    if(btnAction.innerHTML=="REGISTER"){
        if(validationStudentName() && validationStudentEmail() && validationStudentId() && validationStudentGender()){
            addInputs();
        }
        else alert("invalid");

    }
    else{
        updateStudent();
    }

}
var studentContainer = [];
if(localStorage.getItem("students")!=null){
    studentContainer=JSON.parse(localStorage.getItem("students"));
    displayInputs(studentContainer);
}
else{
    studentContainer=[];
}

function addInputs(){
    var student = {
        name: student_name.value,
        email: student_email.value,
        id: student_id.value,
        gender: student_gender.value
    };
    studentContainer.push(student);
    localStorage.setItem("students",JSON.stringify(studentContainer));
    displayInputs(studentContainer);
    clearInputs();
    console.log(studentContainer);
}
 function clearInputs(){
    student_name.value = "";
    student_email.value = "";
    student_id.value = "";
    student_gender.value = "";
 }
 function displayInputs(containerArray){
    var cartona="";
    for( var i=0; i<containerArray.length;i++){
        cartona+=`<tr>
        <td>${i+1}</td>
        <td>${containerArray[i].name}</</td>
        <td>${containerArray[i].email}</</td>
        <td>${containerArray[i].id}</td>
        <td>${containerArray[i].gender}</td>
        <td><button onclick="deleteItem(${i});" class="btn btn-danger" >Delete</button></td>
        <td><button onclick="getValueToUpdate(${i});" class="btn btn-primary">Update</button></td>
      </tr>`
    }
    table_body .innerHTML = cartona;

 }
 function searchStudent(term){
    var searchResult=[];
    for(var i=0;i<studentContainer.length;i++){
        if(studentContainer[i].name
            .toLowerCase()
            .includes(term.toLowerCase())===true){
            searchResult.push(studentContainer[i]);
        }
    }
  displayInputs(searchResult);
 }
function deleteItem(deleteIndex){
    studentContainer.splice(deleteIndex,1);
    localStorage.setItem("students",JSON.stringify(studentContainer));
    displayInputs(studentContainer);

}
function getValueToUpdate(indexUpdate){
    currentIndex=indexUpdate;
    var student=studentContainer[indexUpdate];
    student_name.value =student.name;
    student_email.value = student.email;
    student_id.value = student.id;
    student_gender.value = student.gender;
    btnAction.innerHTML="Update StudentInfo";


}
function updateStudent(){
    var student = {
        name: student_name.value,
        email: student_email.value,
        id: student_id.value,
        gender: student_gender.value
    };
    studentContainer[currentIndex]=student;
    localStorage.setItem("students",JSON.stringify(studentContainer));
    displayInputs(studentContainer);
    clearInputs();

}
function validationStudentName(){
    const regx=/^[A-Z][a-z]{3,8}$/;
    if(regx.test(student_name.value)===true){
        student_name.classList.add("is-valid");
        student_name.classList.remove("is-invalid");

        return true;
    }
    else{
        student_name.classList.add("is-invalid");
        student_name.classList.remove("is-valid");
        return false;

    } 
}
function validationStudentEmail() {
    const regx = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (regx.test(student_email.value) === true) {
        student_email.classList.add("is-valid");
        student_email.classList.remove("is-invalid");
        return true;
    } else {
        student_email.classList.add("is-invalid");
        student_email.classList.remove("is-valid");
        return false;
    }
}
function validationStudentId() {
    const regx = /^[0-9]{5}$/;
    if (regx.test(student_id.value) === true) {
        student_id.classList.add("is-valid");
        student_id.classList.remove("is-invalid");
        return true;
    } else {
        student_id.classList.add("is-invalid");
        student_id.classList.remove("is-valid");
        return false;
    }
}
function validationStudentGender() {
    if (student_gender.value === "") {
        student_gender.classList.add("is-invalid");
        student_gender.classList.remove("is-valid");
        return false;
    } else {
        student_gender.classList.add("is-valid");
        student_gender.classList.remove("is-invalid");
        return true;
    }
}