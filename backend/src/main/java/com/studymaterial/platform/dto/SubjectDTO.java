package com.studymaterial.platform.dto;

import lombok.Data;

@Data
public class SubjectDTO {
    private Long id;
    private String name;
    private String subjectCode;
    private Long semesterId;
}
