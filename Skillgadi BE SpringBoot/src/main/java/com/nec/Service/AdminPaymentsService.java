package com.nec.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.jspecify.annotations.Nullable;
import org.springframework.stereotype.Service;

import com.nec.dto.*;
import com.nec.Entity.Payment;
import com.nec.Entity.Quiz;
import com.nec.Repository.AdminPaymentsRepository;
import com.nec.Repository.QuizRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminPaymentsService {

    private final AdminPaymentsRepository paymentsRepo;
    private final QuizRepository quizRepository;

    // 1️⃣ Payments by user email
    public List<UserPaymentResponse> getPaymentsByUserEmail(String email) {
        return paymentsRepo.findByUserEmailOrderByPaymentTimeDesc(email)
                .stream()
                .map(p -> new UserPaymentResponse(
                        p.getPaymentId(),
                        p.getQuiz() != null ? p.getQuiz().getQuizName() : "N/A",
                        p.getAmount(),
                        p.getPaymentStatus(),
                        p.getPaymentTime()
                ))
                .toList();
    }

    // 2️⃣ Users who paid for a quiz
    public List<QuizUserPaymentResponse> getUsersPaidForQuiz(Long quizId) {

        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        return paymentsRepo.findByQuizAndPaymentStatus(
                        quiz,
                        Payment.PaymentStatus.SUCCESS
                )
                .stream()
                .map(p -> new QuizUserPaymentResponse(
                        p.getUser().getEmail(),
                        p.getAmount(),
                        p.getPaymentTime()
                ))
                .toList();
    }

    
    public BigDecimal getRevenueByPeriod(String period) {

        LocalDateTime now = LocalDateTime.now();
        LocalDateTime from;

        switch (period) {
            case "1D" -> from = now.minusDays(1);
            case "7D" -> from = now.minusDays(7);
            case "14D" -> from = now.minusDays(14);
            case "1M" -> from = now.minusMonths(1);
            case "2M" -> from = now.minusMonths(2);
            case "6M" -> from = now.minusMonths(6);
            case "1Y" -> from = now.minusYears(1);
            default -> throw new IllegalArgumentException("Invalid period");
        }

        return paymentsRepo.getRevenueFromDate(from);
    }

    // 3️⃣ Revenue by quiz name
    public QuizRevenueResponse getQuizRevenueByQuizId(Long quizId) {

        BigDecimal revenue =
                paymentsRepo.getTotalRevenueByQuizId(quizId);

        return new QuizRevenueResponse(quizId, revenue);
    }

	
}
