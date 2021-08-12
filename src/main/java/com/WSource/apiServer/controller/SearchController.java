package com.WSource.apiServer.controller;

import com.WSource.apiServer.dto.ResourceResponse;
import com.WSource.apiServer.entity.Resource;
import com.WSource.apiServer.mapper.ResourceMapper;
import com.WSource.apiServer.service.SearchService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping(path="api/v1/search")
public class SearchController {
    private final SearchService searchService;
//    private final ResourceMapper resourceMapper;
    @GetMapping("/resource")
    public List<Resource> getPostByWord(@RequestParam String word){
//        return searchService.getPostBasedOnWord(word)
//                .stream().map(resourceMapper::toResponse).collect(Collectors.toList());
        return searchService.getPostBasedOnWord(word);
    }

    @GetMapping("/resourceFuzzy")
    public List<Resource> getPostByWordFuzzy(@RequestParam String word){
        return searchService.getPostBasedOnWordFuzzy(word);
    }

}
