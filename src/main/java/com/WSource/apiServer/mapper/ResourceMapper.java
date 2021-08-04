package com.WSource.apiServer.mapper;

import com.WSource.apiServer.dto.ResourceResponse;
import com.WSource.apiServer.entity.Resource;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ResourceMapper {
    ResourceResponse toResponse(Resource resource);
}
