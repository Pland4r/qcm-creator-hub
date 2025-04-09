
package com.qcmcreator.qcmapi.service;

import com.qcmcreator.qcmapi.dto.OptionDto;
import com.qcmcreator.qcmapi.dto.QuestionDto;
import com.qcmcreator.qcmapi.dto.QuizDto;
import com.qcmcreator.qcmapi.model.*;
import com.qcmcreator.qcmapi.repository.OptionRepository;
import com.qcmcreator.qcmapi.repository.QuestionRepository;
import com.qcmcreator.qcmapi.repository.QuizRepository;
import com.qcmcreator.qcmapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class QuizService {
    
    @Autowired
    private QuizRepository quizRepository;
    
    @Autowired
    private QuestionRepository questionRepository;
    
    @Autowired
    private OptionRepository optionRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    public List<QuizDto> getAllQuizzes() {
        List<Quiz> quizzes = quizRepository.findAllByOrderByCreatedAtDesc();
        return quizzes.stream().map(this::convertToDto).collect(Collectors.toList());
    }
    
    public QuizDto getQuizById(Long id) {
        Optional<Quiz> quizOpt = quizRepository.findById(id);
        return quizOpt.map(this::convertToDto).orElse(null);
    }
    
    @Transactional
    public Long createQuiz(QuizDto quizDto, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        
        Quiz quiz = new Quiz();
        quiz.setTitle(quizDto.getTitle());
        quiz.setDescription(quizDto.getDescription());
        quiz.setTechnology(quizDto.getTechnology());
        quiz.setUser(user);
        
        Quiz savedQuiz = quizRepository.save(quiz);
        
        if (quizDto.getQuestions() != null) {
            for (QuestionDto questionDto : quizDto.getQuestions()) {
                Question question = new Question();
                question.setText(questionDto.getText());
                question.setImageUrl(questionDto.getImageUrl());
                question.setQuestionType(questionDto.getQuestionType());
                question.setDirectAnswer(questionDto.getDirectAnswer());
                question.setQuiz(savedQuiz);
                
                Question savedQuestion = questionRepository.save(question);
                
                // Only process options for multiple choice questions
                if (questionDto.getQuestionType() == QuestionType.MULTIPLE_CHOICE && questionDto.getOptions() != null) {
                    for (OptionDto optionDto : questionDto.getOptions()) {
                        Option option = new Option();
                        option.setText(optionDto.getText());
                        option.setCorrect(optionDto.isCorrect());
                        option.setQuestion(savedQuestion);
                        
                        optionRepository.save(option);
                    }
                }
            }
        }
        
        return savedQuiz.getId();
    }
    
    @Transactional
    public boolean updateQuiz(Long id, QuizDto quizDto, Long userId) {
        Optional<Quiz> quizOpt = quizRepository.findById(id);
        if (quizOpt.isPresent()) {
            Quiz quiz = quizOpt.get();
            
            // Check if the user owns this quiz
            if (!quiz.getUser().getId().equals(userId)) {
                return false;
            }
            
            quiz.setTitle(quizDto.getTitle());
            quiz.setDescription(quizDto.getDescription());
            quiz.setTechnology(quizDto.getTechnology());
            
            // Delete existing questions and options
            List<Question> existingQuestions = questionRepository.findByQuizOrderById(quiz);
            questionRepository.deleteAll(existingQuestions);
            
            // Create new questions and options
            if (quizDto.getQuestions() != null) {
                for (QuestionDto questionDto : quizDto.getQuestions()) {
                    Question question = new Question();
                    question.setText(questionDto.getText());
                    question.setImageUrl(questionDto.getImageUrl());
                    question.setQuestionType(questionDto.getQuestionType());
                    question.setDirectAnswer(questionDto.getDirectAnswer());
                    question.setQuiz(quiz);
                    
                    Question savedQuestion = questionRepository.save(question);
                    
                    // Only process options for multiple choice questions
                    if (questionDto.getQuestionType() == QuestionType.MULTIPLE_CHOICE && questionDto.getOptions() != null) {
                        for (OptionDto optionDto : questionDto.getOptions()) {
                            Option option = new Option();
                            option.setText(optionDto.getText());
                            option.setCorrect(optionDto.isCorrect());
                            option.setQuestion(savedQuestion);
                            
                            optionRepository.save(option);
                        }
                    }
                }
            }
            
            return true;
        }
        return false;
    }
    
    @Transactional
    public boolean deleteQuiz(Long id, Long userId) {
        Optional<Quiz> quizOpt = quizRepository.findById(id);
        if (quizOpt.isPresent()) {
            Quiz quiz = quizOpt.get();
            
            // Check if the user owns this quiz
            if (!quiz.getUser().getId().equals(userId)) {
                return false;
            }
            
            quizRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    private QuizDto convertToDto(Quiz quiz) {
        QuizDto quizDto = new QuizDto();
        quizDto.setId(quiz.getId());
        quizDto.setTitle(quiz.getTitle());
        quizDto.setDescription(quiz.getDescription());
        quizDto.setTechnology(quiz.getTechnology());
        quizDto.setCreatedAt(quiz.getCreatedAt());
        
        List<Question> questions = questionRepository.findByQuizOrderById(quiz);
        List<QuestionDto> questionDtos = new ArrayList<>();
        
        for (Question question : questions) {
            QuestionDto questionDto = new QuestionDto();
            questionDto.setId(question.getId());
            questionDto.setText(question.getText());
            questionDto.setImageUrl(question.getImageUrl());
            questionDto.setQuestionType(question.getQuestionType());
            questionDto.setDirectAnswer(question.getDirectAnswer());
            
            List<OptionDto> optionDtos = new ArrayList<>();
            
            // Only fetch options for multiple choice questions
            if (question.getQuestionType() == QuestionType.MULTIPLE_CHOICE) {
                List<Option> options = optionRepository.findByQuestion(question);
                
                for (Option option : options) {
                    OptionDto optionDto = new OptionDto();
                    optionDto.setId(option.getId());
                    optionDto.setText(option.getText());
                    optionDto.setCorrect(option.isCorrect());
                    
                    optionDtos.add(optionDto);
                }
            }
            
            questionDto.setOptions(optionDtos);
            questionDtos.add(questionDto);
        }
        
        quizDto.setQuestions(questionDtos);
        
        return quizDto;
    }
}
