package com.nec.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nec.Entity.Quiz;
import com.nec.Entity.QuizQuestion;
import com.nec.Repository.QuizQuestionRepository;
import com.nec.Repository.QuizRegistrationRepository;
import com.nec.Repository.QuizRepository;


@Service
public class QuizService {
	
	 @Autowired
	    private QuizRepository quizRepository;

	    @Autowired
	    private QuizQuestionRepository quizQuestionRepository;


	    @Autowired
	    private QuizRegistrationRepository quizRegistrationRepository;

	    /* =======================
	       ENROLLED QUIZZES
	    ======================= */

	    public List<Quiz> getEnrolledUpcoming(Long userId) {
	        return quizRegistrationRepository.findEnrolledUpcoming(userId);
	    }

	    public List<Quiz> getEnrolledLive(Long userId) {
	        return quizRegistrationRepository.findEnrolledLive(userId);
	    }

	    public List<Quiz> getEnrolledCompleted(Long userId) {
	        return quizRegistrationRepository.findEnrolledCompleted(userId);
	    }




	    
	    public List<Quiz> getLiveQuizzes() {
	        return quizRepository.findLiveQuizzes();
	    }

	    public List<Quiz> getCompletedQuizzes() {
	        return quizRepository.findCompletedQuizzes();
	    }

	    public void addQuestions(Long quizId, List<QuizQuestion> questions) {

	        Quiz quiz = quizRepository.findById(quizId)
	                .orElseThrow(() -> new RuntimeException("Quiz not found"));

	        for (QuizQuestion q : questions) {
	            q.setQuiz(quiz);
	            quizQuestionRepository.save(q);
	        }
	    }

	@Autowired
	private QuizRepository quizrepository;
	
	@Autowired
	private QuizQuestionRepository quizquestionrepository;
	
	public List<Quiz> getUpcoming() {
		// TODO Auto-generated method stub
		return quizrepository.getUpcoming();
	}

//	public List<QuizQuestion> getQuiz(Long qid) {
//		// TODO Auto-generated method stub
//		return quizquestionrepository.findByQuizId(qid);
//	}

	public Quiz addQuiz(Quiz quiz) {
	    return quizrepository.save(quiz);
	}


	public List<QuizQuestion> getQuiz(Long qid) {
		// TODO Auto-generated method stub
		return null;
	}
	
	public List<Quiz> getQuizzesWithoutQuestions() {
	    return quizrepository.findQuizzesWithoutQuestions();
	}
	

}
