const form = document.querySelector("#task-form");
const taskListBody = document.querySelector("#task-list-body");

form.addEventListener("submit", (event) => {
  //関数実行後にページをロードしない
  event.preventDefault();

  let taskName = document.querySelector("#taskName");
  let priority_select = document.querySelector("#priority-select");
  let deadline = document.querySelector("#deadline");
  let comment = document.querySelector("#comment");

  //コンソールデバッグ用
  console.log(taskName.value);
  console.log(priority_select.value);
  console.log(deadline.value);
  console.log(comment.value);

  const tr = document.createElement("tr");

  const tdtaskName = document.createElement("td");
  const tdpriority = document.createElement("td");
  const tddeadline = document.createElement("td");
  const tdcomment = document.createElement("td");

  tdtaskName.textContent = taskName.value;

  switch (priority_select.value) {
    case "low":
      tdpriority.textContent = "低";
      break;
    case "middle":
      tdpriority.textContent = "中";
      break;
    case "high":
      tdpriority.textContent = "高";
      break;
    default:
      console.log("switch構文エラー");
  }

  tddeadline.textContent = deadline.value;
  tdcomment.textContent = comment.value;

  tr.appendChild(tdtaskName);
  tr.appendChild(tdpriority);
  tr.appendChild(tddeadline);
  tr.appendChild(tdcomment);

  taskListBody.appendChild(tr);

  // 入力欄をリセット
  form.reset();
});
