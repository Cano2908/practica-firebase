import { db } from '../database/db.js';
import { ref, get, push, child, remove, set } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js';

export const addUser = async (user) => {
    const dbRef = ref(db);
    await push(child(dbRef, 'users'), {
        ...user
    });
    alert("Usuario agregado correctamente");
    window.location.assign('/src/consult.html');
};

export const getUsers = async () => {
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, 'users'));
    return snapshot.exists() ? snapshot.val() : null;
};

export const updateUser = async (userId, user) => {
    const dbRef = ref(db);
    await set(child(dbRef, `users/${userId}`), {
        ...user
    });
    alert("Usuario actualizado correctamente");
    window.location.assign('/src/consult.html');
};

export const deleteUser = async (userId) => {
    const dbRef = ref(db);
    await remove(child(dbRef, `users/${userId}`));
    alert("Usuario eliminado correctamente");
    window.location.assign('/src/consult.html');
}