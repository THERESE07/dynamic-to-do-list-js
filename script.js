// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn'); // Button to add tasks
    const taskInput = document.getElementById('task-input');   // Input field for tasks
    const taskList = document.getElementById('task-list');     // Unordered list for tasks

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]'); // Retrieve tasks array or empty array
        storedTasks.forEach(taskText => addTask(taskText, false)); // Add each stored task to the DOM
    }

    // Function to add a new task
    function addTask(taskText, save = true) {
        if (!taskText) {
            taskText = taskInput.value.trim(); // If no taskText provided, use input value
        }

        if (taskText === "") {
            alert("Please enter a task."); // Prompt if the input is empty
            return;
        }

        // Create new task elements
        const listItem = document.createElement('li');
        listItem.textContent = taskText;
        listItem.classList.add('task-item'); // Add a class for styling

        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn'); // Add a class for styling

        // Add removal functionality to the remove button
        removeButton.onclick = () => {
            taskList.removeChild(listItem); // Remove from the DOM
            removeTask(taskText); // Remove from Local Storage
        };

        // Append the button to the list item, then the item to the list
        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);

        // Clear the input field
        taskInput.value = "";

        // Save to Local Storage if necessary
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }

    // Function to remove a task from Local Storage
    function removeTask(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = storedTasks.filter(task => task !== taskText); // Filter out the task
        localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Save updated tasks array
    }

    // Add event listeners
    addButton.addEventListener('click', () => addTask());

    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask(); // Add task on Enter key press
        }
    });

    // Load tasks from Local Storage on page load
    loadTasks

});