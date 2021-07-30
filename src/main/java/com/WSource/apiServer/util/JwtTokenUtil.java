package com.WSource.apiServer.util;

import com.WSource.apiServer.config.JwtProperties;
import com.WSource.apiServer.service.UserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.security.Key;
import java.util.Date;

@Component
public class JwtTokenUtil implements Serializable {
    private static final long serialVersionUID = -2550185165626007488L;

    @Autowired
    JwtProperties jwtProperties;

    private Claims getClaimsFromToken(String token, Key secretKey) {
        Claims claims = Jwts.parserBuilder()
                            .setSigningKey(secretKey)
                            .build()
                            .parseClaimsJws(token)
                            .getBody();
        return claims;
    }

    public String getUsernameFromToken(String token, Key secretKey) {
        Claims claims = getClaimsFromToken(token, secretKey);
        return claims.getSubject();
    }

    public Date getExpiredAt(String token, Key secretKey) {
        Claims claims = getClaimsFromToken(token, secretKey);
        return claims.getExpiration();
    }

    public Date getIssuedAt(String token, Key secretKey) {
        Claims claims = getClaimsFromToken(token, secretKey);
        return claims.getIssuedAt();
    }

    private Boolean isTokenExpired(String token, Key secretKey) {
        Date expiration = getExpiredAt(token, secretKey);
        return expiration.before(new Date());
    }

    public Boolean validateToken(String token, UserDetails userDetails, Key secretKey) {
        String username = getUsernameFromToken(token, secretKey);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token, secretKey);
    }

    public String generateToken(String username, Key secretKey) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + jwtProperties.getExpireAfter()))
                .signWith(secretKey)
                .compact();
    }

}
