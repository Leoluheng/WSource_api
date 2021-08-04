package com.WSource.apiServer.repository;

import org.springframework.data.repository.CrudRepository;
import com.WSource.apiServer.entity.User;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {

}