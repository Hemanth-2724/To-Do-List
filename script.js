document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById("todo-input");
    const addTaskBtn = document.getElementById("add-task-btn");
    const todoList = document.getElementById("todo-list");

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Render all tasks on load
    renderAllTasks();

    // Add task on button click
    addTaskBtn.addEventListener("click", addTask);
    todoInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") addTask();
    });

    function addTask() {
        const taskText = todoInput.value.trim();
        if (taskText === "") return;

        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        };
        tasks.push(newTask);
        saveTasks();
        renderTask(newTask);
        todoInput.value = "";
    }

    function renderAllTasks() {
        todoList.innerHTML = "";
        tasks.forEach(renderTask);
    }

    function renderTask(task) {
        const li = document.createElement("li");
        li.setAttribute("data-id", task.id);
        if (task.completed) {
            li.classList.add("completed");
        }
        li.innerHTML = `
            <span>${task.text}</span>
            <button aria-label="Delete task">Delete</button>
        `;

        // Toggle completed state
        li.addEventListener("click", (event) => {
            if (event.target.tagName === "BUTTON") return;
            task.completed = !task.completed;
            li.classList.toggle("completed");
            saveTasks();
        });

        // Delete task
        li.querySelector('button').addEventListener("click", (e) => {
            e.stopPropagation();
            tasks = tasks.filter(t => t.id !== task.id);
            saveTasks();
            li.remove();
        });

        todoList.appendChild(li);
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
})

