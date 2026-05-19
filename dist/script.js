// DOM elements
const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const clearBtn = document.getElementById('clearBtn');

// Load todos from localStorage when page loads
document.addEventListener('DOMContentLoaded', loadTodos);

// Add todo event
addBtn.addEventListener('click', addTodo);

// Add todo with Enter key
todoInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// Clear completed todos
clearBtn.addEventListener('click', clearCompleted);

// Add new todo function
function addTodo() {
    const todoText = todoInput.value.trim();

    if (todoText === '') {
        return;
    }

    // Create todo object
    const todo = {
        id: Date.now(),
        text: todoText,
        completed: false
    };

    // Add to UI
    addTodoToUI(todo);

    // Save to localStorage
    saveTodo(todo);

    // Clear input
    todoInput.value = '';
    todoInput.focus();
}

// Add todo to UI
function addTodoToUI(todo) {
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.dataset.id = todo.id;

    li.innerHTML = `
        <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
        <span class="todo-text">${todo.text}</span>
        <button class="delete-btn">Delete</button>
    `;

    // Add event listeners to new elements
    const checkbox = li.querySelector('.todo-checkbox');
    const deleteBtn = li.querySelector('.delete-btn');

    checkbox.addEventListener('change', toggleTodo);
    deleteBtn.addEventListener('click', deleteTodo);

    todoList.appendChild(li);

    // If completed, mark as completed in UI
    if (todo.completed) {
        li.classList.add('completed');
    }
}

// Toggle todo completion
function toggleTodo(e) {
    const li = e.target.parentElement;
    const id = parseInt(li.dataset.id);
    const todo = getTodoById(id);

    todo.completed = e.target.checked;
    li.classList.toggle('completed', todo.completed);

    updateTodoInStorage(id, todo);
}

// Delete todo
function deleteTodo(e) {
    const li = e.target.parentElement;
    const id = parseInt(li.dataset.id);

    // Remove from UI
    li.remove();

    // Remove from localStorage
    removeTodoFromStorage(id);
}

// Clear completed todos
function clearCompleted() {
    const completedItems = document.querySelectorAll('.todo-item.completed');

    completedItems.forEach(item => {
        const id = parseInt(item.dataset.id);
        item.remove();
        removeTodoFromStorage(id);
    });
}

// Save todo to localStorage
function saveTodo(todo) {
    let todos = getTodosFromStorage();
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Get todos from localStorage
function getTodosFromStorage() {
    const todos = localStorage.getItem('todos');
    return todos ? JSON.parse(todos) : [];
}

// Get todo by ID
function getTodoById(id) {
    const todos = getTodosFromStorage();
    return todos.find(todo => todo.id === id);
}

// Update todo in localStorage
function updateTodoInStorage(id, updatedTodo) {
    let todos = getTodosFromStorage();
    const index = todos.findIndex(todo => todo.id === id);

    if (index !== -1) {
        todos[index] = updatedTodo;
        localStorage.setItem('todos', JSON.stringify(todos));
    }
}

// Remove todo from localStorage
function removeTodoFromStorage(id) {
    let todos = getTodosFromStorage();
    todos = todos.filter(todo => todo.id !== id);
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Load todos from localStorage
function loadTodos() {
    const todos = getTodosFromStorage();

    todos.forEach(todo => {
        addTodoToUI(todo);
    });
}