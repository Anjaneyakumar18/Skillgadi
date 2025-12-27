package com.nec.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.nec.Entity.Quiz;
import com.nec.Entity.QuizQuestion;
import com.nec.Repository.QuizQuestionRepository;
import com.nec.Repository.QuizRepository;
import com.nec.Service.QuizService;

@RestController
@RequestMapping("/admin/quiz")
public class AdminQuizController {

    private final QuizQuestionRepository quizQuestionRepository;

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private QuizService quizService;


    AdminQuizController(QuizQuestionRepository quizQuestionRepository) {
        this.quizQuestionRepository = quizQuestionRepository;
    }
    
    
    
    @GetMapping("/{quizId}")
    public Quiz getQuizById(@PathVariable Long quizId) {
        return quizRepository.findById(quizId)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));
    }
    
    @GetMapping("/without-questions")
    public List<Quiz> withoutQuestions(){
    	for(int i=0;i<11;i++) {
    		System.out.println("reached!!!without Q");
    	}
    	return quizRepository.findQuizzesWithoutQuestions();
    }
    @GetMapping("/completed")
    public List<Quiz> completed(){
    	for(int i=0;i<11;i++) {
    		System.out.println("reached!!!completed");
    	}
    	return quizRepository.findCompletedQuizzes();
    }
    @GetMapping("/live")
    public List<Quiz> live(){
    	for(int i=0;i<11;i++) {
    		System.out.println("reached!!!");
    	}
    	return quizRepository.findLiveQuizzes();
    }

    // 🔒 ADMIN ONLY
    @GetMapping("/up-comming")
    public List<Quiz> upcoming() {
    	for(int i=0;i<11;i++) {
    		System.out.println("reached!!!");
    	}
        return quizRepository.getUpcoming();
    }

    // 🔒 ADMIN ONLY
    @PostMapping("/add")
    public boolean addQuiz(@RequestBody Quiz quiz) {
    	for(int i=0;i<11;i++) {
    		System.out.println("reached!!!");
    	}
        quizRepository.save(quiz);
        return true;
    }

    // 🔒 ADMIN ONLY
    @PostMapping("/{quizId}/add-questions")
    public String addQuestions(
            @PathVariable Long quizId,
            @RequestBody List<QuizQuestion> questions
    ) {
        quizService.addQuestions(quizId, questions);
        return "Questions added successfully";
    }

    
   
    // 🔒 ADMIN ONLY
    @PostMapping("/proceed")
    public void proceed(@RequestParam Long quiz_id) {
    	
    	for(int i=0;i<11;i++) {
    		System.out.println("reached!!! proceeddd");
    	}
    	
        quizRepository.proceed(quiz_id);
    }
}
