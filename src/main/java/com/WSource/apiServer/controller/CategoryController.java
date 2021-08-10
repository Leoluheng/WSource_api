package com.WSource.apiServer.controller;

import com.WSource.apiServer.entity.Category;
import com.WSource.apiServer.repository.CategoryRepository;
import com.WSource.apiServer.repository.ResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.xml.catalog.Catalog;
import java.util.List;

@RestController
@RequestMapping(path="api/v1/category")
public class CategoryController {
    @Autowired
    private CategoryRepository categoryRepository;

    @PostMapping(path="/add") // Map ONLY POST Requests
    public @ResponseBody
    String addCategory(@RequestBody Category category) {
        categoryRepository.save(category);
        return "Saved";
    }

    @GetMapping(path="/all")
    public @ResponseBody
    List<Category> getAllCategory() {
        List<Category> categoryList = null;
        try {
            categoryList = (List<Category>) categoryRepository.findAll();
        } catch (Exception e) {
            System.out.println(e);
        }
        return categoryList;
    }

    @PostMapping(path="/update")
    public @ResponseBody
    Boolean deleteById(@RequestParam int id, @RequestBody Category category) {
        if (!categoryRepository.existsById(id)) {
            return false;
        }
        categoryRepository.save(category);
        return true;
    }

    @DeleteMapping(path="/delete")
    public @ResponseBody
    Boolean deleteById(@RequestParam int id) {
        if (!categoryRepository.existsById(id)) {
            return false;
        }
        categoryRepository.deleteById(id);
        return true;
    }
}
