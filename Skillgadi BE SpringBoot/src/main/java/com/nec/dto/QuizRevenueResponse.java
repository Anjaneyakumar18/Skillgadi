package com.nec.dto;

import java.math.BigDecimal;

public class QuizRevenueResponse {

    private Long quizId;
    private BigDecimal totalRevenue;

    public QuizRevenueResponse(Long quizId, BigDecimal totalRevenue) {
        this.quizId = quizId;
        this.totalRevenue = totalRevenue;
    }

    public Long getQuizName() { return quizId; }
    public BigDecimal getTotalRevenue() { return totalRevenue; }
}
