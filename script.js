const inputTask = document.querySelector('.input-task')
const btnTask = document.querySelector('.btn-task')
const tasks = document.querySelector('.tasks')


function createLi(){
    const li = document.createElement('li')
    return li
}

inputTask.addEventListener('keypress', function(e){
    if (e.keyCode === 13){
        if (!inputTask.value) return
        createTask(inputTask.value)

    }
})

function clearInput(){
    inputTask.value = ''
    inputTask.focus()
}

function createBtnClear(li){
    li.innerText += ' '
    const btnClear = document.createElement('button')
    btnClear.innerText = 'Apagar'
    li.appendChild(btnClear)
    btnClear.classList.add('btn-warning')
    btnClear.style.fontSize = '1rem'
}

function createTask(textInput){
    const li = createLi()
    li.innerText = textInput
    tasks.appendChild(li)
    clearInput()
    createBtnClear(li)
    saveTasks()
}

btnTask.addEventListener('click', function(e){
    if (!inputTask.value) return
    createTask(inputTask.value)
})

document.addEventListener('click', function(e){
    const el = e.target
    
    if (el.classList.contains('btn-warning')){
        el.parentElement.remove()
        saveTasks()
    }
})

function saveTasks(){
    const liTasks = tasks.querySelectorAll('li')
    const taskList = []

    for (let task of liTasks){
        let taskText = task.innerText
        taskText = taskText.replace('Apagar', '').trim()
        taskList.push(taskText)
    }

    const tasksJSON = JSON.stringify(taskList)
    localStorage.setItem('tasks', tasksJSON)
}

function addSavedTasks(){
    const tasks = localStorage.getItem('tasks')
    const taskList = JSON.parse(tasks)

    for (let task of taskList){
        createTask(task)        
    }
}

addSavedTasks()