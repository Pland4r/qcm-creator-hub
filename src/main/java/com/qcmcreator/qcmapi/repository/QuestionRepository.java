
package com.qcmcreator.qcmapi.repository;

import com.qcmcreator.qcmapi.model.Question;
import com.qcmcreator.qcmapi.model.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByQuizOrderById(Quiz quiz);
}
