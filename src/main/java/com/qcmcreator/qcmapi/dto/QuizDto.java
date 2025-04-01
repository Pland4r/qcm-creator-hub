
package com.qcmcreator.qcmapi.dto;

import com.qcmcreator.qcmapi.model.Technology;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class QuizDto {
    private Long id;
    private String title;
    private String description;
    private Technology technology;
    private LocalDateTime createdAt;
    private List<QuestionDto> questions;
}
