package com.nec.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.nec.Service.QuizStatsService;
import com.nec.dto.QuizStatsDto;

@RestController
@RequestMapping("/admin/quiz")
public class QuizStatsController {

    @Autowired
    private QuizStatsService quizStatsService;

    // 🔒 ADMIN
    @GetMapping("/stats")
    public QuizStatsDto quizStats(@RequestParam Long quizId) {
        return quizStatsService.getQuizStats(quizId);
    }
}
