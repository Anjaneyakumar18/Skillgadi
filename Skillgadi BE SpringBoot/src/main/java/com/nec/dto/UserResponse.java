package com.nec.dto;

import java.time.LocalDateTime;

public class UserResponse {

    private Long userId;
    private String username;
    private String email;
    private LocalDateTime createdAt;

    public UserResponse(Long userId, String username, String email, LocalDateTime createdAt) {
        this.userId = userId;
        this.username = username;
        this.email = email;
        this.createdAt = createdAt;
    }

    public Long getUserId() { return userId; }
    public String getUsername() { return username; }
    public String getEmail() { return email; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}
