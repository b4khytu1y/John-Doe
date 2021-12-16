const loginField = "email";
const passwordField = "password";

const regLoginField = "email_reg";
const regPassField = "password_reg";
const regPassField2 = "password_reg2";

const usersTable = "Users";
const activeUserTable = "ActiveUser"
const adminPage = "../admin.html"
const welcomePage = "../index.html"

function validateEmail(email)  {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function checkUser(email) {
    var users = JSON.parse(localStorage.getItem(usersTable));
    if (users == null) {
        return true;
    }

    foundUser = users.find(x => x.email === email);

    if (foundUser != null) {
        return false;
    }

    return true;
}
    

function Register() {
    var login = document.getElementById(regLoginField).value;
    var password = document.getElementById(regPassField).value;
    var confPass = document.getElementById(regPassField2).value;

    if (validateEmail(login) == false) {
        document.getElementById("err_msg").innerHTML = "Invalid email";
        return
    }

    if (checkUser(login) == false) {
        document.getElementById("err_msg").innerHTML = "Invalid email";
        return
    }

    if (password != confPass) {
        document.getElementById("err_msg").innerHTML = "Password doesn't match";
        return
    }

    document.getElementById("err_msg").innerHTML = "";
    
    var user = {
        email: login,
        password: password,
        isBanned: false,
        isAdmin: false
    };

    storeUser(user);
}


function storeUser(user) {
    var users = JSON.parse(localStorage.getItem(usersTable));
    if (users != null) {
        users.push(user);
        localStorage.setItem(usersTable, JSON.stringify(users));
        return
    }else {
        var users = [];
        users.push(user);
        localStorage.setItem(usersTable, JSON.stringify(users));
    }
    return
}

function Authorize() {
    var login = document.getElementById(loginField).value;
    var password = document.getElementById(passwordField).value;

    var users = JSON.parse(localStorage.getItem(usersTable));

    if (users == null) {
        alert("No users were egistered")
        return
    }

    foundUser = users.find(x => x.email === login);

    if (foundUser == null) {
        alert("Didnt find user")
        return
    }

    if (foundUser.password === password) {
        if (!foundUser.isBanned) {
            localStorage.setItem(activeUserTable, JSON.stringify(foundUser));
    
            if (foundUser.isAdmin) {
                window.open(adminPage, '_self', 'resizable=yes');
            }
            window.open(welcomePage, "_self", "resizable=yess");
            return
        }
    
        alert("Sorry your account:\t" + foundUser.login + " is banned");
    
        return
    }

    alert("Incorrect password");
    return
}

function ResetPassword() {
    var login = document.getElementById(loginField).value;
    var password = document.getElementById(passwordField).value;

    var users = JSON.parse(localStorage.getItem(usersTable));

    var user = users.find(login, password);

    var index = users.index(user);

    users.splice(index-1, index+1);

    var newPassword = document.getElementById(newPasswordField);
    user.password = newPassword;

    users.push(user);

    localStorage.setItem(usersTable, json.stringify(users));

    return
}

var myInput = document.getElementById(regPassField);
var letter = document.getElementById("letter");
var capital = document.getElementById("capital");
var number = document.getElementById("number");
var length = document.getElementById("length");

myInput.onfocus = function() {
  document.getElementById("message").style.display = "block";
}

myInput.onblur = function() {
  document.getElementById("message").style.display = "none";
}

myInput.onkeyup = function() {
  var lowerCaseLetters = /[a-z]/g;
  if(myInput.value.match(lowerCaseLetters)) {  
    letter.classList.remove("invalid");
    letter.classList.add("valid");
  } else {
    letter.classList.remove("valid");
    letter.classList.add("invalid");
  }
  
  var upperCaseLetters = /[A-Z]/g;
  if(myInput.value.match(upperCaseLetters)) {  
    capital.classList.remove("invalid");
    capital.classList.add("valid");
  } else {
    capital.classList.remove("valid");
    capital.classList.add("invalid");
  }

  var numbers = /[0-9]/g;
  if(myInput.value.match(numbers)) {  
    number.classList.remove("invalid");
    number.classList.add("valid");
  } else {
    number.classList.remove("valid");
    number.classList.add("invalid");
  }
  
  if(myInput.value.length >= 8) {
    length.classList.remove("invalid");
    length.classList.add("valid");
  } else {
    length.classList.remove("valid");
    length.classList.add("invalid");
  }
}

var activeUser = JSON.parse(localStorage.getItem(activeUserTable));
if (activeUser != null) {
    if (activeUser.isAdmin) {
        window.open(adminPage, '_self', 'resizable=yes');
    }else {
        window.open(welcomePage, '_self', 'resizable=yes');
    }
}