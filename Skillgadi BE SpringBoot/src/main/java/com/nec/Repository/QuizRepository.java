package com.nec.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.nec.Entity.Quiz;

import jakarta.transaction.Transactional;

public interface QuizRepository extends JpaRepository<Quiz, Long> {

	
	
	
	
	@Query(value = """
	        SELECT COUNT(*)
	        FROM quiz_registrations
	        WHERE quiz_id = :quizId
	    """, nativeQuery = true)
	    long countRegistrations(@Param("quizId") Long quizId);

	    // ✅ count attempts
	    @Query(value = """
	        SELECT COUNT(DISTINCT user_id)
	        FROM attempt
	        WHERE quiz_id = :quizId
	    """, nativeQuery = true)
	    long countAttempts(@Param("quizId") Long quizId);

	    // ✅ quiz creator
	    @Query(value = """
	        SELECT u.username
	        FROM quiz q
	        JOIN users u ON q.created_by = u.user_id
	        WHERE q.quiz_id = :quizId
	    """, nativeQuery = true)
	    String findCreatorName(@Param("quizId") Long quizId);
	
	
	
	
	@Query("SELECT COUNT(qr) FROM QuizRegistration qr WHERE qr.quiz.quizId = :quizId")
    long countEnrollments(@Param("quizId") Long quizId);

    @Query("""
        SELECT q FROM Quiz q
        WHERE q.quizId NOT IN (
            SELECT DISTINCT qq.quiz.quizId FROM QuizQuestion qq
        )
    """)
    List<Quiz> findQuizzesWithoutQuestions();
    

    @Query("""
        SELECT q FROM Quiz q
        WHERE q.startTime <= CURRENT_TIMESTAMP
          AND q.endTime >= CURRENT_TIMESTAMP
    """)
    List<Quiz> findLiveQuizzes();

    
    @Query("""
        SELECT q FROM Quiz q
        WHERE q.endTime < CURRENT_TIMESTAMP
    """)
    List<Quiz> findCompletedQuizzes();
	
    
	
    @Query("SELECT q FROM Quiz q WHERE q.startTime > CURRENT_TIMESTAMP")
    List<Quiz> getUpcoming();

    @Modifying
    @Transactional
    @Query("UPDATE Quiz q SET q.proceed = true WHERE q.quizId = :quizId")
    int proceed(@Param("quizId") Long quizId);
    
    // ✅ Quizzes which have ZERO questions
    
}
