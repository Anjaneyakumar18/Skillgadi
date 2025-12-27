package com.nec.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.nec.Entity.Payment.PaymentStatus;

public class UserPaymentResponse {

    private Long paymentId;
    private String quizName;
    private BigDecimal amount;
    private PaymentStatus paymentStatus;
    private LocalDateTime paymentTime;

    public UserPaymentResponse(
            Long paymentId,
            String quizName,
            BigDecimal amount,
            PaymentStatus paymentStatus,
            LocalDateTime paymentTime
    ) {
        this.paymentId = paymentId;
        this.quizName = quizName;
        this.amount = amount;
        this.paymentStatus = paymentStatus;
        this.paymentTime = paymentTime;
    }

    public Long getPaymentId() { return paymentId; }
    public String getQuizName() { return quizName; }
    public BigDecimal getAmount() { return amount; }
    public PaymentStatus getPaymentStatus() { return paymentStatus; }
    public LocalDateTime getPaymentTime() { return paymentTime; }
}
