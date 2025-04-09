
package com.qcmcreator.qcmapi.dto;

import com.qcmcreator.qcmapi.model.QuestionType;
import lombok.Data;

import java.util.List;

@Data
public class QuestionDto {
    private Long id;
    private String text;
    private String imageUrl;
    private QuestionType questionType = QuestionType.MULTIPLE_CHOICE;
    private String directAnswer;
    private List<OptionDto> options;
}
