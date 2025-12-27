package com.nec.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.nec.Service.QuizRegistrationService;

@RestController
@RequestMapping("/quiz")
public class QuizRegistrationController {

    @Autowired
    private QuizRegistrationService quizRegistrationService;

    @GetMapping("/enrolled-count")
    public long getEnrolledCount(@RequestParam Long quizId) {
        return quizRegistrationService.getEnrolledCount(quizId);
    }
}
