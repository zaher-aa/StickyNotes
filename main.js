const stickyNotes = () => {
  const form = document.forms[0];
  const inputField = document.getElementById("input-field");
  const tasksWrapper = document.querySelector(".tasks");
  const tasksCount = document.querySelector(".tasks-count");
  const completedTasks = document.querySelector(".completion-count");
  const deleteAll = document.getElementById("delete-all");
  let randomIdNumber;

  if (localStorage.Tasks) renderElements(false, JSON.parse(localStorage.Tasks));
  if (localStorage.tasksCount) tasksCount.textContent = localStorage.tasksCount;
  if (localStorage.completedTasks)
    completedTasks.textContent = localStorage.completedTasks;
  if (localStorage.delActive === "active") deleteAll.classList.add("active");

  form.onsubmit = (e) => {
    e.preventDefault();
    if (inputField.value.trim() === "") return;
    randomIdNumber = Date.now();
    renderElements(true);
    addToLocalStorage();
  };

  // Update DOM and Locale Storage
  document.addEventListener("click", (e) => {
    if (!e.target.matches("#delete, .task") && !e.target.matches(".task span"))
      return;
    if (e.target.matches("#delete")) {
      e.target.parentElement.remove();
      tasksCount.textContent--;
    }
    if (e.target.matches(".task")) e.target.classList.toggle("done");
    else e.target.parentElement.classList.toggle("done");
    updateLocalStorage();
  });

  // Delete All Function
  deleteAll.addEventListener("click", (e) => {
    if (e.currentTarget.classList.contains("active")) {
      tasksWrapper.innerHTML = "";
      let span = document.createElement("span");
      span.append(document.createTextNode("No Tasks To Show"));
      tasksWrapper.append(span);
      tasksCount.textContent = 0;
      completedTasks.textContent = 0;
      localStorage.clear();
      e.currentTarget.classList.remove("active");
    }
  });

  // Render Elements Function
  function renderElements(newElement, elements) {
    if (tasksWrapper.children[0].tagName === "SPAN")
      tasksWrapper.children[0].remove();
    // Add a new element to the DOM.
    if (newElement) {
      let task = document.createElement("div");
      task.className = "task";
      task.setAttribute("data-id", randomIdNumber);
      let span = document.createElement("span");
      span.textContent = inputField.value;
      let del = document.createElement("button");
      del.id = "delete";
      del.textContent = "Delete";
      task.append(span, del);
      tasksWrapper.append(task);
      tasksCount.textContent++;
      updateLocalStorage(true);
      return;
    }
    // Render elements which are stored in the localStorage.
    elements.forEach((el) => {
      let task = document.createElement("div");
      task.classList.add("task");
      task.setAttribute("data-id", el.id);
      if (el.done) task.classList.add("done");
      let span = document.createElement("span");
      span.textContent = el.title;
      let del = document.createElement("button");
      del.id = "delete";
      del.textContent = "Delete";
      task.append(span, del);
      tasksWrapper.append(task);
    });
  }

  function addToLocalStorage() {
    let currentTask = {
      id: randomIdNumber,
      title: inputField.value,
      done: false,
    };
    inputField.value = "";
    if (localStorage.Tasks) {
      localStorage.setItem(
        "Tasks",
        JSON.stringify([...JSON.parse(localStorage.Tasks), currentTask])
      );
    } else {
      localStorage.setItem("Tasks", JSON.stringify([currentTask]));
    }
  }

  function updateLocalStorage(newElement) {
    let num = 0;
    let updatedTasks = [...tasksWrapper.children].map((task) => {
      return {
        id: +task.getAttribute("data-id"),
        title: task.firstChild.textContent,
        done: task.classList.contains("done"),
      };
    });
    if (updatedTasks.length !== 0) {
      if (newElement) num = 1;
      localStorage.setItem(
        "Tasks",
        JSON.stringify(updatedTasks.slice(0, updatedTasks.length - num))
      );
    } else {
      localStorage.removeItem("Tasks");
      let span = document.createElement("span");
      span.append(document.createTextNode("No Tasks To Show"));
      tasksWrapper.append(span);
    }
    completedTasks.textContent = [...tasksWrapper.children].reduce(
      (acc, cur) => (cur.classList.contains("done") ? acc + 1 : acc),
      0
    );
    localStorage.setItem("tasksCount", +tasksCount.textContent);
    localStorage.setItem("completedTasks", completedTasks.textContent);
    if (+tasksCount.textContent > 0) {
      deleteAll.classList.add("active");
      localStorage.setItem("delActive", "active");
    } else {
      deleteAll.classList.remove("active");
      localStorage.removeItem("delActive");
    }
  }
};

stickyNotes();
