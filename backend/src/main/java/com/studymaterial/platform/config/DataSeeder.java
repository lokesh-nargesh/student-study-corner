package com.studymaterial.platform.config;

import java.util.Arrays;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

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

@Component
public class DataSeeder implements CommandLineRunner {

    private final CourseRepository courseRepository;
    private final BranchRepository branchRepository;
    private final AcademicYearRepository academicYearRepository;
    private final SemesterRepository semesterRepository;
    private final SubjectRepository subjectRepository;

    public DataSeeder(CourseRepository courseRepository,
                      BranchRepository branchRepository,
                      AcademicYearRepository academicYearRepository,
                      SemesterRepository semesterRepository,
                      SubjectRepository subjectRepository) {
        this.courseRepository = courseRepository;
        this.branchRepository = branchRepository;
        this.academicYearRepository = academicYearRepository;
        this.semesterRepository = semesterRepository;
        this.subjectRepository = subjectRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (courseRepository.count() == 0) {
            seedData();
        }
    }

    private void seedData() {
        // Courses
        Course be = Course.builder().name("B.E.").build();
        Course btech = Course.builder().name("B.Tech.").build();
        courseRepository.saveAll(Arrays.asList(be, btech));

        // Branches
        Branch cs = Branch.builder().name("Computer Science").course(be).build();
        Branch it = Branch.builder().name("Information Technology").course(be).build();
        Branch ec = Branch.builder().name("Electronics").course(be).build();
        branchRepository.saveAll(Arrays.asList(cs, it, ec));

        // Academic Years
        // Note: Entities currently link AcademicYear to Branch and Semester to AcademicYear.
        AcademicYear y1 = AcademicYear.builder().year(1).branch(cs).build();
        AcademicYear y2 = AcademicYear.builder().year(2).branch(cs).build();
        AcademicYear y3 = AcademicYear.builder().year(3).branch(cs).build();
        AcademicYear y4 = AcademicYear.builder().year(4).branch(cs).build();
        academicYearRepository.saveAll(Arrays.asList(y1, y2, y3, y4));

        // Semesters
        for (int i = 1; i <= 8; i++) {
            AcademicYear year = (i <= 2) ? y1 : (i <= 4) ? y2 : (i <= 6) ? y3 : y4;
            Semester sem = Semester.builder().semesterNumber(i).academicYear(year).build();
            semesterRepository.save(sem);
            
            // Add some subjects for 1st semester as a sample
            if (i == 1) {
                Subject maths = Subject.builder().name("Mathematics I").subjectCode("MA101").semester(sem).build();
                Subject physics = Subject.builder().name("Physics").subjectCode("PH101").semester(sem).build();
                subjectRepository.saveAll(Arrays.asList(maths, physics));
            }
        }
        
        System.out.println("Data seeding completed!");
    }
}
