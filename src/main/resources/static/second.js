function serializeForm(formNode) {
    const { elements } = formNode

    const data = Array.from(elements)
        .map((element) => {
            const { name, type } = element
            const value = type === 'checkbox' ? element.checked : element.value

            return { name, value }
        })
        .filter((item) => !!item.name)

    let string = '{';
    let roles = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].name.startsWith("ROLE") & data[i].value == true) {
            roles.push(data[i].name)
            continue
        }
        string += '"' + data[i].name + '": "' + data[i].value + '",'
    }
        string += '"roles": ['
        for (let i = 0; i < roles.length; i++) {
            string += '{"name": "' + roles[i] + '"},'
        }

    string = string.substring(0, string.length - 1)
    string += "]}"
    return string
}

function handleFormSubmit(event) {
    event.preventDefault()
    if (document.getElementById('roleUserN').checked || document.getElementById('roleAdminN').checked) {
        let responseJSON = sendPost(serializeForm(applicantForm))
        responseJSON.then(newUser => {
            if (newUser.status == 500){
                alert("Please, try again. This name already taken")
                throw new Error("")
            } else {
                addUserInTable(newUser)
                document.getElementById("formNewUser").reset()
                document.getElementById("tableUsers").click();
            }
        })
    } else {
        alert("Add any role")
    }
}

async function sendPost(body){
    let response = await fetch('http://localhost:8080/admin/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: body
    });

    return response.json();
}

const applicantForm = document.getElementById('formNewUser')
applicantForm.addEventListener('submit', handleFormSubmit);

