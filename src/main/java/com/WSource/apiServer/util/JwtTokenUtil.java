package com.WSource.apiServer.util;

import com.WSource.apiServer.config.JwtProperties;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.crypto.SecretKey;
import java.io.Serializable;
import java.util.Date;

@Component
public class JwtTokenUtil implements Serializable {
    private static final long serialVersionUID = -2550185165626007488L;

    @Autowired
    private JwtProperties jwtProperties;

    private Claims getClaimsFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
                            .setSigningKey(jwtProperties.getSecretKey())
                            .build()
                            .parseClaimsJws(token)
                            .getBody();
        return claims;
    }

    public String getUsernameFromToken(String token) {
        Claims claims = getClaimsFromToken(token);
        return claims.getSubject();
    }

    public Date getExpiredAt(String token) {
        Claims claims = getClaimsFromToken(token);
        return claims.getExpiration();
    }

    public Date getIssuedAt(String token) {
        Claims claims = getClaimsFromToken(token);
        return claims.getIssuedAt();
    }

    private Boolean isTokenExpired(String token) {
        Date expiration = getExpiredAt(token);
        return expiration.before(new Date());
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        String username = getUsernameFromToken(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + jwtProperties.getExpireAfter()))
                .signWith(jwtProperties.getSecretKey())
                .compact();
    }

}
