package com.WSource.apiServer.repository;

import com.WSource.apiServer.entity.Resource;
import org.springframework.data.repository.CrudRepository;

public interface ResourceRepository extends CrudRepository<Resource, Integer> {

}