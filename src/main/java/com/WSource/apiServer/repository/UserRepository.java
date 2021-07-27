package com.WSource.apiServer.repository;

import org.springframework.data.repository.CrudRepository;
import com.WSource.apiServer.entity.User;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Integer> {
    Optional<User> findByUsername(String username);
}