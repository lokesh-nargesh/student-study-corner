package com.studymaterial.platform.mapper;

import com.studymaterial.platform.dto.StudyMaterialDTO;
import com.studymaterial.platform.entity.StudyMaterial;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface StudyMaterialMapper {

    @Mapping(source = "uploadedBy.collegeId", target = "uploadedByCollegeId")
    @Mapping(source = "uploadedBy.name", target = "uploadedByName")
    @Mapping(source = "subject.name", target = "subjectName")
    @Mapping(source = "subject.subjectCode", target = "subjectCode")
    @Mapping(source = "course.name", target = "courseName")
    @Mapping(source = "branch.name", target = "branchName")
    @Mapping(source = "semester.semesterNumber", target = "semesterNumber")
    @Mapping(source = "academicYear.year", target = "academicYear")
    StudyMaterialDTO toDTO(StudyMaterial studyMaterial);
}
