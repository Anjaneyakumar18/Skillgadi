package com.nec.dto;

public class UpdateProfileRequest {
    private String email;
    private String mobileNumber;
    private Integer yearOfStudy;

    public String getEmail() { return email; }
    public String getMobileNumber() { return mobileNumber; }
    public Integer getYearOfStudy() { return yearOfStudy; }

    public void setEmail(String email) { this.email = email; }
    public void setMobileNumber(String mobileNumber) { this.mobileNumber = mobileNumber; }
    public void setYearOfStudy(Integer yearOfStudy) { this.yearOfStudy = yearOfStudy; }
}