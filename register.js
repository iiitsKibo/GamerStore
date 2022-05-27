// get elements
const name = document.querySelector("#name");
const password = document.querySelector("#password");
const email = document.querySelector("#email");
const errorElement = document.querySelector("#error");
const form = document.querySelector("#form");
const userArray = [];

// user constructor
function User(name, password, email) {
  this.name = name;
  this.password = password;
  this.email = email;
}

// add event listener to form
form.addEventListener("submit", (e) => {
  let messages = [];
  if (password.value.length < 6 || password.value.length > 12) {
    messages.push("Password must be between 6-12 characters");
  }
  // create new user
  const user = new User(
    name.value.toLowerCase(),
    password.value.toLowerCase(),
    email.value.toLowerCase()
  );

  // get current users from localstorage
  let currentUsers = JSON.parse(localStorage.getItem("users"));

  if (messages.length == 0) {
    // check current users
    if (currentUsers == null) {
      userArray.push(user);
      localStorage.setItem("users", JSON.stringify(userArray));
    } else {
      for (let i of currentUsers) {
        if (i.email.toLowerCase() == user.email.toLowerCase()) {
          messages.push(`User already exist for email: ${i.email}`);
        } else {
          console.log(currentUsers);
          currentUsers.push(user);
        }
        localStorage.setItem("users", JSON.stringify(currentUsers));
      }
    }
  }

  //check if any errors in array
  if (messages.length > 0) {
    // if error prevent default and set errorElement text
    e.preventDefault();
    errorElement.innerText = messages.join(", ");
  } else {
    // navigate to login page
    e.preventDefault();
    window.location = "/login.html";
  }
});
