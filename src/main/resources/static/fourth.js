function editUser(id){
    $('.overlay').css({'visibility': 'visible', 'opacity': 1});
    $('.ne-modalE').css({'visibility': 'visible', 'opacity': 1});
    fetch("http://localhost:8080/admin/users/" + id)
        .then(res => res.json())
        .then(user => {
            document.getElementById("idE").value = user.id;
            document.getElementById("firstNameE").value = user.firstName;
            document.getElementById("lastNameE").value = user.lastName;
            document.getElementById("ageE").value = user.age;
            document.getElementById("emailE").value = user.email;
            document.getElementById("passwordE").value = user.password;
            for (let i = 0; i < user.roles.length; i++) {
                if (user.roles[i].name == "ROLE_ADMIN") {
                    document.getElementById("adminE").checked = true;
                } else if (user.roles[i].name == "ROLE_USER") {
                    document.getElementById("userE").checked = true;
                }
            }
        })
};

/*Закрыть модальное окно*/
$('.close').click(function(){
    $('.overlay').css({'visibility': 'hidden', 'opacity': 0});
    $('.ne-modalE').css({'visibility': 'hidden', 'opacity': 0});
});

function handleFormSubmitE(event) {
    event.preventDefault();
    let jsonEdit = getEditedUser()
    let responseJSON = sendPut(jsonEdit)
    responseJSON.then(u => {
        refreshTableUsers(u)
    })

    document.getElementById("closeModalD").click();

}
function refreshTableUsers(user){
    document.getElementById(user.id).remove()
    addUserInTable(user)
}

async function sendPut(body){
    let response = await fetch('http://localhost:8080/admin/users', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: body
    });

    return response.json();
}
function getEditedUser() {
    let q = "{"
    q += convertJSON("id", document.getElementById('idE').value, ",")
    q += convertJSON("firstName", document.getElementById('firstNameE').value, ",")
    q += convertJSON("lastName", document.getElementById('lastNameE').value, ",")
    q += convertJSON("email", document.getElementById('emailE').value, ",")
    q += convertJSON("age", document.getElementById('ageE').value, ",")
    q += convertJSON("password", document.getElementById('passwordE').value, ",")
    q += convertRole()
    q  += "}"
    return q
}

function convertRole(elem) {
    let result = ""
    if (document.getElementById("userE").checked || document.getElementById("adminE").checked) {
        result += '"roles":['
        if (document.getElementById("userE").checked) {
            result += '{' + convertJSON("name", "ROLE_USER", '') + '},'
        }
        if (document.getElementById("adminE").checked) {
            result += '{' + convertJSON("name", "ROLE_ADMIN", '') + '},'
        }
        result = result.substring(0, result.length - 1)
        result += ']'
        return result
    }
}

function convertJSON(key, value, delimiter){
    return '"' + key + '": "' + value + '"' + delimiter
}

const applicantFormE = document.getElementById('formEditUser')
applicantFormE.addEventListener('submit', handleFormSubmitE)