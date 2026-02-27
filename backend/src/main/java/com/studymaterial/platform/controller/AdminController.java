package com.studymaterial.platform.controller;

import com.studymaterial.platform.entity.Branch;
import com.studymaterial.platform.entity.Course;
import com.studymaterial.platform.entity.Subject;
import com.studymaterial.platform.entity.User;
import com.studymaterial.platform.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @Autowired
    AdminService adminService;

    // ==================== Dashboard ====================
    @GetMapping("/dashboard/stats")
    public ResponseEntity<?> getDashboardStats() {
        return ResponseEntity.ok(adminService.getDashboardStats());
    }

    // ==================== User Management ====================
    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.ok(adminService.getAllUsers());
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(adminService.getUserById(id));
    }

    @PostMapping("/users")
    public ResponseEntity<?> createUser(@RequestBody User user) {
        return ResponseEntity.ok(adminService.createUser(user));
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User user) {
        return ResponseEntity.ok(adminService.updateUser(id, user));
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        adminService.deleteUser(id);
        return ResponseEntity.ok(Map.of("message", "User deleted successfully"));
    }

    // ==================== Course Management ====================
    @GetMapping("/courses")
    public ResponseEntity<?> getCourses() {
        return ResponseEntity.ok(adminService.getAllCourses());
    }

    @PostMapping("/courses")
    public ResponseEntity<?> addCourse(@RequestBody Course course) {
        return ResponseEntity.ok(adminService.addCourse(course));
    }

    @PutMapping("/courses/{id}")
    public ResponseEntity<?> updateCourse(@PathVariable Long id, @RequestBody Course course) {
        return ResponseEntity.ok(adminService.updateCourse(id, course));
    }

    @DeleteMapping("/courses/{id}")
    public ResponseEntity<?> deleteCourse(@PathVariable Long id) {
        adminService.deleteCourse(id);
        return ResponseEntity.ok(Map.of("message", "Course deleted successfully"));
    }

    // ==================== Branch Management ====================
    @GetMapping("/branches")
    public ResponseEntity<?> getAllBranches() {
        return ResponseEntity.ok(adminService.getAllBranches());
    }

    @PostMapping("/branches")
    public ResponseEntity<?> addBranch(@RequestBody Branch branch) {
        return ResponseEntity.ok(adminService.addBranch(branch));
    }

    @PutMapping("/branches/{id}")
    public ResponseEntity<?> updateBranch(@PathVariable Long id, @RequestBody Branch branch) {
        return ResponseEntity.ok(adminService.updateBranch(id, branch));
    }

    @DeleteMapping("/branches/{id}")
    public ResponseEntity<?> deleteBranch(@PathVariable Long id) {
        adminService.deleteBranch(id);
        return ResponseEntity.ok(Map.of("message", "Branch deleted successfully"));
    }

    // ==================== Subject Management ====================
    @GetMapping("/subjects")
    public ResponseEntity<?> getSubjects() {
        return ResponseEntity.ok(adminService.getAllSubjects());
    }

    @PostMapping("/subjects")
    public ResponseEntity<?> addSubject(@RequestBody Subject subject) {
        return ResponseEntity.ok(adminService.addSubject(subject));
    }

    @PutMapping("/subjects/{id}")
    public ResponseEntity<?> updateSubject(@PathVariable Long id, @RequestBody Subject subject) {
        return ResponseEntity.ok(adminService.updateSubject(id, subject));
    }

    @DeleteMapping("/subjects/{id}")
    public ResponseEntity<?> deleteSubject(@PathVariable Long id) {
        adminService.deleteSubject(id);
        return ResponseEntity.ok(Map.of("message", "Subject deleted successfully"));
    }

    // ==================== Material Approval ====================
    @GetMapping("/pending-materials")
    public ResponseEntity<?> getPending() {
        return ResponseEntity.ok(adminService.getPendingMaterials());
    }

    @GetMapping("/materials")
    public ResponseEntity<?> getAllMaterials() {
        return ResponseEntity.ok(adminService.getAllMaterials());
    }

    @PostMapping("/approve/{id}")
    public ResponseEntity<?> approve(@PathVariable Long id) {
        adminService.approveMaterial(id);
        return ResponseEntity.ok(Map.of("message", "Material approved"));
    }

    @PostMapping("/reject/{id}")
    public ResponseEntity<?> reject(@PathVariable Long id) {
        adminService.rejectMaterial(id);
        return ResponseEntity.ok(Map.of("message", "Material rejected"));
    }
}
