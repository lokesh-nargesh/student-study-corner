package com.studymaterial.platform.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "academic_years")
public class AcademicYear extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Integer year; // 1, 2, 3, 4

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "branch_id")
    private Branch branch;

    @JsonIgnore
    @OneToMany(mappedBy = "academicYear", cascade = CascadeType.ALL)
    private List<Semester> semesters;

    public AcademicYear() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Integer getYear() { return year; }
    public void setYear(Integer year) { this.year = year; }
    public Branch getBranch() { return branch; }
    public void setBranch(Branch branch) { this.branch = branch; }
    public List<Semester> getSemesters() { return semesters; }
    public void setSemesters(List<Semester> semesters) { this.semesters = semesters; }

    public static AcademicYearBuilder builder() {
        return new AcademicYearBuilder();
    }

    public static class AcademicYearBuilder {
        private AcademicYear academicYear = new AcademicYear();
        public AcademicYearBuilder id(Long id) { academicYear.setId(id); return this; }
        public AcademicYearBuilder year(Integer year) { academicYear.setYear(year); return this; }
        public AcademicYearBuilder branch(Branch branch) { academicYear.setBranch(branch); return this; }
        public AcademicYear build() { return academicYear; }
    }
}
