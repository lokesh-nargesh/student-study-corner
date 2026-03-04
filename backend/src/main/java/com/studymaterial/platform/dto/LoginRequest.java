package com.studymaterial.platform.dto;


public class LoginRequest {
    private String collegeId;
    private String password;

    public String getCollegeId() { return collegeId; }
    public void setCollegeId(String collegeId) { this.collegeId = collegeId; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
