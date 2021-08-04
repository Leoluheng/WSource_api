package com.WSource.apiServer.controller;


import com.WSource.apiServer.entity.User;
import com.WSource.apiServer.service.ConfigService;
import com.WSource.apiServer.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

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
        return "Authorization: " + token;
    }

    @PostMapping(path="/register")
    public @ResponseBody String addNewUser (@RequestBody User user) {
        String token = null;
        try {
            token = userService.register(user);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "Authorization: " + token;
    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<User> getAllUsers() {
        // This returns a JSON or XML with the users
        return userService.findAll();
    }
}