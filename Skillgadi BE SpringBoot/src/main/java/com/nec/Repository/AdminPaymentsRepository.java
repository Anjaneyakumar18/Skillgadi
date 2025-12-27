package com.nec.Repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.nec.Entity.Payment;
import com.nec.Entity.Quiz;

public interface AdminPaymentsRepository extends JpaRepository<Payment, Long> {

    // 1️⃣ Payments by user email
    List<Payment> findByUserEmailOrderByPaymentTimeDesc(String email);

    // 2️⃣ Payments by quiz name
    List<Payment> findByQuizAndPaymentStatus(
            Quiz quiz,
            Payment.PaymentStatus status
    );
    
    @Query("""
    	    SELECT COALESCE(SUM(p.amount), 0)
    	    FROM Payment p
    	    WHERE p.paymentStatus = com.nec.Entity.Payment$PaymentStatus.SUCCESS
    	    AND p.paymentTime >= :fromDate
    	""")
    	BigDecimal getRevenueFromDate(@Param("fromDate") LocalDateTime fromDate);


    // 3️⃣ Total revenue by quiz
    @Query("""
    	    SELECT COALESCE(SUM(p.amount), 0)
    	    FROM Payment p
    	    WHERE p.quiz.quizId = :quizId
    	    AND p.paymentStatus = com.nec.Entity.Payment$PaymentStatus.SUCCESS
    	""")
    	BigDecimal getTotalRevenueByQuizId(@Param("quizId") Long quizId);
}
