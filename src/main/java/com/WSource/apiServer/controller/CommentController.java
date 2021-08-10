package com.WSource.apiServer.controller;


import com.WSource.apiServer.entity.Comment;
import com.WSource.apiServer.entity.Resource;
import com.WSource.apiServer.entity.User;
import com.WSource.apiServer.repository.CommentRepository;
import com.WSource.apiServer.repository.ResourceRepository;
import com.WSource.apiServer.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path="api/v1/comment")
public class CommentController {
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private ResourceRepository resourceRepository;
    @Autowired
    private UserService userService;

    @PostMapping(path="/add") // Map ONLY POST Requests
    public @ResponseBody
    Boolean addComment(@RequestHeader Map<String, String> headers, @RequestParam int resourceId, @RequestBody Comment comment) {
        if (!resourceRepository.existsById(resourceId)){
            return false;
        }
        String token = headers.get("token");
        if (token != null && token.startsWith("Bearer ")) {
            String jwtToken = token.substring(7);
            User user = userService.findUserByToken(jwtToken);
            comment.setUser(user);
        }
        resourceRepository.findById(resourceId).map(resource -> {
            comment.setResource(resource);
            return commentRepository.save(comment);
        });
        return true;
    }

    @GetMapping(path="/getByResourceId")
    public @ResponseBody
    Page<Comment> getByResourceId(@RequestParam int resourceId) {
        Pageable firstPageWithTwoElements = PageRequest.of(0, 100);
        return commentRepository.findByResourceId(resourceId, firstPageWithTwoElements);
    }

    @GetMapping(path="/getByCommentId")
    public @ResponseBody
    Comment getByCommentId(@RequestParam int id) {
        if (!commentRepository.existsById(id)) {
            return null;
        }
        return commentRepository.findById(id).get();
    }

    @GetMapping(path="/all")
    public @ResponseBody
    List<Comment> getAllComments() {
        List<Comment> commentList = null;
        try {
            commentList= (List<Comment>) commentRepository.findAll();
        } catch (Exception e) {
            System.out.println(e);
        }
        return commentList;
    }


    @DeleteMapping(path="/update")
    public @ResponseBody
    Boolean updateById(@RequestParam int id, @RequestBody Comment comment) {
        if (!commentRepository.existsById(id)) {
            return false;
        }
        commentRepository.save(comment);
        return true;
    }

    @DeleteMapping(path="/delete")
    public @ResponseBody
    Boolean deleteById(@RequestParam int id) {
        if (!commentRepository.existsById(id)) {
            return false;
        }
        commentRepository.deleteById(id);
        return true;
    }
}
