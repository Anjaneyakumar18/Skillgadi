package com.nec.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nec.Repository.QuizRepository;
import com.nec.Entity.Quiz;
import com.nec.dto.QuizStatsDto;

@Service
public class QuizStatsService {

    @Autowired
    private QuizRepository quizRepository;

    public QuizStatsDto getQuizStats(Long quizId) {

        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        QuizStatsDto dto = new QuizStatsDto();
        dto.setQuizId(quiz.getQuizId());
        dto.setQuizName(quiz.getQuizName());
        dto.setCreatedBy(quizRepository.findCreatorName(quizId));
        dto.setRegisteredCount(quizRepository.countRegistrations(quizId));
        dto.setAttemptedCount(quizRepository.countAttempts(quizId));

        return dto;
    }
}
