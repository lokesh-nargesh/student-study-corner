package com.studymaterial.platform.mapper;

import com.studymaterial.platform.dto.BranchDTO;
import com.studymaterial.platform.entity.Branch;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface BranchMapper {
    @Mapping(source = "course.id", target = "courseId")
    BranchDTO toDTO(Branch branch);

    @Mapping(source = "courseId", target = "course.id")
    Branch toEntity(BranchDTO branchDTO);
}
