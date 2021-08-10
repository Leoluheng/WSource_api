package com.WSource.apiServer.service;

import com.WSource.apiServer.entity.HS256Key;
import com.WSource.apiServer.util.DataUtils;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.crypto.SecretKey;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.security.Key;
import java.util.Base64;

@Transactional
@Service
public class ConfigService {

    @PersistenceContext
    private EntityManager entityManager;

    public String setSecretKey() {
        Key secretKey = DataUtils.generateHS256Key();
        String encodedKey = Base64.getEncoder().encodeToString(secretKey.getEncoded());
        try {
            HS256Key key = new HS256Key();
            key.setSecret(encodedKey);
            entityManager.persist(key);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return encodedKey;
    }

    public SecretKey getSecretKey() {
        HS256Key key = entityManager.find(HS256Key.class, 1);
        String secret;
        if (key != null) {
            secret = key.getSecret();
        } else {
            secret = setSecretKey();
        }
        byte[] decodedKey = Base64.getDecoder().decode(secret);
        SecretKey originalKey = Keys.hmacShaKeyFor(decodedKey);
        return originalKey;
    }

}
