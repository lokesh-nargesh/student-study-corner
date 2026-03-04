package com.studymaterial.platform.service;

import com.studymaterial.platform.entity.*;
import com.studymaterial.platform.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class StudyMaterialService {
    @Autowired
    StudyMaterialRepository studyMaterialRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    SubjectRepository subjectRepository;

    @Transactional
    public StudyMaterial uploadMaterial(StudyMaterial material, String collegeId) {
        User user = userRepository.findByCollegeId(collegeId).orElseThrow();
        material.setUploadedBy(user);
        material.setUploadDate(LocalDateTime.now());
        material.setApprovalStatus(ApprovalStatus.PENDING);

        // Respect metadata from form if provided, otherwise use user defaults
        if (material.getCourse() == null) material.setCourse(user.getCourse());
        if (material.getBranch() == null) material.setBranch(user.getBranch());
        if (material.getAcademicYear() == null) material.setAcademicYear(user.getAcademicYear());
        if (material.getSemester() == null) material.setSemester(user.getSemester());

        return studyMaterialRepository.save(material);
    }

    public List<StudyMaterial> getMyUploads(String collegeId) {
        User user = userRepository.findByCollegeId(collegeId).orElseThrow();
        return studyMaterialRepository.findByUploadedById(user.getId());
    }

    public List<StudyMaterial> getAllApprovedMaterials() {
        return studyMaterialRepository.findByApprovalStatus(ApprovalStatus.APPROVED);
    }

    @Transactional
    public void incrementDownloadCount(Long id) {
        StudyMaterial material = studyMaterialRepository.findById(id).orElseThrow();
        material.setDownloadCount(material.getDownloadCount() + 1);
        studyMaterialRepository.save(material);
    }

    public List<StudyMaterial> searchMaterials(String title, Long subjectId, MaterialType type) {
        return studyMaterialRepository.findAll((Specification<StudyMaterial>) (root, query, cb) -> {
            var predicate = cb.conjunction();
            predicate = cb.and(predicate, cb.equal(root.get("approvalStatus"), ApprovalStatus.APPROVED));
            if (title != null)
                predicate = cb.and(predicate, cb.like(root.get("title"), "%" + title + "%"));
            if (subjectId != null)
                predicate = cb.and(predicate, cb.equal(root.get("subject").get("id"), subjectId));
            if (type != null)
                predicate = cb.and(predicate, cb.equal(root.get("materialType"), type));
            return predicate;
        });
    }

    @Transactional
    public void deleteMaterial(Long id, String collegeId) {
        StudyMaterial material = studyMaterialRepository.findById(id).orElseThrow();
        if (!material.getUploadedBy().getCollegeId().equals(collegeId)) {
            throw new RuntimeException("Unauthorized to delete this material");
        }
        studyMaterialRepository.delete(material);
    }
}
