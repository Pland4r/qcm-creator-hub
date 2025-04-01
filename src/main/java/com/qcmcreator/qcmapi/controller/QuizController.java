
package com.qcmcreator.qcmapi.controller;

import com.qcmcreator.qcmapi.dto.QuizDto;
import com.qcmcreator.qcmapi.dto.response.MessageResponse;
import com.qcmcreator.qcmapi.model.Option;
import com.qcmcreator.qcmapi.model.Question;
import com.qcmcreator.qcmapi.model.Quiz;
import com.qcmcreator.qcmapi.security.services.UserDetailsImpl;
import com.qcmcreator.qcmapi.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/quizzes")
public class QuizController {
    
    @Autowired
    private QuizService quizService;
    
    @GetMapping
    public ResponseEntity<List<QuizDto>> getAllQuizzes() {
        return ResponseEntity.ok(quizService.getAllQuizzes());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getQuizById(@PathVariable Long id) {
        QuizDto quizDto = quizService.getQuizById(id);
        if (quizDto != null) {
            return ResponseEntity.ok(quizDto);
        }
        return ResponseEntity.notFound().build();
    }
    
    @PostMapping
    public ResponseEntity<?> createQuiz(@RequestBody QuizDto quizDto, Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        Long quizId = quizService.createQuiz(quizDto, userDetails.getId());
        Map<String, Long> response = new HashMap<>();
        response.put("id", quizId);
        return ResponseEntity.ok(response);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateQuiz(@PathVariable Long id, @RequestBody QuizDto quizDto, Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        boolean updated = quizService.updateQuiz(id, quizDto, userDetails.getId());
        if (updated) {
            return ResponseEntity.ok(new MessageResponse("Quiz updated successfully"));
        }
        return ResponseEntity.badRequest().body(new MessageResponse("Failed to update quiz"));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteQuiz(@PathVariable Long id, Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        boolean deleted = quizService.deleteQuiz(id, userDetails.getId());
        if (deleted) {
            return ResponseEntity.ok(new MessageResponse("Quiz deleted successfully"));
        }
        return ResponseEntity.badRequest().body(new MessageResponse("Failed to delete quiz"));
    }
}
