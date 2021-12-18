const activeUserTable = "ActiveUser"
const loginInfo = "loginInfo"
const logDiv = "login_div"
const welcomePage = "../index.html"

var activeUser = JSON.parse(localStorage.getItem(activeUserTable))

if (activeUser != null) {
    var login = document.getElementById(loginInfo);
    var button = document.createElement("button");
    var div = document.getElementById(logDiv);

    login.innerHTML = activeUser.email;
    login.setAttribute("href", "#")
    button.textContent = "logout";
    button.setAttribute("onclick", "Logout()");
    button.classList.add("logout-btn")
    button.classList.add("hovered")

    div.appendChild(button);
}

function Logout() {
    localStorage.removeItem(activeUserTable);
    window.open(welcomePage, "_self", "resizable=yes");
}

