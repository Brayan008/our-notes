import React, { useEffect, useState } from 'react'
import ListNotes from '../components/ListNotes';
import { listNotes } from '../controllers/notesController';
import Navbar from "../components/Navbar";
import AddNotes from '../components/AddNotes';
import authController from '../controllers/authController';
import { useNavigate } from "react-router-dom";

function MyTasks() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);

  useEffect(() => {
    const res = async () => {
      const data = await listNotes(null, true);
      data.isPublic = false;
      setList(data)
    }
    res()
  }, [])
  
  if (authController.authUser() === null) {
    return navigate('/')
  }

  async function refreshNotes() {
    const data = await listNotes(null, true);
    data.isPublic = false;
    setList(data)
  }

  return (
    <div className='container'>
      <Navbar />
      <AddNotes refreshNotes={refreshNotes}
      icon={"bi bi-card-checklist"}></AddNotes>
      <ListNotes resNotes={list} refreshNotes={refreshNotes}></ListNotes>
    </div>
  )
}

export default MyTasks