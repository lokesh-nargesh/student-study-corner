package com.studymaterial.platform.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "study_materials")
public class StudyMaterial extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MaterialType materialType;

    @Column(nullable = false)
    private String fileUrl;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User uploadedBy;

    private LocalDateTime uploadDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ApprovalStatus approvalStatus = ApprovalStatus.PENDING;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "subject_id", nullable = false)
    private Subject subject;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "course_id")
    private Course course;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "branch_id")
    private Branch branch;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "academic_year_id")
    private AcademicYear academicYear;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "semester_id")
    private Semester semester;

    private Integer downloadCount = 0;

    public StudyMaterial() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public MaterialType getMaterialType() { return materialType; }
    public void setMaterialType(MaterialType materialType) { this.materialType = materialType; }
    public String getFileUrl() { return fileUrl; }
    public void setFileUrl(String fileUrl) { this.fileUrl = fileUrl; }
    public User getUploadedBy() { return uploadedBy; }
    public void setUploadedBy(User uploadedBy) { this.uploadedBy = uploadedBy; }
    public LocalDateTime getUploadDate() { return uploadDate; }
    public void setUploadDate(LocalDateTime uploadDate) { this.uploadDate = uploadDate; }
    public ApprovalStatus getApprovalStatus() { return approvalStatus; }
    public void setApprovalStatus(ApprovalStatus approvalStatus) { this.approvalStatus = approvalStatus; }
    public Subject getSubject() { return subject; }
    public void setSubject(Subject subject) { this.subject = subject; }
    public Course getCourse() { return course; }
    public void setCourse(Course course) { this.course = course; }
    public Branch getBranch() { return branch; }
    public void setBranch(Branch branch) { this.branch = branch; }
    public AcademicYear getAcademicYear() { return academicYear; }
    public void setAcademicYear(AcademicYear academicYear) { this.academicYear = academicYear; }
    public Semester getSemester() { return semester; }
    public void setSemester(Semester semester) { this.semester = semester; }
    public Integer getDownloadCount() { return downloadCount; }
    public void setDownloadCount(Integer downloadCount) { this.downloadCount = downloadCount; }

    public static StudyMaterialBuilder builder() {
        return new StudyMaterialBuilder();
    }

    public static class StudyMaterialBuilder {
        private StudyMaterial material = new StudyMaterial();
        public StudyMaterialBuilder id(Long id) { material.setId(id); return this; }
        public StudyMaterialBuilder title(String title) { material.setTitle(title); return this; }
        public StudyMaterialBuilder description(String description) { material.setDescription(description); return this; }
        public StudyMaterialBuilder materialType(MaterialType materialType) { material.setMaterialType(materialType); return this; }
        public StudyMaterialBuilder fileUrl(String fileUrl) { material.setFileUrl(fileUrl); return this; }
        public StudyMaterialBuilder uploadedBy(User uploadedBy) { material.setUploadedBy(uploadedBy); return this; }
        public StudyMaterialBuilder uploadDate(LocalDateTime uploadDate) { material.setUploadDate(uploadDate); return this; }
        public StudyMaterialBuilder approvalStatus(ApprovalStatus approvalStatus) { material.setApprovalStatus(approvalStatus); return this; }
        public StudyMaterialBuilder subject(Subject subject) { material.setSubject(subject); return this; }
        public StudyMaterialBuilder course(Course course) { material.setCourse(course); return this; }
        public StudyMaterialBuilder branch(Branch branch) { material.setBranch(branch); return this; }
        public StudyMaterialBuilder academicYear(AcademicYear academicYear) { material.setAcademicYear(academicYear); return this; }
        public StudyMaterialBuilder semester(Semester semester) { material.setSemester(semester); return this; }
        public StudyMaterial build() { return material; }
    }
}
