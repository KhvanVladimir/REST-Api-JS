fetch("http://localhost:8080/user/information")
    .then(res => res.json())
    .then(user => {
        let userRoles = "";
        for (let i = 0; i < user.roles.length; i++) {
            userRoles += user.roles[i].name + ' ';
        }
        document.getElementById("userAndRole").innerText = user.firstName + " with roles " + userRoles;

        let tbody = document.getElementById('tableUserBody');
        let row_2 = document.createElement('tr');

        let row_2_data_1 = document.createElement('td');
        row_2_data_1.innerHTML = user.id;
        let row_2_data_2 = document.createElement('td');
        row_2_data_2.innerHTML = user.firstName;
        let row_2_data_3 = document.createElement('td');
        row_2_data_3.innerHTML = user.lastName;
        let row_2_data_4 = document.createElement('td');
        row_2_data_4.innerHTML = user.age;
        let row_2_data_5 = document.createElement('td');
        row_2_data_5.innerHTML = user.email;
        let row_2_data_6 = document.createElement('td');
        row_2_data_6.innerHTML = userRoles;

        row_2.appendChild(row_2_data_1);
        row_2.appendChild(row_2_data_2);
        row_2.appendChild(row_2_data_3);
        row_2.appendChild(row_2_data_4);
        row_2.appendChild(row_2_data_5);
        row_2.appendChild(row_2_data_6);
        tbody.appendChild(row_2);
    });
fetch("http://localhost:8080/admin/users")
    .then(res => res.json())
    .then(usersDB => {
        usersDB.forEach(userDB => {
            addUserInTable(userDB)
        })})

function addUserInTable(userDB) {

    let tbody = document.getElementById('tableBodyAllUsers');
    let row_2 = document.createElement('tr');
    row_2.id = userDB.id;
    let row_2_data_1 = document.createElement('td');
    row_2_data_1.innerHTML = userDB.id;
    let row_2_data_2 = document.createElement('td');
    row_2_data_2.innerHTML = userDB.firstName;
    let row_2_data_3 = document.createElement('td');
    row_2_data_3.innerHTML = userDB.lastName;
    let row_2_data_4 = document.createElement('td');
    row_2_data_4.innerHTML = userDB.age;
    let row_2_data_5 = document.createElement('td');
    row_2_data_5.innerHTML = userDB.email;
    let roles = "";
    for (let i = 0; i < userDB.roles.length; i++) {
        roles += userDB.roles[i].name + " ";
    }
    let row_2_data_6 = document.createElement('td');
    row_2_data_6.innerHTML = roles;

    let row_2_data_7 = document.createElement('td');
    row_2_data_7.innerHTML =
        '<button name="edit" type="button" class="btn btn-info" className="btn btn-primary" onclick="editUser('
        + userDB.id
        + ')" data-toggle="modal" >Edit</button>';

    let row_2_data_8 = document.createElement('td');
    row_2_data_8.innerHTML =
        '<button name="delete" type="button" class="btn btn-danger" className="btn btn-primary dBtn" onclick="deleteUser('
        + userDB.id
        + ')" data-toggle="modal" >Delete</button>';


    row_2.appendChild(row_2_data_1);
    row_2.appendChild(row_2_data_2);
    row_2.appendChild(row_2_data_3);
    row_2.appendChild(row_2_data_4);
    row_2.appendChild(row_2_data_5);
    row_2.appendChild(row_2_data_6);
    row_2.appendChild(row_2_data_7);
    row_2.appendChild(row_2_data_8);
    tbody.appendChild(row_2);

}
