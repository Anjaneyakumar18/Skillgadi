package com.nec.dto;

public class QuizStatsDto {

    private Long quizId;
    private String quizName;
    private String createdBy;
    private long registeredCount;
    private long attemptedCount;

    // getters & setters
    public Long getQuizId() { return quizId; }
    public void setQuizId(Long quizId) { this.quizId = quizId; }

    public String getQuizName() { return quizName; }
    public void setQuizName(String quizName) { this.quizName = quizName; }

    public String getCreatedBy() { return createdBy; }
    public void setCreatedBy(String createdBy) { this.createdBy = createdBy; }

    public long getRegisteredCount() { return registeredCount; }
    public void setRegisteredCount(long registeredCount) {
        this.registeredCount = registeredCount;
    }

    public long getAttemptedCount() { return attemptedCount; }
    public void setAttemptedCount(long attemptedCount) {
        this.attemptedCount = attemptedCount;
    }
}
