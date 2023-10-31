let tasks = JSON.parse(localStorage.getItem("tasks")) || []
// localStorage.setItem('tasks', JSON.stringify(tasks))


let todoList = document.querySelector('.todo_list');
let todoForm = document.querySelector('.todo_form');
let todoField = document.querySelector('.todo_field')
let todoError = document.querySelector('.todo_error')
let todoNull = document.querySelector('.todo_null')

const addItemTodoList = () => {
    todoList.innerHTML = ''

    tasks.forEach((el) => {
        todoList.innerHTML += `
             <li class="todo_item" style="order: ${el.isDone ? '+1' : '0' && el.isImportant ? '-1' : '0'}">           
                <div class="todo_item-left">
                    <input ${el.isDone ? "checked" : ""} data-id="${el.id}" type="checkbox" class="todo_checked">
                    <p style="text-decoration-line: ${el.isDone ? "line-through" : ""}" class="todo_item-text">${el.text}</p>
                </div>
                <div class="todo_item-right">
                    <span data-id="${el.id}"  class="todo_item-star" style="color:${el.isImportant ? 'gold' : ""} ">
                        <ion-icon name="star"></ion-icon>
                    </span>
                     <span data-id="${el.id}" class="todo_item-del">
                        <ion-icon name="trash"></ion-icon>
                     </span>
                </div>
            </li>
        `
    })

    if (tasks.length !== 0){
        todoNull.style.display = 'none'
    } else{
        todoNull.style.display = 'block'
    }

    const todoChecked = document.querySelectorAll('.todo_checked')
    Array.from(todoChecked).forEach(item => {
        item.addEventListener("change", () => {
            tasks = tasks.map(el => {
                if (el.id == item.dataset.id) {
                    return {...el, isDone: !el.isDone}
                }
                return el
            })
            addItemTodoList()
            localStorage.setItem('tasks', JSON.stringify(tasks))
        })
    })

    const todoStar = document.querySelectorAll('.todo_item-star')
    Array.from(todoStar).forEach(item => {
        item.addEventListener('click', () => {
            tasks = tasks.map(el => {
                if (el.id == item.dataset.id) {
                    return {...el, isImportant: !el.isImportant}
                }
                return el
            })
            addItemTodoList()
            localStorage.setItem('tasks', JSON.stringify(tasks))
        })
    })

    const todoItemDel = document.querySelectorAll('.todo_item-del')
    Array.from(todoItemDel).forEach(item => {
        item.addEventListener("click", () => {
            tasks = tasks.filter(el => {
                return el.id != item.dataset.id
            })
            addItemTodoList()
            localStorage.setItem('tasks', JSON.stringify(tasks))
        })
    })


}


addItemTodoList()

todoForm.addEventListener('submit', (event) => {
    event.preventDefault()


    if (tasks.some(el => el.text.toUpperCase() === event.target[0].value.toUpperCase())) {
        alert("Такая задача уже есть!!")
        event.target[0].value = ''
    } else {
        tasks = [...tasks, {
            id: tasks.length ? tasks.at(-1).id + 1 : 1,
            text: event.target[0].value,
            isImportant: false,
            isDone: false
        }]

        addItemTodoList()
        localStorage.setItem('tasks', JSON.stringify(tasks))
        event.target[0].value = ''
    }
})

todoField.addEventListener('input', (e) => {
    if (tasks.some(el => el.text.toUpperCase() === e.target.value.toUpperCase())) {
        todoError.style.display = 'block'
    } else {
        todoError.style.display = 'none'
    }
})


