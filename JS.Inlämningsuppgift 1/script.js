const firstName = document.querySelector('#fname');
const lastName = document.querySelector('#lname');
const email = document.querySelector('#email');
const output = document.querySelector('#output');
let users = [];



const renderUsers = () => {
  output.innerHTML = '';
  users.forEach(user => {

    let html = `
    <div class="user">
      <div class="text">
        <h3>${user.fname} ${user.lname}</h3>
        <small>${user.email}</small>
      </div>
      <div class="buttons">
        <button type="button"class="btn btn-danger deletebtn">Delete</button>
      </div>
    </div>
`
    output.innerHTML += html
  })
}

const validateFirstname = id => {
  const input = document.querySelector('#fname');
  const error = document.querySelector('#fname-error');

  if(input.value == ''|| input.value == null) {
    error.innerText = 'Please enter your First name';
    return false;
  }
  else {
    error.innerText = '';
    return true;
  }
 
}

const validateLastname = id => {
  const input = document.querySelector('#lname');
  const error = document.querySelector('#lname-error');

  if(input.value == ''|| input.value == null) {
    error.innerText = 'Please enter your Last name';
    return false;
  }
  else {
    error.innerText = '';
    return true;
  }
 
}

const validateEmail = id => {
  const input = document.querySelector('#email');
  const error = document.querySelector('#email-error');
  let regEx = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

  if (regEx.test(input.value)) {
    error.innerText = '';
    return true;
  }
  else {
    error.innerText = 'Please enter a valid Email'

  }
}

const validate = () => {

  document.querySelectorAll('input').forEach(input => {
  
    if(input.type === "text") {
      validateFirstname(input.id);
    }

    if(input.type === "text") {
      validateLastname(input.id);
    }
  
    if(input.type === "email") {
      validateEmail(input.id);
    }
    
  })
}

const createUser = (fname, lname, email) => {
  let user = {
    id: Date.now().toString(),
    fname,
    lname,
    email
  }

  users.push(user);
  console.log(users);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  validate();

  if(validateFirstname('fname') && validateLastname('lname') && validateEmail('email')) {
    
    createUser(firstName.value, lastName.value, email.value);
    renderUsers();
    form.reset();
    firstName.focus();

  }
})


output.addEventListener('click', todoButtons);

function todoButtons(e) {
  const item = e.target;

  if (item.classList.contains('deletebtn')) {
    const form = item.parentElement.parentElement;
    form.remove();
  }


}

