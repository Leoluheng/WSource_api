package com.WSource.apiServer.service;

import com.WSource.apiServer.entity.HS256Key;
import com.WSource.apiServer.entity.User;
import com.WSource.apiServer.repository.UserRepository;
import com.WSource.apiServer.util.DataUtils;
import com.WSource.apiServer.util.JwtTokenUtil;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
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
        String token = jwtTokenUtil.generateToken(username, getSecretKey());
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
        String token = jwtTokenUtil.generateToken(user.getEmail(), getSecretKey());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setToken(token);
        if (token != null) {
            userRepository.save(user);
        } else {
            throw new Exception("token is generated with error");
        }
        return token;
    }

    @Transactional
    public void setSecretKey() {
        Key secretKey = DataUtils.generateHS256Key();
        String encodedKey = Base64.getEncoder().encodeToString(secretKey.getEncoded());
        try {
            HS256Key key = new HS256Key();
            key.setSecret(encodedKey);
            entityManager.persist(key);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public Key getSecretKey() {
        HS256Key key = entityManager.find(HS256Key.class, 1);
        byte[] decodedKey = Base64.getDecoder().decode(key.getSecret());
        SecretKey originalKey = Keys.hmacShaKeyFor(decodedKey);
        return originalKey;
    }

}
