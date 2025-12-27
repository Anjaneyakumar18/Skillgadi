package com.nec.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;

@Entity
public class HiddenCases {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long hidden_case_id;

    @ManyToOne
    @JoinColumn(name = "code_id", nullable = false)
    private Code code;

    private String input;
    private String expectedOutput;

    // Required by JPA
    public HiddenCases() {
    }

    // Getters and Setters
    public Long getHidden_case_id() {
        return hidden_case_id;
    }

    public void setHidden_case_id(Long hidden_case_id) {
        this.hidden_case_id = hidden_case_id;
    }

    public Code getCode() {
        return code;
    }

    public void setCode(Code code) {
        this.code = code;
    }

    public String getInput() {
        return input;
    }

    public void setInput(String input) {
        this.input = input;
    }

    public String getExpectedOutput() {
        return expectedOutput;
    }

    public void setExpectedOutput(String expectedOutput) {
        this.expectedOutput = expectedOutput;
    }
}
