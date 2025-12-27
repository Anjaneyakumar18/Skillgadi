package com.nec.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.nec.Entity.QuizQuestion;

@Repository
public interface QuizQuestionRepository extends JpaRepository<QuizQuestion, Long> {

	long countByQuiz_QuizId(Long quizId);

    List<QuizQuestion> findByQuiz_QuizId(Long quizId);

	
}
