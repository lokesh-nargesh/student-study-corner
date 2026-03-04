package com.studymaterial.platform.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "subjects")
public class Subject extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String subjectCode;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "semester_id")
    private Semester semester;

    @JsonIgnore
    @OneToMany(mappedBy = "subject", cascade = CascadeType.ALL)
    private List<StudyMaterial> materials;

    public Subject() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getSubjectCode() { return subjectCode; }
    public void setSubjectCode(String subjectCode) { this.subjectCode = subjectCode; }
    public Semester getSemester() { return semester; }
    public void setSemester(Semester semester) { this.semester = semester; }
    public List<StudyMaterial> getMaterials() { return materials; }
    public void setMaterials(List<StudyMaterial> materials) { this.materials = materials; }

    public static SubjectBuilder builder() {
        return new SubjectBuilder();
    }

    public static class SubjectBuilder {
        private Subject subject = new Subject();
        public SubjectBuilder id(Long id) { subject.setId(id); return this; }
        public SubjectBuilder name(String name) { subject.setName(name); return this; }
        public SubjectBuilder subjectCode(String subjectCode) { subject.setSubjectCode(subjectCode); return this; }
        public SubjectBuilder semester(Semester semester) { subject.setSemester(semester); return this; }
        public Subject build() { return subject; }
    }
}
