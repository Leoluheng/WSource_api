package com.WSource.apiServer.repository;

import org.springframework.data.repository.CrudRepository;
import com.WSource.apiServer.entity.User;

public interface UserRepository extends CrudRepository<User, Integer> {

}