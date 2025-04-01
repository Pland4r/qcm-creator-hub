
package com.qcmcreator.qcmapi.repository;

import com.qcmcreator.qcmapi.model.Option;
import com.qcmcreator.qcmapi.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OptionRepository extends JpaRepository<Option, Long> {
    List<Option> findByQuestion(Question question);
}
