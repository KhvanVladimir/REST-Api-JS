function deleteUser(id){
        $('.overlay').css({'visibility': 'visible', 'opacity': 1});
        $('.ne-modalD').css({'visibility': 'visible', 'opacity': 1});
        fetch("http://localhost:8080/admin/users/" + id)
            .then(res => res.json())
            .then(user => {
                document.getElementById("idD").value = user.id;
                document.getElementById("firstNameD").value = user.firstName;
                document.getElementById("lastNameD").value = user.lastName;
                document.getElementById("ageD").value = user.age;
                document.getElementById("emailD").value = user.email;
                for (let i = 0; i < user.roles.length; i++) {
                    if (user.roles[i].name == "ROLE_ADMIN") {
                        document.getElementById("adminD").checked = true;
                    } else if (user.roles[i].name == "ROLE_USER") {
                        document.getElementById("userD").checked = true;
                    }
                }
            })
    };

    /*Закрыть модальное окно*/
    $('.close').click(function(){
        $('.overlay').css({'visibility': 'hidden', 'opacity': 0});
        $('.ne-modalD').css({'visibility': 'hidden', 'opacity': 0});
    });

function handleFormSubmit(event) {
    event.preventDefault();
    let url = "http://localhost:8080/admin/users/" + document.getElementById("idD").value;
    fetch(url, {method: 'DELETE'}).then(response => console.log(response.status));
    document.getElementById(document.getElementById("idD").value).remove();
    document.getElementById("closeModalD").click();
}

const applicantForm1 = document.getElementById('formDeleteUser')
applicantForm1.addEventListener('submit', handleFormSubmit)