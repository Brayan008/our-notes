/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package bmb.authentication.repository;

import bmb.authentication.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author bmares008
 */
public interface CategoryRepository extends JpaRepository<Category, Long>{
    
}
