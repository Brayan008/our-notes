import React from 'react'
import Moment from 'react-moment';
import { deleteNote } from '../controllers/notesController';
import AddNotes from '../components/AddNotes';
import authController from '../controllers/authController';
import { NotificationContainer, NotificationManager } from 'react-notifications';

function Task({ refreshNotes, tasks }) {

    async function deleteN(id) {
        const res = await deleteNote(id)
        refreshNotes()
        return NotificationManager.success(res.message); 
    }

    return tasks.map((task) => {
        <NotificationContainer />
        const { id, name, description, createdAt, ready, user, category, isPublic } = task;
        return (
            <div className={"card m-2" + (ready ? ' border-success' : '')} key={id} >
                <div class="card-header">{name}</div>
                <div class="card-body">
                    <h5 class="card-title">{description}</h5>
                    <h6 class="card-subtitle text-muted">Author: {user.username}</h6>
                    <p class="card-footer text-muted" style={{ "fontSize": "13px", "color": "gray"}}>
                        <Moment format='MMMM Do YYYY, h:mm:ss a' date={createdAt}></Moment>
                        <span class="badge rounded-pill bg-light m-1">{isPublic === true ?
                        <i class="bi bi-globe2"></i> : <i class="bi bi-file-lock2-fill"></i>}</span>
                    </p>
                    <span class="badge rounded-pill bg-info">{category.name}</span>
                    {user.id === authController.authUser().id ?
                        <div align="right">
                            <AddNotes refreshNotes={refreshNotes}
                                icon={"bi bi-pencil"}
                                noteEdit={task}></AddNotes>
                            <button class="btn btn-danger" onClick={() => { deleteN(id) }}>
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                        : <></>}
                </div>
            </div>
        )
    })
}

export default Task