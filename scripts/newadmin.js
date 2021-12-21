$(document).ready(function() {
    let auth = JSON.parse(localStorage.getItem("ActiveUser"))
    if (auth == null) {
        window.open("../login.html", "_self", "resizable=yes")
        return
    }

    if (!auth.isAdmin) {
        alert("Access denied")
        window.open("../index.html", "_self", "resizable=yes")
        return
    }

    $('.banAdmin').click(function() {
        let index = $('.banAdmin').index(this)
        users = JSON.parse(localStorage.getItem("Users"))
        users[index].isBanned = true

        localStorage.setItem("Users", JSON.stringify(users))

        $(this).addClass('unban')
        $(this).removeClass('ban')

        $(this).text('Unban')
        location.reload()
    })

    $('.unbanAdmin').click(function() {
        let index = $('.unbanAdmin').index(this)
        users = JSON.parse(localStorage.getItem("Users"))
        users[index].isBanned = false

        localStorage.setItem("Users", JSON.stringify(users))

        $(this).addClass('ban')
        $(this).removeClass('unban')

        $(this).text('Ban')
        location.reload()
    })

    $('#addAdmin').click(function() {
        $('#create_form').css("display", "block")
        $('#form_email').attr("value", "")
        $('#form_password').attr("value", "")
        $('#form_isAdmin').attr("value", "")
        $('#form_isBanned').attr("value", "")

    })

    $('#closeCreateForm').click(function() {
        $('#create_form').css("display", "none")
    })

    $('#closeEdit_form').click(function() {
        $('#edit_form').css("display", "none")
    })

    $('#save').click(function() {
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
            localStorage.setItem("Users", JSON.stringify(admins))
            return
        }

        admins = []
        admins.append(admin)
        localStorage.setItem("Users", JSON.stringify(prod))
        return
    }

    $('#showAdmins').click(function() {
        let admins = JSON.parse(localStorage.getItem("Users"))
        if (admins == null) {
            alert("Empty")
            return
        }

        let admins_list = $('#list')

        $.each(admins, function(i, elem) {
            if (elem.isAdmin) {
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
            }
        })
    })

    $('.edit').click(function() {
        $('#edit_form').css("display", "block")
        let index = $('.edit').index(this),
            admins = JSON.parse(localStorage.getItem('Users'))
        
        $("#id").text(index)
        $('#form_email2').attr("value", admins[index].email)
        $('#form_password2').attr("value", admins[index].password)
        $('#form_isAdmin2').attr("value", admins[index].isAdmin)
        $('#form_isBanned2').attr("value", admins[index].isBanned)
    })

    $('#saveEdit').click(function() {
        let index = $('#id').text()
        admins = JSON.parse(localStorage.getItem('Users'))

        admins[index].email = $("#form_email2").val()
        admins[index].password = $("#form_password2").val()
        admins[index].isAdmin = $("#form_isAdmin2").val()
        admins[index].isBanned = $("#form_isBanned2").val()



        localStorage.setItem("Users", JSON.stringify(products))
        location.reload()
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