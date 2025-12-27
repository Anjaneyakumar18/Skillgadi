package com.nec.Entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.*;

@Entity
@Table(name = "notes")
public class Note {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long noteId;

    private String title;

    @Column(length = 1000)
    private String description;

    private BigDecimal price;

    @Column(nullable = false, length = 500)
    private String driveLink;   // PRIVATE (never expose directly)

    private Boolean isActive = true;

    @CreationTimestamp
    private LocalDateTime createdAt;

    /* ===== Getters & Setters ===== */

    public Long getNoteId() { return noteId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public String getDriveLink() { return driveLink; }
    public void setDriveLink(String driveLink) { this.driveLink = driveLink; }

    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }

    public LocalDateTime getCreatedAt() { return createdAt; }
}
