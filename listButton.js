const form = document.querySelector("#task-form");
const taskListBody = document.querySelector("#task-list-body");

//ローカルデータから保存済みのタスクデータを取得する。もしなければ空配列
let tasks = JSON.parse(localStorage.getItem("todoList")) || [];

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

  const tr = document.createElement("tr");

  const tdcheckbox = document.createElement("td");
  const tdtaskName = document.createElement("td");
  const tdpriority = document.createElement("td");
  const tddeadline = document.createElement("td");
  const tdcomment = document.createElement("td");

  // checkboxを追加する
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  checkbox.addEventListener("change", () => {
    tr.classList.toggle("completed", checkbox.checked);
  });

  tdcheckbox.appendChild(checkbox);

  tdtaskName.textContent = taskName.value;
  tdpriority.textContent =
    priority_select.value === "low"
      ? "低"
      : priority_select.value === "medium"
        ? "中"
        : "高";
  tddeadline.textContent = deadline.value;
  tdcomment.textContent = comment.value;

  tdpriority.classList.add(`priority-${priority_select.value}`);

  tr.appendChild(tdcheckbox);
  tr.appendChild(tdtaskName);
  tr.appendChild(tdpriority);
  tr.appendChild(tddeadline);
  tr.appendChild(tdcomment);

  taskListBody.appendChild(tr);

  // 入力欄をリセット
  form.reset();
});

const button = document.querySelector(".button-bw");

button.addEventListener("click", () => {
  document.body.classList.toggle("reverse");
});
