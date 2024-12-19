const input = document.getElementsByClassName('input')[0];
const add_button = document.getElementsByClassName('add_button')[0];
const taskList = document.getElementsByClassName('taskList')[0];

async function fetchTasks() {
    try {
        const response = await fetch('http://localhost:3000/tasks');
        const tasks = await response.json();
        taskList.innerHTML = ''; // Очистка списка перед добавлением задач
        tasks.forEach(task => {
            addTaskToDOM(task);
        });
    } catch (error) {
        console.error('Ошибка загрузки задач:', error);
    }
}

async function addTask() {
    const saveText = input.value.trim();
    if (saveText === "") {
        alert("Введите задачу");
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: saveText })
        });
        const newTask = await response.json();
        addTaskToDOM(newTask); // Добавить новую задачу в DOM
        input.value = '';
    } catch (error) {
        console.error('Ошибка добавления задачи:', error);
    }
}

async function deleteTask(taskId, taskElement) {
    try {
        await fetch(`http://localhost:3000/tasks/${taskId}`, {
            method: 'DELETE'
        });
        taskElement.remove(); // Удаление элемента из DOM
    } catch (error) {
        console.error('Ошибка удаления задачи:', error);
    }
}

function addTaskToDOM(task) {
    const taskItem = document.createElement('li');
    taskItem.textContent = task.text;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTask(task.id, taskItem));

    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);
}

add_button.addEventListener('click', addTask);
document.addEventListener('DOMContentLoaded', fetchTasks);

// const input = document.getElementsByClassName('input')[0];
// const add_button = document.getElementsByClassName('add_button')[0];
// const taskList = document.getElementsByClassName('taskList')[0];



// function addTask(){//добавление и сохранения задач )
//     const saveText=input.value.trim();//value для установки значения,trim чтобы убрать лишние пробелы)
//     if(saveText===""){
//         alert("Введите задачу (((")
//         return;
//     }
//     const taskItem=document.createElement('li');
//     taskItem.textContent=saveText;//добавляется текст с помощью .textContent

//     const deleteButton=document.createElement('button');
//     deleteButton.textContent='Delete';
//     // deleteButton.addEventListener('click', ()=>{
//     //     saveText.remove();

//     // });

//     deleteButton.addEventListener('click', () => {
//         taskItem.remove();
//     });
    

//     // saveText.addEventListener('click', ()=>{
//     //     saveText.classList.toggle('complited');

//     // })

//     taskItem.addEventListener('click', () => {
//         taskItem.classList.toggle('complited');
//     });
    

//     taskItem.appendChild(deleteButton);
//     taskList.appendChild(taskItem);
//     input.value='';


// }
// add_button.addEventListener('click',addTask);
// taskInput.addEventListener('keydown', (e) => {
//     if (e.key === 'Enter') {
//         addTask();
//     }
// });


// async function fetchTasks() {
//     try {
//         const response = await fetch('http://localhost:3000/tasks');
//         const tasks = await response.json();
//         taskList.innerHTML = ''; // Очистка списка перед добавлением задач
//         tasks.forEach(task => {
//             addTaskToDOM(task);
//         });
//     } catch (error) {
//         console.error('Ошибка загрузки задач:', error);
//     }
// }
