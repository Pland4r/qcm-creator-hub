
package com.qcmcreator.qcmapi.repository;

import com.qcmcreator.qcmapi.model.Quiz;
import com.qcmcreator.qcmapi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long> {
    List<Quiz> findByUserOrderByCreatedAtDesc(User user);
    List<Quiz> findAllByOrderByCreatedAtDesc();
}
