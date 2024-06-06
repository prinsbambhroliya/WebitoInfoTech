// Get Element
const addtask = document.getElementById('addtask');
const btntext = addtask.innerText;
const tasktitle = document.getElementById('tasktitle');
const taskdesc = document.getElementById('taskdesc');
const recordsDisplay = document.getElementById('records');
let tasktitlearray = [];
let taskdescarray = [];
// For Edit Task
let edit_id = null;

// Get Object From Local Storage
let objstrtitle = localStorage.getItem('tasktitle');
if (objstrtitle != null) {
    tasktitlearray = JSON.parse(objstrtitle);
}
console.log(tasktitlearray);

let objstrdesc = localStorage.getItem('taskdesc');
if (objstrdesc != null) {
    taskdescarray = JSON.parse(objstrdesc);
}
console.log(taskdescarray);

DisplayInfo();

// Event On Button Click
addtask.onclick = () => {
    const tasktitlevalue = tasktitle.value.trim();
    const taskdescvalue = taskdesc.value.trim();
    // Validation (If Empty String Entered)
    if (tasktitlevalue === '' || taskdescvalue === '') {
        alert("Both title and description are required.");
        return;
    }

    if (edit_id != null) {
        // Edit 
        tasktitlearray.splice(edit_id, 1, { 'title': tasktitlevalue });
        taskdescarray.splice(edit_id, 1, { 'task': taskdescvalue });
        edit_id = null;
    } else {
        // Insert Records
        tasktitlearray.push({ 'title': tasktitlevalue });
        taskdescarray.push({ 'task': taskdescvalue });
    }

    SaveInfo(tasktitlearray, taskdescarray);
    tasktitle.value = '';
    taskdesc.value = '';
    addtask.innerText = btntext;
}

// Save The Task In Local Storage
function SaveInfo(tasktitlearray, taskdescarray) {
    let strtitle = JSON.stringify(tasktitlearray);
    let strdesc = JSON.stringify(taskdescarray);
    localStorage.setItem('tasktitle', strtitle);
    localStorage.setItem('taskdesc', strdesc);
    DisplayInfo();
}
// Display The All Task In Table
function DisplayInfo() {
    let statement = '';
    tasktitlearray.forEach((title, i) => {
        const task = taskdescarray[i]; // Assuming corresponding elements
        statement += `<tr>
        <th scope="row">${i + 1}</th>
        <td>${title.title}</td>
        <td>${task.task}</td>
        <td>
        <i class="btn text-white btn-info mx-3 fa-solid fa-pen-to-square" onclick='EditInfo(${i})'></i>
        <i class="btn btn-danger text-white fa-solid fa-trash" onclick='DeleteInfo(${i})'></i>
        </td>
        </tr>`;
    });
    recordsDisplay.innerHTML = statement;
}

function EditInfo(id) {
    edit_id = id;
    tasktitle.value = tasktitlearray[id].title;
    taskdesc.value = taskdescarray[id].task;
    addtask.innerText = 'Save Changes';
}

function DeleteInfo(id) {
    tasktitlearray.splice(id, 1);
    taskdescarray.splice(id, 1);
    SaveInfo(tasktitlearray, taskdescarray);
}
