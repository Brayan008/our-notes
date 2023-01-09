/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/springframework/RestController.java to edit this template
 */
package bmb.authentication.controller;

import bmb.authentication.model.Note;
import bmb.authentication.repository.NoteRepository;
import bmb.authentication.response.ResponseHandler;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 *
 * @author bmares008
 */
@RestController
@RequestMapping("/api/note")
@CrossOrigin(origins = "*", maxAge = 3600)
public class NoteController {

    @Autowired
    NoteRepository noteRepository;

    @GetMapping()
    public ResponseEntity<?> getNotes(@Valid @RequestParam(required = false, name = "idUser") Long idUser) {
        try {
            
            if (idUser == null) {
                return ResponseHandler.generateResponse("Lista todas las notas publicas",
                        HttpStatus.OK,
                        noteRepository.findByIsPublicOrderByCreatedAtDesc(true), 
                        false);
            }
            
            return ResponseHandler.generateResponse("Lista de tus notas",
                        HttpStatus.OK,
                        noteRepository.findByIdUserOrderByCreatedAtDesc(idUser), 
                        false);

        } catch (Exception e) {
            return ResponseHandler.generateResponse("Error",
                    HttpStatus.BAD_REQUEST,
                    e, true);
        }
    }
    
    @PostMapping
    public ResponseEntity<?> saveNotes(@RequestBody Note note){
        try{
            return ResponseHandler.generateResponse("Nota guardada correctamente",
                        HttpStatus.OK,
                        noteRepository.save(note), 
                        false);
            
            
        }catch(Exception e){
            return ResponseHandler.generateResponse("Error",
                    HttpStatus.BAD_REQUEST,
                    e, true);
        }
    }
    
    @PutMapping
    public ResponseEntity<?> editNote(@RequestBody Note note){
        try{
            if(noteRepository.findById(note.getId()) == null){
                return ResponseHandler.generateResponse("Esta nota no existe para editar.",
                    HttpStatus.BAD_REQUEST,
                    null, true);
            }
            
            return ResponseHandler.generateResponse("Nota editada correctamente",
                        HttpStatus.OK,
                        noteRepository.save(note), 
                        false);
            
            
        }catch(Exception e){
            return ResponseHandler.generateResponse("Error",
                    HttpStatus.BAD_REQUEST,
                    e, true);
        }
    }
    
    
    @DeleteMapping("/{idNote}")
    public ResponseEntity<?> deleteNote(@PathVariable(name = "idNote") Long idNote){
        try{
            Note note = noteRepository.findById(idNote).orElse(null);
            if(note == null){
                return ResponseHandler.generateResponse("Error: no se pudo eliminar la nota porque no existe",
                    HttpStatus.BAD_REQUEST,
                    null, true);
            }
            noteRepository.deleteById(idNote);
            return ResponseHandler.generateResponse("Nota eliminada correctamente",
                        HttpStatus.OK,
                        note, 
                        false);
            
            
        }catch(Exception e){
            return ResponseHandler.generateResponse("Error",
                    HttpStatus.BAD_REQUEST,
                    e, true);
        }
    }
}
