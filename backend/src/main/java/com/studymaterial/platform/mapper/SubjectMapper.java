package com.studymaterial.platform.mapper;

import com.studymaterial.platform.dto.SubjectDTO;
import com.studymaterial.platform.entity.Subject;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface SubjectMapper {
    @Mapping(source = "semester.id", target = "semesterId")
    SubjectDTO toDTO(Subject subject);

    @Mapping(source = "semesterId", target = "semester.id")
    Subject toEntity(SubjectDTO subjectDTO);
}
