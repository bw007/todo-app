const modal = document.querySelector(".modal"),
  modalClose = document.querySelector(".modal__close"),
  form = document.querySelector(".modal__main"),
  addBtn = document.querySelector(".modal__btn"),
  createBtn = document.querySelector(".todo__create-btn");

const todoItem = document.querySelector(".todo__items-inner"),
  filterBtns = document.querySelectorAll(".todo__filter li");

// MODAL *************************
createBtn.onclick = () => {
  modal.classList.add("modal--active");
};

modal.onclick = (e) => {
  if (e.target.classList.contains("modal--active")) {
    modal.classList.remove("modal--active");
  }
};

modalClose.onclick = () => {
  modal.classList.remove("modal--active");
};
// *******************************

let items = [];

// localStorage ************
if (localStorage.getItem("items")) {
  items = [...JSON.parse(localStorage.getItem("items"))];
  render(items);
}

const setLocalMemory = (arr) => {
  localStorage.setItem("items", JSON.stringify(arr));
}
// *******************************

const create = (e) => {
  modal.classList.remove("modal--active");
  e.preventDefault();

  let item = {};
  let data = new FormData(form);

  data.forEach((value, name) => {
    item[name] = value;
  });

  items.push({ ...item, id: Date.now()});
  setLocalMemory(items);
  render(items, items.length - 1);
};

// FILTER ************************
let keywords = ["all", "done", "failed"];

const bgBtn = (i) => {
  filterBtns.forEach(btn => {
    btn.style.color = "black";
    btn.style.background = "white";
  });
}

filterBtns.forEach((btn, i) => {
  if (i == 0) {
    filterBtns[i].style.color = "white";
    filterBtns[i].style.background = "red";
  }
  btn.onclick = (e) => {
    filter(e.target.dataset[keywords[i]]);
    bgBtn(i);
    filterBtns[i].style.color = "white";
    filterBtns[i].style.background = "red";
  };
});

function filter(keywrd) {
  if (localStorage.getItem("items")) {
    const fail = items.filter((item) => item["done"] !== "on");
    const done = items.filter((item) => item["done"] === "on");
    
    switch (keywrd) {
      case "done":
        render(done);
        break;
      case "failed":
        render(fail);
        break;
      default:
        render(items);
        break;
    }
  }
}
// *******************************


// Rendering UI *****************
function render(items, len) {
  let lenSet = "";
  if (typeof len == "object") {
    lenSet = {...len}
  }
  todoItem.innerHTML = "";
  items.forEach((item, i) => {
    const { title, text, date, user, done, id } = item;

    todoItem.innerHTML += `
      <section class="todo__item ${lenSet[id] ? "un-popup" : ""} ${done ? "todo__item--done" : ""} ${len == i ? "popup" : ""}">
        <div class="todo-item__icons">
          <img onclick="edit(event)" class="todo-item__edit" src="../img/pencil.svg" />
          <img onclick="remove(event)" class="todo-item__remove" data-${id}="${id}" src="../img/remove.svg" />
        </div>
        <h3 class="todo-item__headline">${title}</h3>
        <p class="todo-item__text">
          ${text}
        </p>
        <div class="todo-item__inner">
          <span class="todo-item__date">${date}</span>
          <span class="todo-item__user">${user}</span>
        </div>
      </section>
    `;
  });
}
// *******************************

// EDIT ITEM *********************

// *******************************

// DELETE ITEM *******************
const remove = (e) => {
  render(items, e.target.dataset);
  items = items.filter(fl => (fl.id != e.target.dataset[fl.id]));
  setLocalMemory(items);
  setTimeout(() => {
    render(items, );
  }, 350);
};
// *******************************
