package com.studymaterial.platform.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "branches")
public class Branch extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "course_id")
    private Course course;

    @JsonIgnore
    @OneToMany(mappedBy = "branch", cascade = CascadeType.ALL)
    private List<AcademicYear> academicYears;

    public Branch() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Course getCourse() { return course; }
    public void setCourse(Course course) { this.course = course; }
    public List<AcademicYear> getAcademicYears() { return academicYears; }
    public void setAcademicYears(List<AcademicYear> academicYears) { this.academicYears = academicYears; }

    public static BranchBuilder builder() {
        return new BranchBuilder();
    }

    public static class BranchBuilder {
        private Branch branch = new Branch();
        public BranchBuilder id(Long id) { branch.setId(id); return this; }
        public BranchBuilder name(String name) { branch.setName(name); return this; }
        public BranchBuilder course(Course course) { branch.setCourse(course); return this; }
        public Branch build() { return branch; }
    }
}
