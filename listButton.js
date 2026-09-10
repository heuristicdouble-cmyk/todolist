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
  const tdstatus = document.createElement("td");
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

  // status選択ボックスを追加する
  const statusSelect = document.createElement("select");
  const statusOptions = [
    { value: "unread", text: "未完了", className: "status-unread" },
    { value: "pending", text: "保留", className: "status-pending" },
    { value: "in-progress", text: "進行中", className: "status-in-progress" },
    { value: "completed", text: "完了", className: "status-completed" },
  ];

  statusOptions.forEach((optionData) => {
    const option = document.createElement("option");
    option.value = optionData.value;
    option.textContent = optionData.text;
    statusSelect.appendChild(option);
  });

  const currentStatus = task.status || "unread";
  statusSelect.value = currentStatus;

  // 現在のステータスに応じた背景色クラスを設定する関数
  function applyStatusClass(val) {
    statusSelect.classList.remove(
      "status-unread",
      "status-pending",
      "status-in-progress",
      "status-completed",
    );
    const matched = statusOptions.find((opt) => opt.value === val);
    if (matched) {
      statusSelect.classList.add(matched.className);
    }
  }

  // 初期クラスの設定
  applyStatusClass(currentStatus);

  // 選択が変更された時の処理
  statusSelect.addEventListener("change", () => {
    applyStatusClass(statusSelect.value);
    tasks[index].status = statusSelect.value;
    localStorage.setItem("todoList", JSON.stringify(tasks));
  });

  tdcheckbox.appendChild(checkbox);
  tdtaskName.textContent = task.taskName;
  tdstatus.appendChild(statusSelect);
  tddeadline.textContent = task.deadline;
  tdcomment.textContent = task.comment;

  tr.appendChild(tdcheckbox);
  tr.appendChild(tdtaskName);
  tr.appendChild(tdstatus);
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

//リスト追加ボタンを押下したときの処理
form.addEventListener("submit", (event) => {
  //関数実行後にページをロードしない
  event.preventDefault();

  let taskName = document.querySelector(".input-taskName");
  let deadline = document.querySelector(".input-deadline");
  let comment = document.querySelector(".input-comment");

  //コンソールデバッグ用
  console.log(taskName.value);
  console.log(deadline.value);
  console.log(comment.value);

  const newTask = {
    taskName: taskName.value,
    status: null,
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

const buttonClearCompleted = document.querySelector(".button-clear-completed");

buttonClearCompleted.addEventListener("click", () => {
  tasks = tasks.filter((task) => !task.completed); //未完了タスクはtrueとなって残留する
  localStorage.setItem("todoList", JSON.stringify(tasks));
  loadTasks();
});

const buttonReverse = document.querySelector(".button-bw");

buttonReverse.addEventListener("click", () => {
  document.body.classList.toggle("reverse");
});
