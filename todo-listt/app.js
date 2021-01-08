const App = (() => {
    const LIST = document.querySelector('.todo-list')
    const INPUT = document.querySelector('.insert-todo')
    
    const insertTodo = (todo) => {
        const li = document.createElement('li');
            li.className = 'todo-list__item';
            li.innerHTML = `
                <i class="far fa-circle check action-icon"></i>
                <div class="todo-list__item-content">
                    <p class="todo">${todo}</p>
                    <div class="item-actions">
                    <i class="far fa-trash-alt action-icon delete"></i>
                    </div>
                </div>
            `
            LIST.insertBefore(li, LIST.firstChild);
    }
    
    const saveLocalTodo = (todo) => {
        let todos;
        if(localStorage.getItem('todos') === null) todos = [];
        else todos = JSON.parse(localStorage.getItem('todos'));
    
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
    }
    
    const removeLocalTodo = (todo) => {
        let todos;
        if(localStorage.getItem('todos') === null) todos = [];
        else todos = JSON.parse(localStorage.getItem('todos'));
    
        todos.splice(todos.indexOf(todo), 1);
        localStorage.setItem('todos', JSON.stringify(todos));
    }
    
    const getTodos = () => {
        let todos;
        if(localStorage.getItem('todos') === null) todos = [];
        else todos = JSON.parse(localStorage.getItem('todos'));
    
        todos.forEach(todo => {
            let li = document.createElement('li');
            li.className = 'todo-list__item';
            li.innerHTML = `
                <i class="far fa-circle check action-icon"></i>
                <div class="todo-list__item-content">
                    <p class="todo">${todo}</p>
                    <div class="item-actions">
                    <i class="far fa-trash-alt action-icon delete"></i>
                    </div>
                </div>
            `
            LIST.insertBefore(li, LIST.firstChild);
        })
    }
    
    const addTodo = () => {
        if(event.keyCode === 13) {
            if(INPUT.value.trim()) {
                saveLocalTodo(INPUT.value);
                insertTodo(INPUT.value);
                INPUT.value = '';
            }
         }
    }
    
    const actions = () => {
        if(event.target.classList.contains('check')) {
            const check = event.target;
            const todo = event.target.nextElementSibling.firstElementChild;
    
            if(check.className === 'far fa-circle check action-icon') {
                check.className = 'fas fa-check-circle check action-icon';
                todo.classList.add('done');
            } else {
                check.className = 'far fa-circle check action-icon';
                todo.classList.remove('done')
            }
        }
    
        if(event.target.classList.contains('delete')) {
            const currentItem = event.target.parentElement.parentElement.parentElement;
            const todo = currentItem.firstElementChild.nextElementSibling.firstElementChild.innerText;
    
            currentItem.remove();
            removeLocalTodo(todo);
        }
    }

    document.addEventListener('DOMContentLoaded', getTodos);
    INPUT.addEventListener('keydown', addTodo);
    LIST.addEventListener('click', actions)
})();