// created elements and append

let mainDiv = document.createElement("div"),
  title = document.createElement("h1"),
  dateTime = document.createElement("span"),
  date = new Date(),
  mainList = document.createElement("div"),
  addList = document.createElement("div"),
  container = document.createElement("div"),
  addSpan = document.createElement("span");

// embty array
const projects = getDataFromLocalStorage();
addElementsToPageFrom(projects);

addSpan.appendChild(document.createTextNode("+"));
addList.append(addSpan);
title.append(document.createTextNode("Hello Noor"));

document.body.prepend(mainDiv);
mainDiv.append(title, dateTime, mainList);
dateTime.append(date.toUTCString());
mainList.append(addList, container);
// Style File

document.body.style.backgroundColor = "#ccc";
document.body.style.margin = "0px";
//main div
mainDiv.style.cssText =
  "background-color: #F8F8F8; width:350px; height:100%;min-height: 100vh; margin: 0 auto; position:relative";
//tilte
title.style.cssText =
  "padding:50px 30px 0 30px; margin: 0 0 10px; color: #4A5261;";
// span
dateTime.style.cssText = "color: #C9CBCF;padding:40px 30px 0 30px";
// list styles
mainList.style.cssText = "margin-top:10px; display:flex; flex-wrap: wrap;";
container.style.cssText = "display:flex; flex-wrap: wrap;";
addList.style.cssText =
  "box-shadow:#f30505d1 0px 0px 3px 0px;position: absolute;top:0% ;left:87%; width: 45px;height: 36px;background-color: rgb(239 22 6);color:#fff;display:flex ;cursor:pointer; justify-content:space-around;border-radius: 1px 0px 1px 25px;";
addSpan.style.cssText = "font-size: 25px;align-self:center;font-weight: bold";

// add pop-up list content

// create elements
let overlay = document.createElement("div"),
  createTodoListContainer = document.createElement("div"),
  headerNewList = document.createElement("h3"),
  cancelList = document.createElement("span"),
  formAddList = document.createElement("form"),
  nameForTextInput = document.createElement("span"),
  textIputeForNewList = document.createElement("input"),
  massage = document.createElement("small"),
  btnNewList = document.createElement("button");

textIputeForNewList.setAttribute("type", "text");
textIputeForNewList.setAttribute("placeholder", "List Name");
btnNewList.setAttribute("type", "submit");
btnNewList.setAttribute("value", "Submit");

// styles
overlay.style.cssText =
  "background-color: #0404047a; width:350px; height:100%; z-index: 2; position: fixed; top:0";
createTodoListContainer.style.cssText =
  "width:250px; height:180px; background-color: #fff; margin:0 auto; z-index: 3;position: absolute;top: 35%;left: 15%; border-radius: 10px; ";
cancelList.style.cssText =
  "position: absolute;cursor: pointer; transform: translate(110%, 5%);font-size: 20px;";
formAddList.style.cssText = "text-align: center;";
headerNewList.style.cssText =
  "text-align: center; margin: 10px 0 15px; font-size: 25px;";

nameForTextInput.style.cssText = "display: block;padding-bottom: 10px;";
textIputeForNewList.style.cssText =
  "padding: 5px 10px;border: 1px solid #ccc;width: 80%;border-radius: 2px;outline: none;";
massage.style.cssText = "display:block; color:red; padding-top:3px";
btnNewList.style.cssText =
  "cursor: pointer; margin-top: 10px;margin-left: 25%;display: block;background-color: #059505;outline: none;border: none;color: #fff;padding: 8px 30px;border-radius: 15px; font-weight:bold;";

// function for create pop-up new file
addList.addEventListener("click", () => {
  //append elemnts
  overlay.append(createTodoListContainer);
  mainDiv.append(overlay);
  createTodoListContainer.append(cancelList, headerNewList, formAddList);
  formAddList.append(
    nameForTextInput,
    textIputeForNewList,
    massage,
    btnNewList
  );
  cancelList.textContent = "x";
  headerNewList.textContent = "New List";
  nameForTextInput.textContent = "List Name";
  btnNewList.textContent = "Add List";
  textIputeForNewList.value = "";
});

// delete the list container
cancelList.addEventListener("click", () => {
  overlay.remove();
  createTodoListContainer.remove();
});

// submit data to create the file list
formAddList.addEventListener("submit", (e) => {
  e.preventDefault();

  if (textIputeForNewList.value.trim() !== "") {
    massage.style.cssText = "display:none;";
    textIputeForNewList.style.borderColor = "green";
    overlay.remove();
    createTodoListContainer.remove();
    addNewFileToArray(textIputeForNewList.value);
  } else {
    textIputeForNewList.style.borderColor = "red";
    massage.style.cssText = "display:block; color:red; padding-top:3px";
    massage.textContent = "This input is required";
  }
});

// creat data and add to array
function addNewFileToArray(textIputeForNewList) {
  // add data
  const task = {
    id: Date.now(),
    title: textIputeForNewList,
    tasks: [],
    completed: false,
  };
  // push task to empty array
  console.log(projects);
  projects.push(task);

  //function for local storage
  addDataToLocalStorageFrom(projects);
  // add task to page
  addElementsToPageFrom(projects);
}

function create_file(task) {
  // create the elements of file list
  let addNewFile = document.createElement("div"),
    icon = document.createElement("div"),
    namFile = document.createElement("h3"),
    deletlist = document.createElement("i"),
    show = document.createElement("div"),
    showMore = document.createElement("i");

  deletlist.dataset.id = task.id;
  show.dataset.id = task.id;
  addNewFile.setAttribute("draggable", "true");
  deletlist.classList.add("fa");
  deletlist.classList.add("fa-times");
  showMore.classList.add("fa");
  showMore.classList.add("fa-info");

  // style for list file
  addNewFile.style.cssText =
    "margin-bottom: 15px;margin-left:10px ;width:160px;height:160px;background-color: #fff;border-radius: 5px;";
  deletlist.style.cssText =
    " font-size: 20px;position: absolute;cursor:pointer; transform: translate(55%,5%);";
  icon.style.cssText =
    "background-color: #ccc;width: 55px;height: 55px;border-radius: 50%; margin:10px auto";
  namFile.style.textAlign = "center";
  show.style.cssText =
    "display: flex;justify-content: space-around; color:#2c2cf3;cursor: pointer";

  addNewFile.dataset.id = task.id;
  addNewFile.append(deletlist, icon, namFile, show);
  show.append(showMore);
  showMore.textContent = "  Show More";
  namFile.textContent = task.title;

  // pop up for close file

  // creat elemnt of popups
  let popupDeletFile = document.createElement("div"),
    h2fordeletfile = document.createElement("h2"),
    btnsDeletFile = document.createElement("div"),
    btndeletfileyes = document.createElement("button"),
    btndeletfileno = document.createElement("button");

  h2fordeletfile.textContent = "Do You Want Delete This File ?";
  btndeletfileyes.textContent = "Yes";
  btndeletfileno.textContent = "No";

  // styling for popups

  popupDeletFile.style.cssText =
    "flex-wrap: wrap;display:flex;width:250px; height:150px; background-color: #fff; margin:0 auto; z-index: 3;position: absolute;top: 35%;left: 15%; border-radius: 10px; ";

  h2fordeletfile.style.cssText =
    "text-align: center; margin: 10px 0 15px; font-size: 25px;";

  btnsDeletFile.style.margin = "0 auto";

  btndeletfileyes.style.cssText =
    "cursor:pointer;margin-right: 30px;padding: 7px 30px;background-color:#03a709;border: none;border-radius: 5px;color: #fff;font-size: 15px;font-weight: bold;";

  btndeletfileno.style.cssText =
    "cursor:pointer;padding: 7px 30px;background-color: red;border: none;border-radius: 5px;color: #fff;font-weight: bold;font-size: 15px;";

  // delete the list file
  deletlist.addEventListener("click", () => {
    mainDiv.append(overlay);
    overlay.append(popupDeletFile);
    popupDeletFile.append(h2fordeletfile, btnsDeletFile);
    btnsDeletFile.append(btndeletfileyes, btndeletfileno);

    btndeletfileyes.addEventListener("click", () => {
      overlay.remove();
      popupDeletFile.remove();

      deletListWith(addNewFile.dataset.id);
      addNewFile.remove();
    });

    btndeletfileno.addEventListener("click", () => {
      overlay.remove();
      popupDeletFile.remove();
    });
  });

  // start content of files
  show.addEventListener("click", () => {
    const projectId = show.dataset.id;

    const selectedProject = targetelement(projectId);

    if (typeof selectedProject.tasks !== "undefined") {
      addTasksToPageFrom(selectedProject.tasks);
      localStorage.setItem("project-id", projectId);

      mainList.append(contentfile);
      contentfile.append(
        backwardarow,
        h1formaintitle,
        addEvent,
        hr,
        containeroftasks
      );
      h1formaintitle.textContent = namFile.textContent;
      addEvent.textContent = "Add New Task";
      contentfile.animate(newspaperSpinning, newspaperTiming);
      addEvent.append(plusAddEvent);
    }
  });

  return addNewFile;
}

function addElementsToPageFrom(projects) {
  container.innerHTML = "";
  if (projects.length === 0) {
    console.log("theres is not data");
    return;
  }

  // loopingon array of files
  for (const project of projects) {
    // append elemnts
    const addNewFile = create_file(project);

    container.append(addNewFile);
  }
}

// create content of file
let contentfile = document.createElement("div"),
  h1formaintitle = document.createElement("h1"),
  backwardarow = document.createElement("i"),
  addEvent = document.createElement("div"),
  containeroftasks = document.createElement("div"),
  containerOfContent = document.createElement("div"),
  plusAddEvent = document.createElement("i"),
  hr = document.createElement("hr");

// create pop up for create new task
let contentPopupNewTask = document.createElement("div"),
  h1AddNewTask = document.createElement("h1"),
  formForNewTask = document.createElement("form"),
  textIputeForNewTask = document.createElement("input"),
  btnforAddTask = document.createElement("button"),
  backwardarowForNewTask = document.createElement("i");

textIputeForNewTask.setAttribute("type", "text");
textIputeForNewTask.setAttribute("placeholder", "Task Name");
btnforAddTask.setAttribute("type", "submit");
btnforAddTask.setAttribute("value", "Submit");

h1AddNewTask.textContent = "Add New Task";
btnforAddTask.textContent = "Add Task";
backwardarow.classList.add("fa");
backwardarow.classList.add("fa-arrow-left");
backwardarowForNewTask.classList.add("fa");
backwardarowForNewTask.classList.add("fa-arrow-left");
plusAddEvent.classList.add("fa");
plusAddEvent.classList.add("fa-plus");

// styling of content of files
h1formaintitle.style.cssText =
  "text-align: center;margin: 40px 0;font-size: 40px;";
backwardarow.style.cssText =
  "cursor: pointer;font-size: 20px;position: absolute;top: 0;margin-left: 15px;margin-top: 15px;color: #a39f9f;";
contentfile.style.cssText = overlay.style.cssText;
contentfile.style.backgroundColor = "#fff";
addEvent.style.cssText =
  "font-size: 25px;font-weight: bold;margin-left: 15px; margin-bottom:25px;";
plusAddEvent.style.cssText =
  "margin-left: 42%;color: rgb(163, 159, 159);cursor: pointer;";

//style of pop up add new task
contentPopupNewTask.style = createTodoListContainer.style.cssText;
backwardarowForNewTask.style = backwardarow.style.cssText;
h1AddNewTask.style = "text-align: center;margin-top:40px;font-size: 25px;";
formForNewTask.style = formAddList.style.cssText;
textIputeForNewTask.style = textIputeForNewList.style.cssText;
btnforAddTask.style = btnNewList.style.cssText;
btnforAddTask.style.backgroundColor = "rgb(247 54 40)";

// function for backward arrow
backwardarow.addEventListener("click", () => {
  contentfile.animate(
    [
      // keyframes
      { transform: "translateX(0) scaleX(1)" },
      { transform: "translateX(50%) scaleX(0)" },
    ],
    {
      // timing options
      duration: 1000,
      iterations: 1,
    }
  );
  contentfile.remove();
});

backwardarowForNewTask.addEventListener("click", () => {
  contentPopupNewTask.animate(
    [
      // keyframes
      { transform: "translateX(0) scaleX(1)" },
      { transform: "translateX(50%) scaleX(0)" },
    ],
    {
      // timing options
      duration: 1000,
      iterations: 1,
    }
  );
  overlay.remove();
  contentPopupNewTask.remove();
});

// event to pop up to add  new task
addEvent.addEventListener("click", () => {
  mainList.append(overlay, contentPopupNewTask);
  contentPopupNewTask.append(
    backwardarowForNewTask,
    h1AddNewTask,
    formForNewTask
  );
  formForNewTask.append(textIputeForNewTask, massage, btnforAddTask);
  contentPopupNewTask.animate(newspaperSpinning, newspaperTiming);
});

// create new tasks

// submit data to create the new task
formForNewTask.addEventListener("submit", (e) => {
  e.preventDefault();

  if (textIputeForNewTask.value.trim() !== "") {
    massage.style.cssText = "display:none;";
    textIputeForNewTask.style.borderColor = "green";
    overlay.remove();
    contentPopupNewTask.remove();
    addNewTaskToArray(textIputeForNewTask.value);
  } else {
    textIputeForNewTask.style.borderColor = "red";
    massage.style.cssText = "display:block; color:red; padding-top:3px";
    massage.textContent = "This input is required";
  }
  textIputeForNewTask.value = "";
});

function addNewTaskToArray(textIputeForNewTask) {
  // add data to array
  const newTask = {
    id: Date.now(),
    title: textIputeForNewTask,
    completed: false,
  };
  const projectId = localStorage.getItem("project-id");
  const selectedProject = targetelement(projectId);
  const selectedProjectIndex = projects.indexOf(selectedProject);
  selectedProject.tasks.push(newTask);
  projects[selectedProjectIndex] = selectedProject;
  addDataToLocalStorageFrom(projects);

  addTasksToPageFrom(selectedProject.tasks);
}

function addTasksToPageFrom(tasks) {
  containeroftasks.innerHTML = "";
  if (tasks.length === 0) {
    console.log("theres is not data");
    return;
  }

  // loopingon array of files
  tasks.forEach((task) => {
    // create the elements of Tasks
    let hr2 = document.createElement("hr"),
      checkpointdiv = document.createElement("div"),
      checkpoint = document.createElement("input"),
      taskName = document.createElement("div"),
      textname = document.createElement("span"),
      dateoftask = document.createElement("span"),
      doneLine = document.createElement("span"),
      deletTask = document.createElement("i");

    const addNewTask = document.createElement("div");

    deletTask.classList.add("fa");
    deletTask.classList.add("fa-times");
    checkpoint.setAttribute("type", "checkbox");
    addNewTask.setAttribute("draggable", "true");
    addNewTask.dataset.id = task.id;

    addNewTask.append(checkpointdiv, taskName, deletTask);
    checkpointdiv.append(checkpoint);
    taskName.append(textname, dateoftask);
    dateoftask.append(date.toLocaleString());
    textname.textContent = task.title;

    newtask = containeroftasks.append(addNewTask, hr2);

    // styling
    addNewTask.style.cssText =
      "display: flex;align-items: center;justify-content: space-around;";

    deletTask.style.marginLeft = "5px";
    deletTask.style.cursor = "pointer";
    checkpoint.style.cssText = "outline: none";
    taskName.style.cssText =
      "display: flex;flex-direction: column;height: 100%;width: 75%;justify-content: space-around;";
    textname.style.fontSize = "20px";
    textname.style.alignSelf = "flex-start";
    dateoftask.style.cssText =
      "margin-top: 13px;align-self: flex-end; color:#ccc";

    doneLine.style.cssText =
      "background-color: black;width: 77%;height: 2px;position: absolute;transform: skewY(10deg);";

    //function for delete tasks
    deletTask.addEventListener("click", () => {
      let dataoftasks = addNewTask.dataset.id;
      const projectId = localStorage.getItem("project-id");
      const selectedProject = targetelement(projectId);
      const selectedProjectIndex = projects.indexOf(selectedProject);
      projects[selectedProjectIndex] = selectedProject;
      selectedProject.tasks = selectedProject.tasks.filter(
        (newTask) => newTask.id != dataoftasks
      );
      addDataToLocalStorageFrom(projects);
      addNewTask.remove();
      hr2.remove();
    });

    // function to check done or not
    checkpoint.onclick = function () {
      if (checkpoint.checked == true) {
        addNewTask.style.opacity = "0.2";
        addNewTask.append(doneLine);
      } else {
        addNewTask.style.opacity = "1";
        doneLine.remove();
      }
    };
  });
}

//function to add data of array to local storage
function addDataToLocalStorageFrom(projects) {
  window.localStorage.setItem("new-file", JSON.stringify(projects));
}

function getDataFromLocalStorage() {
  let data = JSON.parse(window.localStorage.getItem("new-file"));
  if (data !== [] && data !== null) {
    return data;
  }
  return [];
}

// delete from local storage
function deletListWith(listId) {
  const selectedProject = projects.filter((task) => task.id != listId);
  addDataToLocalStorageFrom(selectedProject);
}

// to target data-id
function targetelement(target) {
  return projects.find((task) => task.id == target);
}

// animation properity
const newspaperSpinning = [
  { transform: "translateX(50%) scaleX(0)" },
  { transform: "translateX(0) scaleX(1)" },
];

const newspaperTiming = {
  duration: 500,
  iterations: 1,
};
