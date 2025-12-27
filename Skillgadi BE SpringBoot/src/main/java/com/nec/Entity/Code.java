package com.nec.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
public class Code {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "code_id")
	private Long codeId;

    private String name;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String statement;
    private String sampleinput1;
    private String sampleinput2;
    private String sampleoutput1;
    private String sampleoutput2;

    // Required by JPA
    public Code() {
    }

    // Getters and Setters
    public Long getCodeId() {
        return codeId;
    }

    public void setCodeId(Long codeId) {
        this.codeId = codeId;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStatement() {
        return statement;
    }

    public void setStatement(String statement) {
        this.statement = statement;
    }

    public String getSampleinput1() {
        return sampleinput1;
    }

    public void setSampleinput1(String sampleinput1) {
        this.sampleinput1 = sampleinput1;
    }

    public String getSampleinput2() {
        return sampleinput2;
    }

    public void setSampleinput2(String sampleinput2) {
        this.sampleinput2 = sampleinput2;
    }

    public String getSampleoutput1() {
        return sampleoutput1;
    }

    public void setSampleoutput1(String sampleoutput1) {
        this.sampleoutput1 = sampleoutput1;
    }

    public String getSampleoutput2() {
        return sampleoutput2;
    }

    public void setSampleoutput2(String sampleoutput2) {
        this.sampleoutput2 = sampleoutput2;
    }
}
