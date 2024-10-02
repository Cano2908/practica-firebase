import { addUser, getUsers, updateUser, deleteUser } from './usuario.db.js'

const currentPage = window.location.pathname;
const tableBody = document.getElementById('tableBody');

if (currentPage === '/src/consult.html') {
    document.addEventListener('DOMContentLoaded', async () => {
        if (document.getElementById('searchInput').value === '') {
            const querySnapshot = await getUsers();

            Object.keys(querySnapshot).forEach((key) => {
                const user = querySnapshot[key];
                const row = tableBody.insertRow(-1);
                row.innerHTML = `
                    <td>${key}</td> <!-- key representa el ID del usuario -->
                    <td>${user.firstname}</td>
                    <td>${user.lastname}</td>
                    <td>${user.username}</td>
                    <td>${user.institution}</td>
                    <td>
                        <i class="bi bi-pencil" id = "btn-edit" ></i>
                        <i class="bi bi-trash" id = "btn-delete"></i>
                    </td>
                `;
            });

            const editButtons = document.querySelectorAll('#btn-edit');

            editButtons.forEach(btn => {
                btn.addEventListener('click', async (event) => {
                    const userId = event.target.parentElement.parentElement.cells[0].textContent;
                    const firstname = event.target.parentElement.parentElement.cells[1].textContent;
                    const lastname = event.target.parentElement.parentElement.cells[2].textContent;
                    const  username= event.target.parentElement.parentElement.cells[3].textContent;
                    const institution = event.target.parentElement.parentElement.cells[4].textContent;

                    localStorage.setItem('userId', userId);
                    localStorage.setItem('userFirstName', firstname);
                    localStorage.setItem('userLastName', lastname);
                    localStorage.setItem('userUsername', username);
                    localStorage.setItem('userInstitution', institution);


                    // Redirigir a la página de edición
                    window.location.href = '/src/edit.html';
                });
            });

            const deleteButtons = document.querySelectorAll('#btn-delete');

            deleteButtons.forEach(btn => {
                btn.addEventListener('click', async (event) => {
                    const userId = event.target.parentElement.parentElement.cells[0].textContent;
                    await deleteUser(userId);
                });
            })

        }
    });

    document.getElementById('searchInput').addEventListener('keyup', async () => {
        const searchInput = document.getElementById('searchInput').value.toLowerCase();
        const querySnapshot = await getUsers();

        tableBody.innerHTML = '';

        Object.keys(querySnapshot).forEach(key => {
            const user = querySnapshot[key]; // Obtener el usuario por su clave

            // Verificar si el usuario coincide con la búsqueda
            if (
                key.toLowerCase().includes(searchInput) ||
                user.firstname.toLowerCase().includes(searchInput) ||
                user.lastname.toLowerCase().includes(searchInput) ||
                user.username.toLowerCase().includes(searchInput) ||
                user.institution.toLowerCase().includes(searchInput)
            ) {
                // Si hay coincidencia, crear una fila en la tabla
                const row = userTable.insertRow(-1);
                row.innerHTML = `
                    <td>${key}</td> <!-- key representa el ID del usuario -->
                    <td>${user.firstname}</td>
                    <td>${user.lastname}</td>
                    <td>${user.username}</td>
                    <td>${user.institution}</td>
                    <td>
                        <i class="bi bi-pencil"></i>
                        <i class="bi bi-trash"></i>
                    </td>
                `;
                tableBody.appendChild(row);
            }
        });
    });
}

if (currentPage === '/src/add.html') {
    document.getElementById('UserForm').addEventListener('submit', async (event) => {
        event.preventDefault();

        const firstname = document.getElementById('firstnameAdd').value;
        const lastname = document.getElementById('lastnameAdd').value;
        const username = document.getElementById('usernameAdd').value;
        const institution = document.getElementById('institutionAdd').value;

        const user = {
            firstname,
            lastname,
            username,
            institution
        };

        try {
            await addUser(user);
            document.getElementById('UserForm').reset();
        } catch (error) {
            console.error(error);
        }
    });
}

if (currentPage === '/src/edit.html') {
    document.addEventListener('DOMContentLoaded', () => {
        // Recuperar los datos del usuario desde localStorage
        const userId = localStorage.getItem('userId');
        const userFirstName = localStorage.getItem('userFirstName');
        const userLastName = localStorage.getItem('userLastName');
        const userUsername = localStorage.getItem('userUsername');
        const userInstitution = localStorage.getItem('userInstitution');

        // Llenar los inputs con los datos del usuario
        document.getElementById('firstname').value = userFirstName;
        document.getElementById('lastname').value = userLastName;
        document.getElementById('username').value = userUsername;
        document.getElementById('institution').value = userInstitution;

        document.getElementById('editUserForm').addEventListener('submit', async (event) => {
            event.preventDefault();

            const firstname = document.getElementById('firstname').value;
            const lastname = document.getElementById('lastname').value;
            const username = document.getElementById('username').value;
            const institution = document.getElementById('institution').value;

            const user = {
                firstname,
                lastname,
                username,
                institution
            };

            await updateUser(userId, user);
        });
    });
}