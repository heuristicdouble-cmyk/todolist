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

  const tdstatus = document.createElement("td");
  const tddeadline = document.createElement("td");

  const tdtaskName = document.createElement("td");
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
    { value: "unread", text: "uncompleted", className: "status-unread" },
    { value: "pending", text: "in pending", className: "status-pending" },
    {
      value: "in-progress",
      text: "in progress",
      className: "status-in-progress",
    },
    { value: "completed", text: "completed", className: "status-completed" },
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

  tdstatus.appendChild(statusSelect);

  const inputTaskName = document.createElement("input");

  inputTaskName.type = "text";
  inputTaskName.value = task.taskName;
  inputTaskName.classList.add("task-edit-input");

  inputTaskName.addEventListener("change", () => {
    const newName = inputTaskName.value.trim();

    // 空欄は禁止
    if (newName === "") {
      inputTaskName.value = tasks[index].taskName;
      return;
    }

    tasks[index].taskName = newName;

    localStorage.setItem("todoList", JSON.stringify(tasks));
  });

  tdtaskName.appendChild(inputTaskName);

  const inputComment = document.createElement("input");

  inputComment.type = "text";
  inputComment.value = task.comment ?? "";
  inputComment.classList.add("task-edit-input");

  inputComment.addEventListener("change", () => {
    tasks[index].comment = inputComment.value;

    localStorage.setItem("todoList", JSON.stringify(tasks));
  });

  tdcomment.appendChild(inputComment);

  const inputDeadline = document.createElement("input");

  inputDeadline.type = "date";
  inputDeadline.value = task.deadline ?? "";
  inputDeadline.classList.add("task-edit-input");

  inputDeadline.addEventListener("change", () => {
    // Deadlineの更新
    tasks[index].deadline = inputDeadline.value;

    // ソートして再描画
    loadTasks();

    // LocalStorageに保存
    localStorage.setItem("todoList", JSON.stringify(tasks));
  });

  tddeadline.appendChild(inputDeadline);

  tr.appendChild(tdcheckbox);
  tr.appendChild(tdtaskName);
  tr.appendChild(tdstatus);
  tr.appendChild(tddeadline);
  tr.appendChild(tdcomment);

  taskListBody.appendChild(tr);
}

//ページ読み込み時に保存されている全タスクを描画する
function loadTasks() {
  sortTasksByDeadline();

  taskListBody.innerHTML = "";

  tasks.forEach((task, index) => {
    renderTask(task, index);
  });
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

function sortTasksByDeadline() {
  tasks.sort((a, b) => {
    // 未設定のDeadlineは最後に配置
    if (!a.deadline) return 1;
    if (!b.deadline) return -1;

    return a.deadline.localeCompare(b.deadline);
  });
}
