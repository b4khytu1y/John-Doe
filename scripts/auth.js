const loginField = "email";
const passwordField = "password";

const regLoginField = "email_reg";
const regPassField = "password_reg";
const regPassField2 = "password_reg2";

const usersTable = "Users";
const activeUserTable = "ActiveUser"
const adminPage = "./admin.html"
const welcomePage = "./index.html"

var checkActiveUser = JSON.parse(localStorage.getItem(activeUserTable))
if (checkActiveUser != null) {
  alert("You already logged in")
  window.open(welcomePage, "_self", "resizable=yes")
}

let users = JSON.parse(localStorage.getItem("Users"))
    if (users == null) {
        users = []
        var admin = {
            email: "admin",
            password: "admin",
            isAdmin: true,
            isBanned: false
        }
    
        users.push(admin)
    
        localStorage.setItem("Users", JSON.stringify(users))
    }else {
        admin = users.find(a => a.email === "admin")
        if (admin == null) {
          var admin = {
            email: "admin",
            password: "admin",
            isAdmin: true,
            isBanned: false
        }

            users.push(admin)
            localStorage.setItem("Users", JSON.stringify(users))
        }
    }
function validateEmail(email)  {
    var re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z]+\.[a-zA-Z]+$/;
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
    
function validatePassword(pwd) {
  let regexp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
  return regexp.test(pwd)
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
        document.getElementById("err_msg").innerHTML = "User already exists";
        return
    }
  
    if (!validatePassword(password)) {
        document.getElementById("err_msg").innerHTML = "Password should contain 8 characters, at least 1 number, 1 letter";
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
                return
            }
              window.open(welcomePage, "_self", "resizable=yes");
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
