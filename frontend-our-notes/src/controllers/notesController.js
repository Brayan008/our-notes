import BASE_URL_API from '../api/baseURL.js'
import authController from './authController.js'
const errInt = {
    error: true,
    message: "Error interno consulta administracion  al correo mynotes@gmail.com - ",

}
var nameStorage = "notes"
let resNotes = {
    countReady: 0,
    total: 0,
    notes: []
}

const saveNotes = async (name, description, idCategory, isPublic) => {
    try {
        const userLogin = await authController.authUser();
        const res = await fetch(BASE_URL_API + "note", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                description: description,
                idCategory: idCategory,
                isPublic: isPublic,
                idUser: userLogin.id
            })
        })
        const data = await res.json();
        return data
    } catch (err) {
        errInt.message += err
        return errInt
    }
}

const editNote = async (note, name, description, category, isPublic) => {
    try {
        const userLogin = await authController.authUser();
        const res = await fetch(BASE_URL_API + "note", {
            method: "PUT",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                description: description,
                idCategory: category,
                isPublic: isPublic,
                idUser: userLogin.id,
                id: note.id,
                createdAt: note.createdAt
            })
        })
        const data = await res.json();
        return data
    } catch (err) {
        errInt.message += err
        return errInt
    }
}


const listNotes = async (search, myNotes) => {
    try {
        let url;
        const userLogin = await authController.authUser();
        if(myNotes === false){
            url = "note"
        }else{
            url = "note?idUser="+userLogin.id
        }
        const res = await fetch(BASE_URL_API + url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json();
        return data
    } catch (err) {
        errInt.message += err
        return errInt
    }
}

const deleteNote = async (idNote) => {
    try {
        const res = await fetch(BASE_URL_API + "note/" +idNote, {
            method: "DELETE",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json();
        return data
    } catch (err) {
        errInt.message += err
        return errInt
    }
}


const deleteNotes = (id) =>{
    resNotes = JSON.parse(localStorage.getItem(nameStorage))
    
    resNotes.notes.splice(getObjWithIdIndex(id), 1);
    localStorage.setItem('notes', JSON.stringify(resNotes))
}

const doneNote = (id, status) =>{
    resNotes = JSON.parse(localStorage.getItem(nameStorage))
    resNotes.notes[getObjWithIdIndex(id)].ready = status
    localStorage.setItem('notes', JSON.stringify(resNotes))
}

//HELPERS

function getObjWithIdIndex(id){
    return resNotes.notes.findIndex((obj) => obj.id === id);
}

export {
    saveNotes,
    deleteNotes,
    deleteNote,
    doneNote,
    listNotes,
    editNote
}