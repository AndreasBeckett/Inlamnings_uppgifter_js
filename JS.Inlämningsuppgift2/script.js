const form = document.querySelector("#form")
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
let todos = [];


//hämtar data/todos från jspn placeholder och bergränsar till 10
const fetchTodos = () => {
  fetch('https://jsonplaceholder.typicode.com/todos')
  .then(res => res.json())
  .then(data => {
    data = data.slice(0, 10)
    todos = data;
    console.log(todos);

    renderTodos();
  })
}
fetchTodos();


//funktion som skapar todosen 
const renderTodos = () => {
  todoList.innerHTML = '';
  todos.forEach(todo => {

    let todoItem = 
    `
        <div class="d-flex justify-content-between todo-item"> 
          <h4 class="todo-text">${todo.title}</h4>
          <li>
            <button class="btn btn-success checkbtn">
              <i class="fa fa-check"></i>
            </button>
            <button class="btn btn-danger deletebtn">
              <i class="fa fa-trash-o de"></i>
            </button>
          </li>
        </div>
    `
    todoList.insertAdjacentHTML('beforeend', todoItem);
  })
}


const createTodo = (title) => {
  fetch('https://jsonplaceholder.typicode.com/todos',{
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({
      title,
      completed: false
    })
  })
  .then(res => res.json())
  .then(data => {
    console.log(data)
    todos.unshift(data);
    renderTodos();
  })
}


//gör så att den nya todon läggs till listan (om den har ett värde)
form.addEventListener('submit', e => {
  e.preventDefault();

  const error = document.querySelector('#error-text');

  if(todoInput.value == ''|| todoInput.value == null) {
    alert("Please enter a to-do");
  }
  else {
    createTodo(todoInput.value);
    todoInput.value = '';
    error.innerText = ' ';
  }

})



todoList.addEventListener('click', todoButtons);

function todoButtons(e) {
  const item = e.target;
  const done = item.parentElement.children[0];


  //markerar todo som klar
  if (item.classList.contains('checkbtn')) {
    const todo = item.parentElement.parentElement;
    const check = item;

    todo.classList.toggle("completed");
    check.classList.toggle("check-completed");
  }

  //tar bort todo från listan (om den är markerad som klar)
  if (item.classList.contains('deletebtn')) {
    console.log(done);
    if(done.classList.contains('check-completed')) {
      const todo = item.parentElement.parentElement;
      todo.remove();
    }
  }

}


