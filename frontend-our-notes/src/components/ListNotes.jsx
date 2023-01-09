import React, { useState } from 'react'
import Task from './Task'
import SearchTask from '../components/SearchTask'

function ListNotes(props) {
  const [palabra, setPalabra] = useState("");
  let filtrado = {};

  if(palabra === "" || palabra === null){
    filtrado = props.resNotes.data;
  }else{
    filtrado = props.resNotes.data.filter(
      data =>{
        return (
          data
          .name
          .toLowerCase()
          .includes(palabra.toLowerCase()) ||
          data
          .description
          .toLowerCase()
          .includes(palabra.toLowerCase())
        );
      }
    )
  }


  return (
    <div className='col-12'>
      {palabra}
      <SearchTask setPalabra={setPalabra}
        palabra={palabra}></SearchTask>
      {props.resNotes.isPublic === true ?
        <h3 align='center'>
          Todas las notas
        </h3> :
        <h3 align='center'>
          Mis notas
        </h3>}
      {props.resNotes.data != null ?
        <Task
          tasks={filtrado}
          isPublic={props.resNotes.isPublic}
          refreshNotes={props.refreshNotes}></Task>
        : "Not notes"
      }
    </div>
  )
}

export default ListNotes