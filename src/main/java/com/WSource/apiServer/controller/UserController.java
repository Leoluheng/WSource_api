package com.WSource.apiServer.controller;


import com.WSource.apiServer.exception.EmailInUseException;
import com.WSource.apiServer.entity.User;
import com.WSource.apiServer.service.ConfigService;
import com.WSource.apiServer.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.Map;

@RestController
@RequestMapping(path="api/v1/user")
public class UserController {

    @Autowired
    private ConfigService configService;

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping(path="/login")
    public @ResponseBody String login(@RequestParam("email") String email, @RequestParam("password") String password) {
        String token = null;
        try {
            token = userService.login(email, password);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return token;
    }

    @PostMapping(path="/register")
    public @ResponseBody String addNewUser (@RequestBody User user) throws Exception {
        String token = null;
        try {
            token = userService.register(user);
        } catch (EmailInUseException e) {
            throw e;
        }
        return token;
    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<User> getAllUsers() {
        // This returns a JSON or XML with the users
        return userService.findAll();
    }

    // Temporary testing end point for Home Page redirection after login
    // TODO: create home page and corresponding controllers
    @GetMapping(path="/me")
    public void verifyUser(@RequestHeader Map<String, String> headers, HttpServletResponse response) {
        String token = headers.get("token");
        if (token != null && token.startsWith("Bearer ")) {
            String jwtToken = token.substring(7);
            User user = userService.findUserByToken(jwtToken);
            System.out.println(user);
        }
        System.out.println("SHOULD APPEAR AFTER JWT FILTER IS APPLIED");
        response.setStatus(HttpServletResponse.SC_ACCEPTED);
    }
}