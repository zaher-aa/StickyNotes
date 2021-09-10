const app = () => {
  const input = document.querySelector("main .input-holder input");
  const addBtn = document.querySelector("main .input-holder button");
  const tasksParent = document.querySelector("main .all-tasks");
  let tasksCount = document.querySelector(".tasks-count");
  let comletedCount = document.querySelector(".completion-count");
  let task;

  // Add A Task
  function runApp() {
    let addableText = input.value;

    // Check if the user has written something or not, if yes then add whatever he written otherwise do nothing
    if (addableText.trim().length > 0) {
      // If the "No Tasks To Show 'span'" element exists then remove it otherwise do nothing
      if (document.querySelector(".all-tasks span")) {
        document.querySelector(".all-tasks span").remove();
      }
      // Create task
      task = document.createElement("div");
      task.className = "task";

      // Create textElement
      let textElement = document.createElement("div");
      textElement.className = "text";

      // Create delElement
      let delElement = document.createElement("button");
      delElement.className = "delete";

      // Create textElementText
      let textElementText = document.createTextNode(addableText);
      textElement.appendChild(textElementText);

      // Create delElementText
      let delElementText = document.createTextNode("Delete");
      delElement.appendChild(delElementText);

      // Append textElement to task
      task.appendChild(textElement);
      // Append delElement to task
      task.appendChild(delElement);

      // Append task to tatasksParentsk
      tasksParent.insertBefore(task, tasksParent.firstElementChild);

      // Remove all letters from the input field after adding the task
      input.value = "";

      // Increase the tasks count by one every time a new task is added
      tasksCount.innerHTML++;

      // Make input field in focus mode every time a new task is added
      input.focus();

      // Delete a task
      delElement.onclick = function () {
        this.parentElement.remove();
        tasksCount.innerHTML--;
        if (tasksParent.childElementCount === 0) {
          let noTasks = document.createElement("span");
          let noTasksText = document.createTextNode("No Tasks To Show");
          noTasks.appendChild(noTasksText);
          tasksParent.appendChild(noTasks);
        }
      };
    } else {
      alert("You Should Write Something IN Order To Add It To The List.");
    }

    // Finish a task
    task.onclick = function () {
      this.classList.toggle("done");
      comletedCount.innerHTML =
        document.querySelectorAll(".all-tasks .done").length;
    };
  }

  // Run the app when the key "Enter" is pressed.
  input.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) runApp();
  });

  // Run the app when the "Button" is clicked.
  addBtn.onclick = () => runApp();
};

app();
