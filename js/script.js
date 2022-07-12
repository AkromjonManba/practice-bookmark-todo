const elForm = document.querySelector(".form");
const elInput = document.querySelector(".input");
const elList = document.querySelector(".list");
const allBtn = document.querySelector(".all__lists");
const allComplatedBtn = document.querySelector(".all_complated");
const allUncomplatedBtn = document.querySelector(".all_uncomplated");
const btnGroup = document.querySelector(".btn-group");
const showBtn = document.querySelector(".showBtn");
const modal = document.querySelector(".modal");
const savedLocalStroge = JSON.parse(localStorage.getItem("saveTodo"));
// let AllBookmarkBtn = document.querySelector('.AllBookmarkBtn')
let todos = savedLocalStroge || [];
let bookMarkPanel = [];

const appendToDom = (array, node) => {
  allBtn.textContent = todos.length;
  allComplatedBtn.textContent = todos.filter((e) => e.isComplete).length;
  allUncomplatedBtn.textContent = todos.filter((e) => !e.isComplete).length;
  elList.innerHTML = "";
  array.forEach((todo) => {
    let newItem = document.createElement("li");
    let newSpan = document.createElement("span");
    let newButton = document.createElement("button");
    let newInput = document.createElement("input");
    let newContent = document.createElement("div");
    let newBookmarkBtn = document.createElement("button");
    // Start TextContents title inputCheckBox and deleteBtn
    newSpan.textContent = todo.name;
    newButton.textContent = `Delete`;
    newInput.type = "checkbox";
    newButton.dataset.todoId = todo.id;
    newInput.dataset.todoId = todo.id;
    newBookmarkBtn.dataset.todoId = todo.id;
    // End TextContents title inputCheckBox and deleteBtn

    // Start newBookmark button and menu
    newBookmarkBtn.innerHTML = '<i class="fa-solid fa-bookmark"></i>';
    // End newBookmark button and menu

    // set Attribute all inputCheckBox title and delete btn
    newButton.setAttribute("class", "delete-btn");
    newInput.setAttribute("class", "js-input");
    newItem.setAttribute("class", "li__box");
    newBookmarkBtn.setAttribute("class", "bookmark");
    // set Attribute all inputCheckBox title and delete btn
    newItem.appendChild(newInput);
    newItem.appendChild(newSpan);
    newItem.appendChild(newButton);
    newItem.appendChild(newBookmarkBtn);
    node.appendChild(newItem);

    if (todo.isComplete) {
      newSpan.style.textDecoration = "line-through";
      newInput.checked = true;
    }
    if (todo.isBookMark) {
      newItem.style.backgroundColor = "red";
    }
  });
};

appendToDom(todos, elList);
let message = document.querySelector(".msg");

elForm.addEventListener("submit", (evt) => {
  let elInputVal = elInput.value;
  elList.innerHTML = "";
  evt.preventDefault();

  if (elInputVal == "" || elInputVal == null) {
    message.textContent =
      "Iltmos malumot kirgizing) hamma malumotlaringiz saqlangan malumont kirgasangiz kora olasiz";
    message.classList.add("active");
    return;
  } else {
    message.textContent = "";
    message.classList.remove("active");
  }

  let obj = {
    id: todos.length ? todos[todos.length - 1].id + 1 : 0,
    name: elInputVal,
    isComplete: false,
    isBookMark: false,
  };

  todos.push(obj);
  appendToDom(todos, elList);
  localStorage.setItem("saveTodo", JSON.stringify(todos));
  elInput.value = "";
});

elList.addEventListener("click", (evt) => {
  if (evt.target.matches(".delete-btn")) {
    let deleteUniquiId = evt.target.dataset.todoId;
    let findedItem = todos.findIndex((el) => el.id == deleteUniquiId);
    todos.splice(findedItem, 1);
    localStorage.setItem("saveTodo", JSON.stringify(todos));
    appendToDom(todos, elList);
  }
  if (evt.target.matches(".js-input")) {
    let checkEdId = evt.target.dataset.todoId;
    let findedChecked = todos.find((el) => el.id == checkEdId);
    findedChecked.isComplete = !findedChecked.isComplete;
    appendToDom(todos, elList);
    localStorage.setItem("saveTodo", JSON.stringify(todos));
  }
  if (evt.target.matches(".bookmark")) {
    let checkedId = evt.target.dataset.todoId;
    let findedItem = todos.find((el) => el.id == checkedId);
    findedItem.isBookMark = !findedItem.isBookMark;
    localStorage.setItem("saveTodo", JSON.stringify(todos))
    appendToDom(todos, elList);
  }
});

btnGroup.addEventListener("click", (evt) => {
  if (evt.target.matches(".all__listsBtn")) {
    appendToDom(todos, elList);
  }
  if (evt.target.matches(".all_complatedBtn")) {
    let filterEd = todos.filter((el) => el.isComplete);
    appendToDom(filterEd, elList);
  }
  if (evt.target.matches(".all_uncomplatedBtn")) {
    let filterEd = todos.filter((el) => !el.isComplete);
    appendToDom(filterEd, elList);
  }if(evt.target.matches(".savedBookmark")) {
    let filtereEd = todos.filter((el) => el.isBookMark);
    appendToDom(filtereEd,elList)
  }
  if (evt.target.matches(".remove_btn")) {
    localStorage.setItem("saveTodo", JSON.stringify(todos));
    location.reload();
    appendToDom(todos, elList);
  }
});

function createModal() {
  let modal = document.createElement("div"),
    heading = document.createElement("h2"),
    field = document.createElement("div"),
    button = document.createElement("button");

  modal.classList.add("modal");
  heading.classList.add("heading");
  button.classList.add("modalBtn");
  field.classList.add("field");

  heading.textContent = "bookmark";
  button.textContent = "X";
  document.body.appendChild(modal);
  modal.appendChild(heading);
  modal.appendChild(button);
  modal.appendChild(field);
  
  let closeBtn = document.querySelector(".modalBtn");

  showBtn.addEventListener("click", ()=> {
    modal.style.display = "block"
  })
  closeBtn.addEventListener("click", ()=> {
    modal.style.display = "none"
  })
}

createModal();
