package com.nec.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.nec.Entity.Quiz;
import com.nec.Entity.QuizRegistration;

public interface QuizRegistrationRepository
        extends JpaRepository<QuizRegistration, Long> {

    /* =======================
       COUNT ENROLLMENTS
    ======================= */
    @Query("SELECT COUNT(qr) FROM QuizRegistration qr WHERE qr.quiz.quizId = :quizId")
    long countEnrollments(@Param("quizId") Long quizId);

    /* =======================
       ENROLLED UPCOMING QUIZZES
    ======================= */
    @Query("""
        SELECT qr.quiz FROM QuizRegistration qr
        WHERE qr.user.userId = :userId
          AND qr.quiz.startTime > CURRENT_TIMESTAMP
    """)
    List<Quiz> findEnrolledUpcoming(@Param("userId") Long userId);

    /* =======================
       ENROLLED LIVE QUIZZES
    ======================= */
    @Query("""
        SELECT qr.quiz FROM QuizRegistration qr
        WHERE qr.user.userId = :userId
          AND qr.quiz.startTime <= CURRENT_TIMESTAMP
          AND qr.quiz.endTime >= CURRENT_TIMESTAMP
    """)
    List<Quiz> findEnrolledLive(@Param("userId") Long userId);

    /* =======================
       ENROLLED COMPLETED QUIZZES
    ======================= */
    @Query("""
        SELECT qr.quiz FROM QuizRegistration qr
        WHERE qr.user.userId = :userId
          AND qr.quiz.endTime < CURRENT_TIMESTAMP
    """)
    List<Quiz> findEnrolledCompleted(@Param("userId") Long userId);
}
