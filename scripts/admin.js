const activeUserTable = "ActiveUser",
        loginPage = "../login.html",
        adminEmail = "",
        adminPwd = "",
        emailField = "",
        pwdField = "",
        isAdminField = "",
        isBannedField = "",
        ul = ""

var activeUser = JSON.parse(localStorage.getItem(activeUserTable))

if (activeUser == null) {
    window.open(loginPage, "_self", "resizable=yes")
}

if (activeUser.isAdmin == false || activeUser.isBanned == true) {
    alert("Access denied")
    return
}

function AddAdmin() {
    var email = document.getElementById(adminEmail)
    var password = document.getElementById(adminPwd)

    if (validateEmail(login) == false) {
        document.getElementById("err_msg").innerHTML = "Invalid email";
        return
    }

    if (checkUser(email) == false) {
        document.getElementById("err_msg").innerHTML = "User already exists";
        return
    }

    var admin = {
        email: email,
        password: password,
        isAdmin: true,
        isBanned: false
    }

    storeAdmin(admin)
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

function validateEmail(email)  {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function storeAdmin(admin) {
    var users = JSON.parse(localStorage.getItem(usersTable))
    if (users != null) {
        users.push(admin)
        localStorage.setItem(JSON.stringify(admin))
    }else {
        var users = []
        users.push(admin)
        localStorage.setItem(JSON.stringify(admin))
    }
}

function ShowAdmins() {
    var list = document.getElementById(ul)
    list.forEach(function(element, i) {
        if (element.isAdmin == true) {
            li = document.createElement("li")
            p = document.createElement("p")
            p1 = document.createElement("input[type=text]")
            p2 = document.createElement("input[type=text]")
            c1 = document.createElement("checkbox")
            c2 = document.createElement("checkbox")
            updateBtn = document.createElement("button")
            deleteBtn = document.createElement("button")

            updateBtn.innerHTML = "Edit"
            updateBtn.setAttribute("onclick", "UpdateAdmin()")

            deleteBtn.innerHTML = "Delete"
            deleteBtn.setAttribute("onclick", "DeleteAdmin")

            p.innerHTML = i + 1
            p1.innerHTML = element.email
            p2.innerHTML = element.password
            if (element.isAdmin == true) {
                c1.checked = checked
            }
            if (element.isBanned == true) {
                c1.checked = checked
            }

            li.appendChild(p)
            li.appendChild(p1)
            li.appendChild(p2)
            li.appendChild(c1)
            li.appendChild(c2)
            li.appendChild(updateBtn)
            li.appendChild(deleteBtn)

            list.appendChild(li)
        }
    });
}

function UpdateAdmin() {
    
}