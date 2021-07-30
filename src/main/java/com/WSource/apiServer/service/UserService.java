package com.WSource.apiServer.service;

import com.WSource.apiServer.entity.AesKey;
import com.WSource.apiServer.entity.User;
import com.WSource.apiServer.repository.UserRepository;
import com.WSource.apiServer.util.DataUtils;
import com.WSource.apiServer.util.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.security.Key;
import java.util.Base64;

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

    @PersistenceContext
    private EntityManager entityManager;

    public String login(String username, String password) throws Exception {
        String token = jwtTokenUtil.generateToken(username);
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (AuthenticationException e) {
            throw new Exception("Invalid username/password supplied");
        }
        return token;
    }

    public String register(User user) throws Exception {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new Exception("Email is already in use");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return jwtTokenUtil.generateToken(user.getEmail());
    }

    @Transactional
    public void setSecretKey() {
        Key secretKey = DataUtils.generateAESKey(256);
        String encodedKey = Base64.getEncoder().encodeToString(secretKey.getEncoded());
        try {
            AesKey aesKey = new AesKey();
            aesKey.setSecret(encodedKey);
            entityManager.persist(aesKey);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
