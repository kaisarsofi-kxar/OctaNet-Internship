// Initialize an array to store tasks
let tasksArray = [];

function addTask() {
  const taskInput = document.getElementById("task-input").value;
  const taskDeadline = document.getElementById("task-deadline").value;
  const taskPriority = document.getElementById("task-priority").value;
  const taskLabel = document.getElementById("task-label").value;

  if (taskInput.trim() === "") {
    alert("Task name cannot be empty!");
    return;
  }

  // Create a task object
  const newTask = {
    name: taskInput,
    deadline: taskDeadline,
    priority: taskPriority,
    label: taskLabel,
  };

  // Add the new task to the array
  tasksArray.push(newTask);

  clearForm();

  // Sort tasks array based on priority (high priority on top)
  tasksArray.sort((a, b) => {
    const priorityOrder = { low: 1, medium: 2, high: 3 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });

  // Update the HTML with sorted tasks
  updateTaskList();
}

function removeTask(button) {
  const taskIndex = button.parentElement.dataset.index;

  // Remove the task from the array
  tasksArray.splice(taskIndex, 1);

  // Update the HTML with updated tasks
  updateTaskList();
}

function editTask(index) {
  const editedTask = tasksArray[index];

  // Populate the form with the task details for editing
  document.getElementById("task-input").value = editedTask.name;
  document.getElementById("task-deadline").value = editedTask.deadline;
  document.getElementById("task-priority").value = editedTask.priority;
  document.getElementById("task-label").value = editedTask.label;

  // Remove the task from the array
  tasksArray.splice(index, 1);

  // Update the HTML with updated tasks
  updateTaskList();
}

function updateTaskList() {
  const taskList = document.getElementById("task-list");

  // Clear the current task list
  taskList.innerHTML = "";

  // Create table header
  const headerRow = document.createElement("tr");
  headerRow.className = "task";
  headerRow.innerHTML = `<th class="task-name">Task</th><th class="task-detail">Deadline</th><th class="task-detail">Priority</th><th class="task-detail">Label</th><th class="task-detail">Actions</th>`;
  taskList.appendChild(headerRow);

  // Re-populate the task list based on the sorted array
  tasksArray.forEach((task, index) => {
    const newTask = document.createElement("tr");
    newTask.className = `task  priority-${task.priority.toLowerCase()}`;
    newTask.dataset.index = index;
    newTask.innerHTML = `
            
                <td class="task-name">${task.name}</td>
                <td class="task-detail">${task.deadline}</td>
                <td class="priority task-detail">${task.priority}</td>
                <td class="task-detail">${task.label}</td>
                <td class="task-detail"><button onclick="removeTask(this)"><i class="fa-solid fa-trash-can"></i></button>
                <button onclick="editTask(${index})"><i class="fa-solid fa-pen"></i></button></td>
                
            
           
        `;
    taskList.appendChild(newTask);
  });
}

function clearForm() {
  document.getElementById("task-input").value = "";
  document.getElementById("task-deadline").value = "";
  document.getElementById("task-priority").value = "low";
  document.getElementById("task-label").value = "";
}

// Initial update to display tasks
updateTaskList();
