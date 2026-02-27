package com.studymaterial.platform.repository;

import com.studymaterial.platform.entity.ApprovalStatus;
import com.studymaterial.platform.entity.StudyMaterial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import java.util.List;

public interface StudyMaterialRepository extends JpaRepository<StudyMaterial, Long>, JpaSpecificationExecutor<StudyMaterial> {
    List<StudyMaterial> findByUploadedById(Long userId);
    List<StudyMaterial> findByApprovalStatus(ApprovalStatus status);
}
