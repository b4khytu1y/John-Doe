$(document).ready(function() {
    let auth = JSON.parse(localStorage.getItem("ActiveUser"))
    if (auth == null) {
        window.open("../login.html", "_self", "resizable=yes")
        return
    }

    if (!auth.isAdmin) {
        alert("Access denied")
        window.open("../home.html", "_self", "resizable=yes")
        return
    }


    $('.ban').click(function() {
        let index = $('.ban').index(this)
        users = JSON.parse(localStorage.getItem("Users"))
        users[index].isBanned = true

        localStorage.setItem("Users", JSON.stringify(users))

        $(this).addClass('unban')
        $(this).removeClass('ban')

        $(this).text('Unban')
        location.reload()
    })

    $('.unban').click(function() {
        let index = $('.unban').index(this)
        users = JSON.parse(localStorage.getItem("Users"))
        users[index].isBanned = false

        localStorage.setItem("Users", JSON.stringify(users))

        $(this).addClass('ban')
        $(this).removeClass('unban')

        $(this).text('Ban')
        location.reload()
    })

    $('#addAdmin').click(function() {
        $('#addAdminDiv').css("display", "block")
    })

    $('#close_addAdminDiv').click(function() {
        $('#addAdminDiv').css("display", "block")
    })

    $('#saveEdit').click(function() {
        let email = $('#email'),
            pwd = $('#pasword'),
            isAdmin = $('#isAdmin').is(":checked")
            isBanned = false

        let obj = {
            email: email,
            password: pwd,
            isAdmin: isAdmin,
            isBanned: isBanned
        }

        storeAdmin(obj)

    })

    function storeAdmin(admin) {
        let admins = JSON.parse(localStorage.getItem("Users"))
        if (admins != null) {
            admins.append(admin)
            localStorage.setItem("Products", JSON.stringify(admins))
            return
        }

        admins = []
        admins.append(admin)
        localStorage.setItem("Users", JSON.stringify(prod))
        return
    }

    $('#showAdmins').click(function() {
        let admins = JSON.parse(localStorage.getItem("Products"))
        if (admins == null) {
            alert("Empty")
            return
        }

        let admins_list = $('#list')

        $.each(admins, function(i, elem) {
            let li = document.createElement('li'),
                email = document.createElement('input'),
                password = document.createElement('input'),
                isAdmin = document.createElement('input'),
                isBanned = document.createElement('input'),
                edit = document.createElement('button'),
                deleteBtn = document.createElement('button')

            email.type = "text"
            password.type = "text"
            isAdmin.type = "checkbox"
            isBanned.type = "checkbox"

            email.setAttribute("id", "email")
            passowrd.setAttribute("id", "password")
            isAdmin.setAttribute('id', 'isAdmin')
            isBanned.setAttribute('id', "isBanned")

            edit.classList.add("edit")
            deleteBtn.classList.add("delete")
            edit.innerHTML = "Edit"
            deleteBtn.innerHTML = "Delete"
            email.innerHTML = elem.email
            password.innerHTML = elem.password
            if (elem.isAdmin) {
                isAdmin.checked = true
            }else {
                isAdmin.checked = false
            }

            if (elem.isBanned) {
                isBanned.checked = true
            }else {
                isBanned.checked = false
            }

            li.appendChild(email)
            li.appendChild(password)
            li.appendChild(isAdmin)
            li.appendChild(isBanned)
            li.appendChild(edit)
            li.appendChild(deleteBtn)

            admins_list.append(li)
        })
    })

    $('.edit').click(function() {
        let index = $('.edit').index(this),
            users = JSON.parse(localStorage.getItem('Users'))
        
        if (users != null) {
            users[index].email = $('#email').val()
            users[index].password = $('#password').val()
            users[index].isAdmin = $('#isAdmin').is(':checked')
            users[index].isBanned = $('#isBanned').is(':checked')

            localStorage.setItem("Users", JSON.stringify(users))
            return
        }

        users = []
        let obj = {
            email: $('#email').val(),
            password: $('#password').val(),
            isAdmin: $('#isAdmin').is(':checked'),
            isBanned: $('#isBanned').is(':checked')
        }

        users.push(obj)

        localStorage.setItem("Users", JSON.stringify(users))
    })

    $('.delete').click(function() {
        let index = $('.delete').index(this),
            users = JSON.parse(localStorage.getItem('Users'))

        users.splice($.inArray(users[index], users), 1)

        localStorage.setItem("Users", JSON.stringify(users))
    })

    $('#logout').click(function() {
        localStorage.removeItem("ActiveUser")
        location.reload()
    })
})