package com.studymaterial.platform.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String collegeId;
    private String password;
}
