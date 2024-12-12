// Select DOM elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Add Task
addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    return;
  }

  createTaskItem(taskText);
  taskInput.value = ""; // Clear input
  taskInput.focus(); // Focus back on input field
});

// Create Task Item
function createTaskItem(taskText) {
  const listItem = document.createElement("li");
  listItem.className = "task-item";

  // Task Content
  const taskContent = document.createElement("span");
  taskContent.className = "task-content";
  taskContent.textContent = taskText;

  // Buttons
  const buttons = document.createElement("div");
  buttons.className = "task-buttons";

  // Edit Button
  const editBtn = document.createElement("button");
  editBtn.className = "edit-btn";
  editBtn.textContent = "Edit";
  editBtn.addEventListener("click", () => {
    handleEditTask(listItem, taskContent, editBtn);
  });

  // Complete Button
  const completeBtn = document.createElement("button");
  completeBtn.className = "complete-btn";
  completeBtn.textContent = "Complete";
  completeBtn.addEventListener("click", () => {
    listItem.classList.toggle("completed");
  });

  // Delete Button
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => {
    taskList.removeChild(listItem);
  });

  buttons.appendChild(editBtn);
  buttons.appendChild(completeBtn);
  buttons.appendChild(deleteBtn);

  listItem.appendChild(taskContent);
  listItem.appendChild(buttons);

  taskList.appendChild(listItem);
}

// Handle Editing Task
function handleEditTask(listItem, taskContent, editBtn) {
  if (editBtn.textContent === "Edit") {
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = taskContent.textContent;
    editInput.className = "task-edit-input";

    listItem.replaceChild(editInput, taskContent);

    editBtn.textContent = "Save";
    editInput.focus();

    editInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        saveTask(listItem, editInput, taskContent, editBtn);
      }
    });
  } else {
    saveTask(listItem, listItem.querySelector(".task-edit-input"), taskContent, editBtn);
  }
}

// Save Edited Task
function saveTask(listItem, editInput, taskContent, editBtn) {
  taskContent.textContent = editInput.value.trim() || taskContent.textContent;
  listItem.replaceChild(taskContent, editInput);
  editBtn.textContent = "Edit";
}
