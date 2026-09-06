const form = document.querySelector("#task-form");
const taskListBody = document.querySelector("#task-list-body");

//ローカルデータから保存済みのタスクデータを取得する。もしなければ空配列
let tasks = JSON.parse(localStorage.getItem("todoList")) || [];

function renderTask(task, index) {
  const tr = document.createElement("tr");

  if (task.completed) {
    tr.classList.add("completed");
  }

  const tdcheckbox = document.createElement("td");
  const tdtaskName = document.createElement("td");
  const tdpriority = document.createElement("td");
  const tddeadline = document.createElement("td");
  const tdcomment = document.createElement("td");

  // checkboxを追加する
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;

  checkbox.addEventListener("change", () => {
    tr.classList.toggle("completed", checkbox.checked);
    tasks[index].completed = checkbox.checked;
    localStorage.setItem("todoList", JSON.stringify(tasks));
  });

  tdcheckbox.appendChild(checkbox);

  tdtaskName.textContent = task.taskName;
  tdpriority.textContent =
    task.priority === "low"
      ? "低"
      : task.priority === "medium"
        ? "中"
        : "高";
  tddeadline.textContent = task.deadline;
  tdcomment.textContent = task.comment;

  tdpriority.classList.add(`priority-${task.priority}`);

  tr.appendChild(tdcheckbox);
  tr.appendChild(tdtaskName);
  tr.appendChild(tdpriority);
  tr.appendChild(tddeadline);
  tr.appendChild(tdcomment);

  taskListBody.appendChild(tr);
}

//ページ読み込み時に保存されている全タスクを描画する
function loadTasks() {
  taskListBody.innerHTML = ""; // 描画前にテーブルをリセット
  tasks.forEach((task, index) => renderTask(task, index));
}

// 初期実行
loadTasks();

form.addEventListener("submit", (event) => {
  //関数実行後にページをロードしない
  event.preventDefault();

  let taskName = document.querySelector(".input-taskName");
  let priority_select = document.querySelector(".priority-select");
  let deadline = document.querySelector(".input-deadline");
  let comment = document.querySelector(".input-comment");

  //コンソールデバッグ用
  console.log(taskName.value);
  console.log(priority_select.value);
  console.log(deadline.value);
  console.log(comment.value);

  const newTask = {
    taskName: taskName.value,
    priority: priority_select.value,
    deadline: deadline.value,
    comment: comment.value,
    completed: false,
  };

  tasks.push(newTask);
  localStorage.setItem("todoList", JSON.stringify(tasks));

  loadTasks();

  // 入力欄をリセット
  form.reset();
});

const button = document.querySelector(".button-bw");

button.addEventListener("click", () => {
  document.body.classList.toggle("reverse");
});
