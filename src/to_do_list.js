
const taskInput = document.getElementById('taskInput');
const urgencySelect = document.getElementById('urgency');
const sizeSelect = document.getElementById('size');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');
const filterButtons = document.querySelectorAll('.filters button');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
export function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks(filter = "all") {
    taskList.innerHTML = ''; // this clears all the data in taskList back to an empty string. Allows data to be refreshed
    tasks
        .filter(function (task) {
            if (filter === 'all') return true;// this is the default value
            if (filter === 'urgent') return task.urgency === 'urgent';
            if (filter === 'large') return task.size === 'large';
            if (filter === 'small') return task.size === 'small';
            if (filter === 'completed') return task.completed;
            return true;
        })
        //without arrow function this would be written as tasks.forEach(function(task, index) {
        .forEach((task, index) => {
            const taskElement = document.createElement('li');
            taskElement.className = `task ${task.urgency} ${task.size} ${task.completed ? 'completed' : ''}`;
            // without using ? can be written as a standard if-else statement for better readability
            // taskElement.className = 'task $(task.urgency)etc; (the $ allows you to embed javascript directly with strings rather than using string concatenation)
            //if (task.completed){ taskElement.className += 'completed';} 
            // this means if true it's completed. If statement is false, the code inside the block is skipped and nothing additional happens
            //the class name remains as it was originally set. tasks that are not completed will remain as they were (no line through)

            taskElement.innerHTML = `
            <span>${task.description}</span>
            <div>
              <button onclick="toggleComplete(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
              <button onclick="editTask(${index})">Edit</button>
              <button onclick="removeTask(${index})">Remove</button>
            </div>
          `;
            taskList.appendChild(taskElement); //add the task to the list
        });
}
function addTask() {
    const description = taskInput.value.trim();
    const urgency = urgencySelect.value;
    const size = sizeSelect.value;

    if (!description) {
        alert('Task description cannot be empty!');
        return;
    }

    tasks.push({ description, urgency, size, completed: false });
    saveTasks();
    renderTasks();
    taskInput.value = '';
}

export function removeTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

export function editTask(index) {
    const newDescription = prompt('Edit task description:', tasks[index].description);
    if (newDescription !== null) {
        tasks[index].description = newDescription.trim();
        saveTasks();
        renderTasks();
    }
}

export function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

addTaskButton.addEventListener('click', addTask);

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.id.replace('filter', '').toLowerCase();
        renderTasks(filter);
    });
});

renderTasks();
