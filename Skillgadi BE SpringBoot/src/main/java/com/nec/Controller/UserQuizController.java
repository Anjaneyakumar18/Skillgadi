package com.nec.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.nec.Entity.Quiz;
import com.nec.Repository.QuizRepository;
import com.nec.Service.QuizService;

@RestController
@RequestMapping("/quiz")
public class UserQuizController {


	@Autowired
	private QuizRepository quizRepository;
	
    @Autowired
    private QuizService quizService;

    UserQuizController(QuizRepository quizRepository) {
        this.quizRepository = quizRepository;
    }

    // 🔐 USER ONLY
    @GetMapping("/enrolled/upcoming")
    public List<Quiz> enrolledUpcoming(@RequestParam Long userId) {
        return quizService.getEnrolledUpcoming(userId);
    }

    // 🔐 USER ONLY
    @GetMapping("/enrolled/live")
    public List<Quiz> enrolledLive(@RequestParam Long userId) {
        return quizService.getEnrolledLive(userId);
    }

    // 🔐 USER ONLY
    @GetMapping("/enrolled/completed")
    public List<Quiz> enrolledCompleted(@RequestParam Long userId) {
        return quizService.getEnrolledCompleted(userId);
    }

    // 🔐 USER ONLY
    @GetMapping("/{quizId}")
    public Optional<Quiz> getQuizById(@PathVariable Long quizId) {
        return quizRepository.findById(quizId);
    }
}
