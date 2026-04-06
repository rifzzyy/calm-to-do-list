let tasks = JSON.parse(localStorage.getItem("tasks")) || {
  0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: []
};

let currentDay = new Date().getDay();

/* DATE + DAY CLICK */
function loadDate() {
  const now = new Date();

  const date = now.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric"
  });

  const days = ["S","M","T","W","T","F","S"];

  let dayHTML = days.map((d,i) =>
    `<span class="${i === currentDay ? 'today' : ''}" onclick="selectDay(${i})">${d}</span>`
  ).join("");

  document.getElementById("dateDayRow").innerHTML =
    `<span>${date}</span><div class="days">${dayHTML}</div>`;
}

/* CHANGE DAY */
function selectDay(day) {
  currentDay = day;
  loadDate();
  renderTasks();
}

/* QUOTE */
const quotes = [
  "I can, and I will",
  "Stay consistent",
  "Small steps matter",
  "Focus on progress",
  "Make it happen",
  "You got this",
  "Be calm, be focused"
];

function loadQuote() {
  document.getElementById("quote").innerText = quotes[currentDay];
}

/* TASKS */
function addTask() {
  const input = document.getElementById("taskInput");
  if (!input.value.trim()) return;

  tasks[currentDay].push({ text: input.value, done: false });
  input.value = "";
  saveTasks();
  renderTasks();
}

function toggleTask(i) {
  tasks[currentDay][i].done = !tasks[currentDay][i].done;
  saveTasks();
  renderTasks();
}

function deleteTask(i) {
  tasks[currentDay].splice(i, 1);
  saveTasks();
  renderTasks();
}

function clearTasks() {
  tasks[currentDay] = [];
  saveTasks();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks[currentDay].forEach((t,i) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <div class="task-left">
        <div class="checkbox ${t.done ? 'checked' : ''}" onclick="toggleTask(${i})"></div>
        <span class="${t.done ? 'completed' : ''}">${t.text}</span>
      </div>
      <span class="delete" onclick="deleteTask(${i})">×</span>
    `;

    list.appendChild(li);
  });

  loadQuote();
}

/* ENTER KEY */
document.getElementById("taskInput").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    addTask();
  }
});

/* INIT */
loadDate();
renderTasks();