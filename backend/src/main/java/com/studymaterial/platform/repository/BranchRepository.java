package com.studymaterial.platform.repository;

import com.studymaterial.platform.entity.Branch;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BranchRepository extends JpaRepository<Branch, Long> {
    List<Branch> findByCourseId(Long courseId);
}
