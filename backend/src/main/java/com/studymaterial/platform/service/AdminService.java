package com.studymaterial.platform.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.studymaterial.platform.entity.ApprovalStatus;
import com.studymaterial.platform.entity.Branch;
import com.studymaterial.platform.entity.Course;
import com.studymaterial.platform.entity.Role;
import com.studymaterial.platform.entity.StudyMaterial;
import com.studymaterial.platform.entity.Subject;
import com.studymaterial.platform.entity.User;
import com.studymaterial.platform.repository.BranchRepository;
import com.studymaterial.platform.repository.CourseRepository;
import com.studymaterial.platform.repository.StudyMaterialRepository;
import com.studymaterial.platform.repository.SubjectRepository;
import com.studymaterial.platform.repository.UserRepository;

@Service
public class AdminService {

    private final CourseRepository courseRepository;
    private final BranchRepository branchRepository;
    private final SubjectRepository subjectRepository;
    private final StudyMaterialRepository studyMaterialRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminService(CourseRepository courseRepository,
                        BranchRepository branchRepository,
                        SubjectRepository subjectRepository,
                        StudyMaterialRepository studyMaterialRepository,
                        UserRepository userRepository,
                        PasswordEncoder passwordEncoder) {
        this.courseRepository = courseRepository;
        this.branchRepository = branchRepository;
        this.subjectRepository = subjectRepository;
        this.studyMaterialRepository = studyMaterialRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // ==================== Course Management ====================
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Course addCourse(Course course) {
        return courseRepository.save(course);
    }

    public Course updateCourse(Long id, Course course) {
        Course existing = courseRepository.findById(id).orElseThrow(() -> new RuntimeException("Course not found"));
        existing.setName(course.getName());
        return courseRepository.save(existing);
    }

    public void deleteCourse(Long id) {
        courseRepository.deleteById(id);
    }

    // ==================== Branch Management ====================
    public List<Branch> getBranchesByCourse(Long courseId) {
        return branchRepository.findByCourseId(courseId);
    }

    public List<Branch> getAllBranches() {
        return branchRepository.findAll();
    }

    public Branch addBranch(Branch branch) {
        return branchRepository.save(branch);
    }

    public Branch updateBranch(Long id, Branch branch) {
        Branch existing = branchRepository.findById(id).orElseThrow(() -> new RuntimeException("Branch not found"));
        existing.setName(branch.getName());
        return branchRepository.save(existing);
    }

    public void deleteBranch(Long id) {
        branchRepository.deleteById(id);
    }

    // ==================== Subject Management ====================
    public List<Subject> getAllSubjects() {
        return subjectRepository.findAll();
    }

    public Subject addSubject(Subject subject) {
        return subjectRepository.save(subject);
    }

    public Subject updateSubject(Long id, Subject subject) {
        Subject existing = subjectRepository.findById(id).orElseThrow(() -> new RuntimeException("Subject not found"));
        existing.setName(subject.getName());
        existing.setSubjectCode(subject.getSubjectCode());
        return subjectRepository.save(existing);
    }

    public void deleteSubject(Long id) {
        subjectRepository.deleteById(id);
    }

    // ==================== User Management (CRUD) ====================
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public List<User> getAllStudents() {
        return userRepository.findAll().stream().filter(u -> u.getRole() == Role.STUDENT).toList();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Transactional
    public User updateUser(Long id, User userData) {
        User existing = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        if (userData.getName() != null) {
            existing.setName(userData.getName());
        }
        if (userData.getEmail() != null) {
            existing.setEmail(userData.getEmail());
        }
        if (userData.getRole() != null) {
            existing.setRole(userData.getRole());
        }
        return userRepository.save(existing);
    }

    @Transactional
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Transactional
    public User createUser(User user) {
        if (userRepository.existsByCollegeId(user.getCollegeId())) {
            throw new RuntimeException("College ID already taken");
        }
        if (user.getPassword() != null && !user.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        user.setEmailVerified(true); // Admin-created users are auto-verified
        return userRepository.save(user);
    }

    // ==================== Material Approval ====================
    @Transactional
    public void approveMaterial(Long materialId) {
        StudyMaterial material = studyMaterialRepository.findById(materialId).orElseThrow();
        material.setApprovalStatus(ApprovalStatus.APPROVED);
        studyMaterialRepository.save(material);
    }

    @Transactional
    public void rejectMaterial(Long materialId) {
        StudyMaterial material = studyMaterialRepository.findById(materialId).orElseThrow();
        material.setApprovalStatus(ApprovalStatus.REJECTED);
        studyMaterialRepository.save(material);
    }

    public List<StudyMaterial> getPendingMaterials() {
        return studyMaterialRepository.findByApprovalStatus(ApprovalStatus.PENDING);
    }

    public List<StudyMaterial> getAllMaterials() {
        return studyMaterialRepository.findAll();
    }

    // ==================== Dashboard Statistics ====================
    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", userRepository.count());
        stats.put("totalStudents", userRepository.findAll().stream().filter(u -> u.getRole() == Role.STUDENT).count());
        stats.put("totalCourses", courseRepository.count());
        stats.put("totalSubjects", subjectRepository.count());
        stats.put("totalMaterials", studyMaterialRepository.count());
        stats.put("pendingMaterials", studyMaterialRepository.findByApprovalStatus(ApprovalStatus.PENDING).size());
        stats.put("approvedMaterials", studyMaterialRepository.findByApprovalStatus(ApprovalStatus.APPROVED).size());
        stats.put("rejectedMaterials", studyMaterialRepository.findByApprovalStatus(ApprovalStatus.REJECTED).size());
        return stats;
    }
}
