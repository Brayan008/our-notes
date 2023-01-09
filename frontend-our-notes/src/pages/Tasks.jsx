import React, { useEffect, useState } from 'react'
import ListNotes from '../components/ListNotes';
import { listNotes } from '../controllers/notesController';
import Navbar from "../components/Navbar";
import authController from '../controllers/authController';
import {useNavigate} from "react-router-dom";

function Tasks() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);

  useEffect(() => {
    const res = async()=>{
      const data = await listNotes(null, false);
      data.isPublic = true;
      console.log(data);
      setList(data)
    }
    res()
  }, [])

  if(authController.authUser() === null){
    return navigate('/')
  }

  function refreshNotes() {
    setList(listNotes())
  }


  return (
    <div className='container'>
      <Navbar />
      <br />
      <br/>
      <ListNotes resNotes={list} 
      refreshNotes={refreshNotes}></ListNotes>
    </div>
  )
}

export default Tasks