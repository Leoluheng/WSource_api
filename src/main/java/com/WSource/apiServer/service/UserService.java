package com.WSource.apiServer.service;

import com.WSource.apiServer.entity.User;
import com.WSource.apiServer.repository.UserRepository;
import com.WSource.apiServer.util.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private JwtUserDetailService jwtUserDetailService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public String login(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
            return jwtTokenUtil.generateToken(username);
        } catch (AuthenticationException e) {
            throw new Exception("Invalid username/password supplied");
        }
    }

    public String register(User user) throws Exception {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new Exception("Email is already in use");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        try {
            return  jwtTokenUtil.generateToken(user.getEmail());
        } catch (Exception e) {
            throw new Exception("Error happens during token generation");
        }
    }

    public Iterable<User> findAll() {
        return userRepository.findAll();
    }

    public boolean verifyUserIdentity(String token) {
        return jwtTokenUtil.validateToken(token);
    }

}
