package com.WSource.apiServer.dto;

import com.WSource.apiServer.entity.Category;
import com.WSource.apiServer.entity.User;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
public class ResourceResponse {
    private Integer id;
    private User user;
    private Date createdAt;
    private String title;
    private String content;
    private String status;
    private List<Category> categories;
}
