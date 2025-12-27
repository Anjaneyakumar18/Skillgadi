package com.nec.Entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "note_payments")
public class NotePayment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long notePaymentId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "note_id", nullable = false)
    private Note note;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;

    private LocalDateTime paymentTime;

    private Boolean emailSent = false;

    public enum PaymentStatus {
        CREATED, SUCCESS, FAILED
    }

    /* ===== Getters ===== */

    public Long getNotePaymentId() {
        return notePaymentId;
    }

    public Note getNote() {
        return note;
    }

    public User getUser() {
        return user;
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

    public Boolean getEmailSent() {
        return emailSent;
    }

    /* ===== Setters ===== */

    public void setNotePaymentId(Long notePaymentId) {
        this.notePaymentId = notePaymentId;
    }

    public void setNote(Note note) {
        this.note = note;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public void setPaymentStatus(PaymentStatus paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public void setPaymentTime(LocalDateTime paymentTime) {
        this.paymentTime = paymentTime;
    }

    public void setEmailSent(Boolean emailSent) {
        this.emailSent = emailSent;
    }
}
