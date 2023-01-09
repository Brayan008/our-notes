/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package bmb.authentication.repository;

import bmb.authentication.model.Note;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author bmares008
 */
public interface NoteRepository extends JpaRepository<Note, Long>{
    List<Note> findByIsPublicOrderByCreatedAtDesc(Boolean isPublic);
    List<Note> findByIdUserOrderByCreatedAtDesc(Long idUser);
}
