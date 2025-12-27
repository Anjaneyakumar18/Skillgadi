package com.nec.Entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "payments")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "quiz_id")
    private Quiz quiz;

    private String razorpayOrderId;
    private String razorpayPaymentId;
    private String razorpaySignature;

    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;

    private LocalDateTime paymentTime;

    private Boolean webhookVerified = false;

    public enum PaymentStatus {
        CREATED, SUCCESS, FAILED
    }

    /* ===== Getters & Setters ===== */

    public Long getPaymentId() {
        return paymentId;
    }

    public User getUser() {
        return user;
    }

    public Quiz getQuiz() {
        return quiz;
    }

    public String getRazorpayOrderId() {
        return razorpayOrderId;
    }

    public String getRazorpayPaymentId() {
        return razorpayPaymentId;
    }

    public String getRazorpaySignature() {
        return razorpaySignature;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public PaymentStatus getPaymentStatus() {
        return paymentStatus;
    }

    public LocalDateTime getPaymentTime() {
        return paymentTime;
    }

    public Boolean getWebhookVerified() {
        return webhookVerified;
    }

    public void setPaymentStatus(PaymentStatus paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public void setWebhookVerified(Boolean webhookVerified) {
        this.webhookVerified = webhookVerified;
    }
}
