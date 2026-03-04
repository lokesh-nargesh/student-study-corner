package com.studymaterial.platform.controller;

import com.studymaterial.platform.entity.AcademicYear;
import com.studymaterial.platform.entity.Branch;
import com.studymaterial.platform.entity.Course;
import com.studymaterial.platform.entity.Semester;
import com.studymaterial.platform.entity.Subject;
import com.studymaterial.platform.repository.AcademicYearRepository;
import com.studymaterial.platform.repository.BranchRepository;
import com.studymaterial.platform.repository.CourseRepository;
import com.studymaterial.platform.repository.SemesterRepository;
import com.studymaterial.platform.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/data")
public class DataController {

    @Autowired
    BranchRepository branchRepository;

    @Autowired
    SemesterRepository semesterRepository;
    
    @Autowired
    SubjectRepository subjectRepository;

    @Autowired
    CourseRepository courseRepository;

    @Autowired
    AcademicYearRepository academicYearRepository;

    @GetMapping("/branches")
    public ResponseEntity<List<Branch>> getBranches(@org.springframework.web.bind.annotation.RequestParam(required = false) Long courseId) {
        if (courseId != null) {
            return ResponseEntity.ok(branchRepository.findByCourseId(courseId));
        }
        return ResponseEntity.ok(branchRepository.findAll());
    }

    @GetMapping("/academic-years")
    public ResponseEntity<List<AcademicYear>> getAcademicYears(@org.springframework.web.bind.annotation.RequestParam(required = false) Long branchId) {
        if (branchId != null) {
            return ResponseEntity.ok(academicYearRepository.findByBranchId(branchId));
        }
        return ResponseEntity.ok(academicYearRepository.findAll());
    }

    @GetMapping("/semesters")
    public ResponseEntity<List<Semester>> getSemesters(@org.springframework.web.bind.annotation.RequestParam(required = false) Long yearId) {
        if (yearId != null) {
            return ResponseEntity.ok(semesterRepository.findByAcademicYearId(yearId));
        }
        return ResponseEntity.ok(semesterRepository.findAll());
    }

    @GetMapping("/subjects")
    public ResponseEntity<List<Subject>> getSubjectsBySemester(@org.springframework.web.bind.annotation.RequestParam Long semesterId) {
        return ResponseEntity.ok(subjectRepository.findBySemesterId(semesterId));
    }

    @GetMapping("/courses")
    public ResponseEntity<List<Course>> getAllCourses() {
        return ResponseEntity.ok(courseRepository.findAll());
    }
}
