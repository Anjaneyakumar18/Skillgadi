package com.nec.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class QuizUserPaymentResponse {

    private String userEmail;
    private BigDecimal amount;
    private LocalDateTime paymentTime;

    public QuizUserPaymentResponse(
            String userEmail,
            BigDecimal amount,
            LocalDateTime paymentTime
    ) {
        this.userEmail = userEmail;
        this.amount = amount;
        this.paymentTime = paymentTime;
    }

    public String getUserEmail() { return userEmail; }
    public BigDecimal getAmount() { return amount; }
    public LocalDateTime getPaymentTime() { return paymentTime; }
}
