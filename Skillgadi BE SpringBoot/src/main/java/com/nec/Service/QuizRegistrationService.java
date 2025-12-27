package com.nec.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nec.Repository.QuizRegistrationRepository;

@Service
public class QuizRegistrationService {

    @Autowired
    private QuizRegistrationRepository quizRegistrationRepository;

    public long getEnrolledCount(Long quizId) {
        return quizRegistrationRepository.countEnrollments(quizId);
    }
}
