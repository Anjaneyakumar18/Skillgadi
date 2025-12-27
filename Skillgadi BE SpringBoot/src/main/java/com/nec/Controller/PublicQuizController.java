package com.nec.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.nec.Entity.Quiz;
import com.nec.Service.QuizService;

@RestController
@RequestMapping("/quiz")
public class PublicQuizController {

    @Autowired
    private QuizService quizService;

    // 🌍 PUBLIC
    @GetMapping("/live")
    public List<Quiz> liveQuizzes() {
        return quizService.getLiveQuizzes();
    }

    // 🌍 PUBLIC
    @GetMapping("/completed")
    public List<Quiz> completedQuizzes() {
        return quizService.getCompletedQuizzes();
    }

    // 🌍 PUBLIC
    @GetMapping("/without-questions")
    public List<Quiz> withoutQuestions() {
        return quizService.getQuizzesWithoutQuestions();
    }
}
