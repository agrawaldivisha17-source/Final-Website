let currentTask = null;


const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

const detailsBox = document.getElementById("detailsBox");
const detailsInput = document.getElementById("detailsInput");

const addBtn = document.getElementById("addBtn");
const saveBtn = document.getElementById("saveBtn");
const closeBtn = document.getElementById("closeBtn");

addBtn.addEventListener("click", addTask);

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  const li = document.createElement("li");
  li.textContent = text;

  // store task details
  li.dataset.details = "";

  // OPEN DETAILS
  li.addEventListener("click", () => {
    currentTask = li;

    detailsBox.style.display = "block";
    detailsInput.value = li.dataset.details;
  });

  const del = document.createElement("button");
  del.textContent = "X";
  del.className = "delete-btn";

  del.addEventListener("click", (e) => {
    e.stopPropagation();
    li.remove();

    if (currentTask === li) {
      detailsBox.style.display = "none";
      currentTask = null;
    }
  });

  li.appendChild(del);
  taskList.appendChild(li);

  taskInput.value = "";
}


saveBtn.addEventListener("click", () => {
  if (currentTask) {
    currentTask.dataset.details = detailsInput.value;
  }

  detailsBox.style.display = "none";
  currentTask = null;
});


closeBtn.addEventListener("click", () => {
  detailsBox.style.display = "none";
  currentTask = null;
});