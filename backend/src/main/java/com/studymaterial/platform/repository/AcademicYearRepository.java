package com.studymaterial.platform.repository;

import com.studymaterial.platform.entity.AcademicYear;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AcademicYearRepository extends JpaRepository<AcademicYear, Long> {
    List<AcademicYear> findByBranchId(Long branchId);
}
