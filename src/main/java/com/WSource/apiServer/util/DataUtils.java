package com.WSource.apiServer.util;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;

public class DataUtils {
    public static SecretKey generateHS256Key() {
        SecretKey generatedKey = null;
        try {
            generatedKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return generatedKey;
    }


}
