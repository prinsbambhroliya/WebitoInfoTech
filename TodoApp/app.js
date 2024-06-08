// Get Element
const addtask = document.getElementById('addtask');
const btntext = addtask.innerText;
const tasktitle = document.getElementById('tasktitle');
const taskdesc = document.getElementById('taskdesc');
const recordsDisplay = document.getElementById('records');
let tasks = [];
// For Edit Task
let edit_id = null;

// Get Object From Local Storage
let objstr = localStorage.getItem('tasks');
if (objstr != null) {
    tasks = JSON.parse(objstr);
}
console.log(tasks);

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
        tasks[edit_id] = { 'title': tasktitlevalue, 'description': taskdescvalue };
        edit_id = null;
    } else {
        // Insert Records
        tasks.push({ 'title': tasktitlevalue, 'description': taskdescvalue });
    }

    SaveInfo(tasks);
    tasktitle.value = '';
    taskdesc.value = '';
    addtask.innerText = btntext;
}

// Save The Task In Local Storage
function SaveInfo(tasks) {
    let str = JSON.stringify(tasks);
    localStorage.setItem('tasks', str);
    DisplayInfo();
}
// Display The All Task In Table
function DisplayInfo() {
    let statement = '';
    tasks.forEach((task, i) => {
        statement += `<tr>
        <th scope="row">${i + 1}</th>
        <td>${task.title}</td>
        <td>${task.description}</td>
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
    tasktitle.value = tasks[id].title;
    taskdesc.value = tasks[id].description;
    addtask.innerText = 'Save Changes';
}

function DeleteInfo(id) {
    tasks.splice(id, 1);
    SaveInfo(tasks);
}


