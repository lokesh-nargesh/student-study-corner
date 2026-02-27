package com.studymaterial.platform.dto;

import lombok.Data;

@Data
public class RegisterRequest {

    private String collegeId;
    private String name;
    private String email;
    private String password;
    private Long courseId;
    private Long branchId;
    private Long academicYearId;
    private Long semesterId;
}
