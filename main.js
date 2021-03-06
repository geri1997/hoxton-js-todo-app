const state = {
  todos: [
    {
      name: "Go Shopping",
      completed: true,
      tags: ["chores"],
      user: "geri",
    },
    {
      name: "Go to the Doctor",
      completed: false,
      tags: ["health"],
      user: "nico",
    },
    {
      name: "Go for a run",
      completed: false,
      tags: ["health", "exercise"],
      user: "ed",
    },
  ],
  showCompleted: true,
  selectedTags: [],
  allTags: [],
  selectedUser: "",
};

//test

const formEl = document.querySelector("form");
const tagInput = document.querySelector('input[class="text-input tag"]');

let tagsCheckboxesDiv = document.createElement("div");
document.querySelector(".options-section").append(tagsCheckboxesDiv);
function createToDoItem(obj) {
  //Create <li>
  const todoLiEL = document.createElement("li");
  obj.completed
    ? todoLiEL.setAttribute("class", "todo completed")
    : todoLiEL.setAttribute("class", "todo");

  //Create div
  const todoDivCompletedCheckbox = document.createElement("div");
  todoDivCompletedCheckbox.setAttribute("class", "completed-section");
  //Create checkbox to toggle completed
  const isCompletedCheckboxEl = document.createElement("input");
  isCompletedCheckboxEl.setAttribute("type", "checkbox");
  isCompletedCheckboxEl.setAttribute("class", "completed-checkbox");
  //If todo is completed, make the checkbox checked
  isCompletedCheckboxEl.checked = obj.completed;
  //Create select user options

  //Create Text section div
  const textSectionDiv = document.createElement("div");
  textSectionDiv.setAttribute("class", "text-section");
  //Create paragraph that contains todo text
  const paragraphElThatContainsTodo = document.createElement("p");
  paragraphElThatContainsTodo.setAttribute("class", "text");
  paragraphElThatContainsTodo.textContent = obj.name;

  //Div with tooltip
  const divTooltipEl = document.createElement("div");
  divTooltipEl.setAttribute("class", "tooltip");
  divTooltipEl.textContent = "Press Enter or click anywhere to save changes!";

  //Create div for buttons
  const buttonSectionDivEl = document.createElement("div");
  buttonSectionDivEl.setAttribute("class", "button-section");
  //Create Edit Button
  const editButtonEl = document.createElement("button");
  editButtonEl.setAttribute("class", "edit");
  editButtonEl.textContent = "Edit";
  //Create Delete Button
  const deleteButtonEl = document.createElement("button");
  deleteButtonEl.setAttribute("class", "delete");
  deleteButtonEl.textContent = "Delete";
  //Create tag section
  const todoTagSection = document.createElement("p");
  todoTagSection.setAttribute("class", "todo-tags");
  todoTagSection.style.fontSize = "0.8rem";
  todoTagSection.textContent = "Tags: ";
  for (const tag of obj.tags) {
    todoTagSection.textContent += `${tag}\n`;
  }

  //Create user section
  const todoUserSection = document.createElement("p");
  todoUserSection.setAttribute("class", "todo-tags");
  todoUserSection.style.fontSize = "0.8rem";
  todoUserSection.style.padding = "0rem 1rem";
  todoUserSection.textContent = `User: ${obj.user}`;

  //Append Stuff
  if (!obj.completed) {
    document.querySelector("ul.todo-list").append(todoLiEL);
  } else {
    document.querySelector("ul.completed-list").append(todoLiEL);
  }
  todoLiEL.append(
    todoDivCompletedCheckbox,
    textSectionDiv,
    buttonSectionDivEl,
    todoTagSection,
    todoUserSection
  );
  todoDivCompletedCheckbox.append(isCompletedCheckboxEl);
  textSectionDiv.append(paragraphElThatContainsTodo);
  buttonSectionDivEl.append(editButtonEl, deleteButtonEl);

  //Toggle task complete or incomplete
  function toggleCompleteOrIncomplete() {
    isCompletedCheckboxEl.addEventListener("click", (e) => {
      e.stopPropagation();
      obj.completed = !obj.completed;
      localStorage.setItem("Todos", JSON.stringify(state.todos));
      todoLiEL.remove();
      createToDoItem(obj);
      // render()
    });
  }
  toggleCompleteOrIncomplete();

  //Edit Todo
  function editTodoName() {
    //Create Input Button for Edit
    function displayTooltip() {
      paragraphElThatContainsTodo.append(divTooltipEl);
    }
    function hideTooltip() {
      divTooltipEl.remove();
    }
    function saveEdit() {
      obj.name = paragraphElThatContainsTodo.textContent = editInputEl.value;
      hideTooltip();
      localStorage.setItem("Todos", JSON.stringify(state.todos));
      render();
    }
    const editInputEl = document.createElement("input");
    editInputEl.onfocus = displayTooltip;
    editInputEl.onblur = saveEdit;

    //Displays input box instead of text when click on edit button
    editButtonEl.addEventListener("click", (e) => {
      // obj.name = paragraphElThatContainsTodo.textContent = prompt('Enter new title for todo')
      //  obj.name=paragraphElThatContainsTodo.textContent
      //render()
      e.stopPropagation();
      editInputEl.value = obj.name;
      paragraphElThatContainsTodo.textContent = "";
      paragraphElThatContainsTodo.append(editInputEl);
      editInputEl.focus();
    });

    //Displays text with the value contained in the input box instead of input box as soon as 'Enter' is pressed.
    editInputEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        saveEdit();
      }
    });
  }
  editTodoName();

  deleteButtonEl.addEventListener("click", (e) => {
    e.stopPropagation();
    deleteItem(obj.name, todoLiEL);
  });
}
function deleteItem(text, item) {
  state.todos = state.todos.filter((todo) => {
    return todo.name !== text;
  });
  localStorage.setItem("Todos", JSON.stringify(state.todos));

  render();
  // item.remove()
}

function hideShowCompletedSection() {
  //Find the show completed input
  const showHideCompletedInputEl = document.querySelector(
    "input.show-completed-checkbox"
  );
  //Find the completed todos section
  const completedSection = document.querySelector("section.completed-section");
  //Hide or show completed todos depending on if checked or not
  showHideCompletedInputEl.addEventListener("click", function (e) {
    e.stopPropagation();
    if (state.showCompleted) {
      completedSection.style.display = "none";
      state.showCompleted = false;
      showHideCompletedInputEl.checked = false;
      // render()
    } else {
      state.showCompleted = true;
      completedSection.style.display = "block";
      showHideCompletedInputEl.checked = true;
      // render()
    }
  });
}

function addNewTask() {
  formEl.addEventListener("submit", (e) => {
    document.querySelector('input[type="search"]').value = "";
    e.preventDefault();
    let tagsArray = [];
    let splitArray = tagInput.value.split(" ");
    for (let item of splitArray) {
      tagsArray.push(item);
    }
    // for(let tag of tagsArray){
    //         state.allTags.push(tag)
    // }
    const newTask = {
      name: document.querySelector('input[type="text"]').value,
      completed: false,
      tags: tagsArray,
      user: document.querySelector("input.user").value,
    };

    state.todos.push(newTask);
    formEl.reset();
    localStorage.setItem("Todos", JSON.stringify(state.todos));
    render();
  });
}

//Filter tasks by search
function searchTasks() {
  const searchInput = document.querySelector('input[type="search"]');
  const searchForm = document.querySelector("form.search");
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
  });
  searchInput.addEventListener("input", (e) => {
    // const filteredArrayBySearch = state.todos.filter(function (todo){
    //     return todo.name.toLowerCase().includes(searchInput.value.toLowerCase())
    // })
    render();

    // document.querySelector('ul.todo-list').innerHTML=''
    // document.querySelector('ul.completed-list').innerHTML=''

    // for(let todo of filteredArrayBySearch){
    //     createToDoItem(todo)
    // }
    // renderTagFilteredTasks()
  });
}

render();
function render() {
  getTodosFromLocalStorage();
  document.querySelector("ul.todo-list").innerHTML = "";
  document.querySelector("ul.completed-list").innerHTML = "";
  let searchInput = document.querySelector('input[type="search"]');
  state.allTags = [];
  // state.selectedTags = []
  console.log(state.todos);
  let filteredTodos = state.todos
    .filter((todo) => {
      if (state.selectedTags.length === 0) {
        return true;
      }
      for (let selectedTag of state.selectedTags) {
        if (todo.tags.includes(selectedTag)) {
          return true;
        }
      }
      return false;
    })
    .filter((todo) => {
      if (state.selectedUser.length === 0 || state.selectedUser === "All") {
        return true;
      }
      return todo.user === state.selectedUser;
    })
    .filter((todo) => {
      return todo.name.toLowerCase().includes(searchInput.value.toLowerCase());
    });
  for (const todo of filteredTodos) {
    createToDoItem(todo);
  }
  updateUserList();
  fillAllTags();
  createTagCheckboxes();
  renderUserOptions();
}

function fillAllTags() {
  for (const todo of state.todos) {
    state.allTags.push(...todo.tags);
  }

  state.allTags = state.allTags
    .map((tag) => {
      return tag.toLowerCase();
    })
    .filter(function (tag, index) {
      return state.allTags.indexOf(tag) === index;
    });
}

addNewTask();
hideShowCompletedSection();
searchTasks();

function renderTagFilteredTasks() {
  // if (state.selectedTags.length===0){
  //     render()
  // }
  render();

  // for(let todo of state.todos){
  //     for(let selectedTag of state.selectedTags){
  //         if(todo.tags.includes(selectedTag)){
  //             createToDoItem(todo)
  //             break;
  //         }
  //     }
  // }
}

function createTagCheckboxes() {
  //Create checkboxes for tags
  document.querySelector(".tag-checkbox-div").innerHTML = "";
  let filteredArrayDuplicateTags = state.allTags.filter(function (tag, index) {
    return state.allTags.indexOf(tag) === index;
  });
  for (let tag of filteredArrayDuplicateTags) {
    let tagInputCheckbox = document.createElement("input");
    tagInputCheckbox.setAttribute("type", "checkbox");
    if (state.selectedTags.includes(tag)) {
      tagInputCheckbox.checked = true;
    }
    document.querySelector(".tag-checkbox-div").append(tag, tagInputCheckbox);
    tagInputCheckbox.addEventListener("click", (e) => {
      document.querySelector('input[type="search"]').value = "";
      document.querySelector("ul.todo-list").innerHTML = "";
      document.querySelector("ul.completed-list").innerHTML = "";

      if (tagInputCheckbox.checked) {
        state.selectedTags.push(tag);
        renderTagFilteredTasks();
      } else {
        state.selectedTags.splice(state.selectedTags.indexOf(tag), 1);
        renderTagFilteredTasks();
      }
    });
  }
}

function updateUserList() {
  let selectUser = document.querySelector("select");
  // state.selectedUser=''
  // selectUser.innerHTML = state.selectedUser

  selectUser.innerHTML = "";
  let defaultOption = document.createElement("option");
  defaultOption.textContent = "All";

  selectUser.append(defaultOption);
  for (let todo of state.todos) {
    const userOption = document.createElement("option");
    userOption.setAttribute("value", todo.user);
    userOption.textContent = todo.user;
    selectUser.append(userOption);
    if (userOption.textContent === state.selectedUser) {
      userOption.selected = true;
    }
  }
}

function renderUserOptions() {
  let selectUser = document.querySelector("select");
  // // state.selectedUser=''
  // selectUser.innerHTML = state.selectedUser
  // let defaultOption = document.createElement('option')
  // defaultOption.textContent = 'All'
  // selectUser.append(defaultOption)
  // for(let todo of state.todos){
  //     const userOption = document.createElement('option')
  //     userOption.setAttribute('value',todo.user)
  //     userOption.textContent = todo.user
  //     selectUser.append(userOption)

  // }
  selectUser.addEventListener("change", (e) => {
    document.querySelector("ul.todo-list").innerHTML = "";
    document.querySelector("ul.completed-list").innerHTML = "";
    state.selectedUser = selectUser.value;
    render();
    // for(let todo of state.todos){
    //     if(todo.user===state.selectedUser){
    //         createToDoItem(todo)
    //     }else if(state.selectedUser ==='All'||state.selectedUser ===''){
    //         render()
    //     }
    // }
  });
}

// selectUser.addEventListener('change',(e)=>{
//     state.selectedUser = userOption.value
//     // for(let todo of state.todos){
//     //     if(state.selectedUser===todo.user){
//     //         createToDoItem(todo)
//     //     }
//     // }
// })}
// function sv(){
//     state.selectedUser = this.value
// }

function getTodosFromLocalStorage() {
  if (localStorage.getItem("Todos") !== null)
    state.todos = JSON.parse(localStorage.getItem("Todos"));
  console.log(state.todos);
}
//test navigator.getBattery()
navigator
  .getBattery()
  .then((battery) => battery.charging)
  .then((a) => {
    if (a) {
      document.body.append("TEST BATTERY");
    }
  });

//test navigator.clipboard
navigator.clipboard.writeText('YOU HAVE BEEN HACKED!')
