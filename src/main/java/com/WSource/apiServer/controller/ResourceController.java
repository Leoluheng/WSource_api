package com.WSource.apiServer.controller;

import com.WSource.apiServer.entity.Resource;
import com.WSource.apiServer.repository.ResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping(path="/api/v1/resource")
public class ResourceController {
    @Autowired // This means to get the bean called userRepository
    private ResourceRepository resourceRepository;

    @PostMapping(path="/add") // Map ONLY POST Requests
    public @ResponseBody
    String addResource(@RequestParam Resource resource) {
        resourceRepository.save(resource);
        return "Saved";
    }

    @GetMapping(path="/search")
    public @ResponseBody
    Resource getById(@RequestParam int id) {
        if (!resourceRepository.existsById(id)) {
            return null;
        }
        return resourceRepository.findById(id).get();
    }

    @GetMapping(path="/all")
    List<Resource> getAllResources() {
        List<Resource> resourceList = null;
        try {
            resourceList = (List<Resource>) resourceRepository.findAll();
        } catch (Exception e) {
            System.out.println(e);
        }
        return resourceList;
    }

    @DeleteMapping(path="/update")
    Boolean updateById(@RequestParam int id, @RequestBody Resource resource) {
        if (!resourceRepository.existsById(id)) {
            return false;
        }
        resourceRepository.save(resource);
        return true;
    }

    @DeleteMapping(path="/delete")
    Boolean deleteById(@RequestParam int id) {
        if (!resourceRepository.existsById(id)) {
            return false;
        }
        resourceRepository.deleteById(id);
        return true;
    }
}
