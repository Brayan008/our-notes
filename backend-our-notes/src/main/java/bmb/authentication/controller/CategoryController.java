/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/springframework/RestController.java to edit this template
 */
package bmb.authentication.controller;

import bmb.authentication.repository.CategoryRepository;
import bmb.authentication.response.ResponseHandler;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 *
 * @author bmares008
 */
@RestController
@RequestMapping("/api/category")
@CrossOrigin(origins = "*", maxAge = 3600)
public class CategoryController {
    
    @Autowired
    CategoryRepository categoryRep;
    
    @GetMapping()
    public ResponseEntity<?> getAllCategory() {
        try{
            return ResponseHandler.generateResponse("Lista Categorias",
                    HttpStatus.OK,
                    categoryRep.findAll(), false);
            
        }catch(Exception e){
            return ResponseHandler.generateResponse("Error",
                    HttpStatus.BAD_REQUEST,
                    e, true);
        }
        
    }
}
