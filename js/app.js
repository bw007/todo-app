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

// Check localStorage ************
if (localStorage.getItem("items")) {
  items = [...JSON.parse(localStorage.getItem("items"))];
  render(items);
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
  
  items.push({...item, done: false, failed: false});
  console.log(items);
  localStorage.setItem("items", JSON.stringify(items));
  render(items, items.length - 1);
};

// FILTER ************************
let keywords = ["all", "done", "failed"];
filterBtns.forEach((filterBtn, i) => {
  filterBtn.onclick = (e) => {
    filter(e.target.dataset[keywords[i]])
  };
});

function filter(keywrd) {
  if (localStorage.getItem("items")) {
    const fl = items.filter((item) => item[keywrd] === true);
    if (keywrd == "all") {
      render(items);
    } else {
      render(fl)
    }
  }
}
// *******************************

// Rendering UI *****************
function render(items, len) {
  todoItem.innerHTML = "";

  items.forEach((item, i) => {
    const { title, text, date, user } = item;

    todoItem.innerHTML += `
      <section class="todo__item ${len == i ? "popup" : ""}">
        <div class="todo-item__icons">
          <img class="todo-item__edit" src="../img/pencil.svg" />
          <img class="todo-item__remove" src="../img/remove.svg" />
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
// *********************
