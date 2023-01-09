/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package bmb.authentication.response;

import java.util.HashMap;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

/**
 *
 * @author bmares008
 */
public class ResponseHandler {
        public static ResponseEntity<Object> generateResponse(
            String message, 
            HttpStatus status, 
            Object responseObj,
            Boolean error) {
        Map<String, Object> res = new HashMap<String, Object>();
        res.put("message", message);
        res.put("status", status.value());
        res.put("data", responseObj);
        res.put("error", error);

        return new ResponseEntity<Object>(res, status);
    }
}
