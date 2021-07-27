package com.WSource.apiServer.filter;

import com.WSource.apiServer.service.JwtUserDetailService;
import com.WSource.apiServer.util.JwtTokenUtil;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtAuthorizationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private JwtUserDetailService jwtUserDetailService;

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest,
                                    HttpServletResponse httpServletResponse,
                                    FilterChain filterChain) throws ServletException, IOException {
        String header = httpServletRequest.getHeader("Authorization");
        if (header == null || !header.startsWith("Bearer ")) {
            System.out.println("Invalid token request - wrong header");
            return;
        }
        String jwtToken = header.substring(7);

        String username = null;
        try {
            username = jwtTokenUtil.getUsernameFromToken(jwtToken);
        } catch (IllegalArgumentException e) {
            System.out.println("Invalid token to parse");
        } catch (ExpiredJwtException e) {
            System.out.println("JWT Token has expired");
        }

        if (username == null) {
            System.out.println("Invalid token - no username");
            return;
        }
        UserDetails userDetails = jwtUserDetailService.loadUserByUsername(username);

    }
}
