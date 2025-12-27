package com.nec.Controller;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.nec.dto.*;
import com.nec.Service.AdminPaymentsService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/payments")
@RequiredArgsConstructor
public class AdminPaymentsController {

    private final AdminPaymentsService adminPaymentsService;

    /**
     * 1️⃣ Get all payments done by a user (by email)
     * Example:
     * GET /api/admin/payments/user?email=ak@gmail.com
     */
    @GetMapping("/user")
    public ResponseEntity<List<UserPaymentResponse>> getPaymentsByUserEmail(
            @RequestParam String email
    ) {
        return ResponseEntity.ok(
                adminPaymentsService.getPaymentsByUserEmail(email)
        );
    }

    /**
     * 2️⃣ Get all users who paid for a quiz
     * Example:
     * GET /api/admin/payments/quiz/users?quizId=5
     */
    @GetMapping("/quiz/users")
    public ResponseEntity<List<QuizUserPaymentResponse>> getUsersPaidForQuiz(
            @RequestParam Long quizId
    ) {
        return ResponseEntity.ok(
                adminPaymentsService.getUsersPaidForQuiz(quizId)
        );
    }
    
    
    @GetMapping("/revenue/range")
    public ResponseEntity<BigDecimal> getRevenueByRange(
            @RequestParam String period
    ) {
        return ResponseEntity.ok(
            adminPaymentsService.getRevenueByPeriod(period)
        );
    }


    /**
     * 3️⃣ Get total revenue of a quiz
     * Example:
     * GET /api/admin/payments/quiz/revenue?quizName=DSA Basics
     */
    @GetMapping("/quiz/revenue")
    public ResponseEntity<QuizRevenueResponse> getQuizRevenue(
            @RequestParam Long quizId
    ) {
        return ResponseEntity.ok(
                adminPaymentsService.getQuizRevenueByQuizId(quizId)
        );
    }
}
