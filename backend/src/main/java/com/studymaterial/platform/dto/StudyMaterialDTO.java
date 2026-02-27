package com.studymaterial.platform.dto;

import com.studymaterial.platform.entity.MaterialType;
import com.studymaterial.platform.entity.ApprovalStatus;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class StudyMaterialDTO {
    private Long id;
    private String title;
    private String description;
    private MaterialType materialType;
    private String fileUrl;
    private String uploadedByCollegeId;
    private String uploadedByName;
    private LocalDateTime uploadDate;
    private ApprovalStatus approvalStatus;
    private String subjectName;
    private String subjectCode;
    private String courseName;
    private String branchName;
    private Integer semesterNumber;
    private Integer academicYear;
    private Integer downloadCount;
}
