package com.WSource.apiServer.repository;

import org.springframework.data.repository.CrudRepository;
import com.WSource.apiServer.entity.User;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);
}