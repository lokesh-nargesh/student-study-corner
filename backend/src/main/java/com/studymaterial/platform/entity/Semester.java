package com.studymaterial.platform.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "semesters")
public class Semester extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Integer semesterNumber; // 1 to 8

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "academic_year_id")
    private AcademicYear academicYear;

    @JsonIgnore
    @OneToMany(mappedBy = "semester", cascade = CascadeType.ALL)
    private List<Subject> subjects;

    public Semester() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Integer getSemesterNumber() { return semesterNumber; }
    public void setSemesterNumber(Integer semesterNumber) { this.semesterNumber = semesterNumber; }
    public AcademicYear getAcademicYear() { return academicYear; }
    public void setAcademicYear(AcademicYear academicYear) { this.academicYear = academicYear; }
    public List<Subject> getSubjects() { return subjects; }
    public void setSubjects(List<Subject> subjects) { this.subjects = subjects; }

    public static SemesterBuilder builder() {
        return new SemesterBuilder();
    }

    public static class SemesterBuilder {
        private Semester semester = new Semester();
        public SemesterBuilder id(Long id) { semester.setId(id); return this; }
        public SemesterBuilder semesterNumber(Integer semesterNumber) { semester.setSemesterNumber(semesterNumber); return this; }
        public SemesterBuilder academicYear(AcademicYear academicYear) { semester.setAcademicYear(academicYear); return this; }
        public Semester build() { return semester; }
    }
}
