package com.WSource.apiServer.controller;

import com.WSource.apiServer.entity.Resource;
import com.WSource.apiServer.entity.User;
import com.WSource.apiServer.repository.ResourceRepository;
import com.WSource.apiServer.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping(path="api/v1/resource")
public class ResourceController {
    @Autowired
    private ResourceRepository resourceRepository;

    @Autowired
    private UserService userService;

    @PostMapping(path="/add") // Map ONLY POST Requests
    public @ResponseBody
    String addResource(@RequestHeader Map<String, String> headers, @RequestBody Resource resource) {
        String token = headers.get("token");
        if (token != null && token.startsWith("Bearer ")) {
            String jwtToken = token.substring(7);
            User user = userService.findUserByToken(jwtToken);
            resource.setUser(user);
        }
        resourceRepository.save(resource);
        return "Saved";
    }

    @GetMapping(path="/getById")
    public @ResponseBody
    Resource getById(@RequestParam int id) {
        if (!resourceRepository.existsById(id)) {
            return null;
        }
        return resourceRepository.findById(id).get();
    }

    @GetMapping(path="/all")
    public @ResponseBody
    List<Resource> getAllResources() {
        List<Resource> resourceList = null;
        try {
            resourceList = (List<Resource>) resourceRepository.findAll();
        } catch (Exception e) {
            System.out.println(e);
        }
        return resourceList;
    }

    @PostMapping(path="/update")
    public @ResponseBody
    Boolean updateById(@RequestParam int id, @RequestBody Resource resource) {
        if (!resourceRepository.existsById(id)) {
            return false;
        }
        resourceRepository.save(resource);
        return true;
    }

    @DeleteMapping(path="/delete")
    public @ResponseBody
    Boolean deleteById(@RequestParam int id) {
        if (!resourceRepository.existsById(id)) {
            return false;
        }
        resourceRepository.deleteById(id);
        return true;
    }


    @GetMapping(path="/upvote")
    public @ResponseBody
    Boolean upvote(@RequestParam int id){
        if (!resourceRepository.existsById(id)) {
            return false;
        }
        Resource resource= resourceRepository.findById(id).get();
        resource.setVoteCount(resource.getVoteCount() + 1);
        resourceRepository.save(resource);
        return true;
    }

    @GetMapping(path="/downvote")
    public @ResponseBody
    Boolean downvote(@RequestParam int id) {
        if (!resourceRepository.existsById(id)) {
            return false;
        }
        Resource resource = resourceRepository.findById(id).get();
        resource.setVoteCount(resource.getVoteCount() - 1);
        resourceRepository.save(resource);
        return true;
    }

    @GetMapping(path="/updateViewCount")
    public @ResponseBody
    Boolean updateViewCount(@RequestParam int id) {
        if (!resourceRepository.existsById(id)) {
            return false;
        }
        Resource resource = resourceRepository.findById(id).get();
        resource.setViewCount(resource.getViewCount() + 1);
        resourceRepository.save(resource);
        return true;
    }
}
