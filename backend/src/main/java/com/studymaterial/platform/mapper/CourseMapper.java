package com.studymaterial.platform.mapper;

import com.studymaterial.platform.dto.CourseDTO;
import com.studymaterial.platform.entity.Course;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CourseMapper {
    CourseDTO toDTO(Course course);

    Course toEntity(CourseDTO courseDTO);
}
