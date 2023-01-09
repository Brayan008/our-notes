import React, { useState, useEffect } from 'react'
import { listCategorys } from '../controllers/categoryController'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { saveNotes, editNote } from '../controllers/notesController';
import { notificarConexion } from '../utils/notificaciones';

function AddNotes(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categorys, setCategorys] = useState([]);
  const [category, setCategory] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  useEffect(() => {
    const res = async () => {
      const data = await listCategorys();
      setCategorys(data.data);
    }
    res()
  }, [])

  async function save() {
    if(!navigator.onLine) notificarConexion();
    let res;
    if (name === "" || description === "" || category === "") {
      console.log("es null");
      return NotificationManager.error('Todos los campos son requeridos');
    }
    
    if(props.noteEdit !== undefined){
      res = await editNote(props.noteEdit, name, description, category, isPublic);
    }else{
      res = await saveNotes(name, description, category, isPublic);
    }
    console.log(res);
    if (res.error === true || res.status === 400 || res.status === 401) {
      return NotificationManager.error(res.message);
    }

    toggle()
    setName("")
    setDescription("")
    setCategory("")
    props.refreshNotes()
    return NotificationManager.success(res.message); 
  }

  async function useModal(){
    if(props.noteEdit !== undefined){
      setName(props.noteEdit.name)
      setDescription(props.noteEdit.description)
      setIsPublic(props.noteEdit.isPublic)
      setCategory(props.noteEdit.idCategory)
    }
    toggle()
  }


  const categorias = categorys.map((cat) => {
    return <option key={cat.id} value={cat.id}>{cat.name}</option>
  })

  return (
    <>
      <NotificationContainer />
      <Button color="primary" className="m-4 fixed-bottom" onClick={useModal}>
        <i class={props.icon}></i>
      </Button>
      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Agregar tarea</ModalHeader>
        <ModalBody>
          <input className='form-control'
            type='text'
            value={name}
            placeholder="Nombre"
            onChange={(e) => { setName(e.target.value) }}
            required />
          <br />
          <input className='form-control'
            type='text'
            value={description}
            placeholder="Descripcion"
            onChange={(e) => { setDescription(e.target.value) }}
            required />
          <br />
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" 
              onChange={(e) => { setIsPublic(e.target.checked) }}
              defaultChecked={isPublic}  />
            <label class="form-check-label" for="flexSwitchCheckDefault">La nota es publica?</label>
          </div>
          <div class="form-group">
            <label for="exampleSelect1" class="form-label mt-4">Categoria</label>
            <select class="form-select" id="exampleSelect1"
              onChange={(e) => { setCategory(e.target.value) }}
              value={category}>
              <option>Selecciona una categoria</option>
              {categorias}
            </select>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => { save() }}>
            Agregar <i class="bi bi-check"></i>
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default AddNotes