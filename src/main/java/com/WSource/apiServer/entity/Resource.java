package com.WSource.apiServer.entity;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name="resource")
public class Resource {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;

    @ManyToOne
    private User user;

    @Column(name="created_at")
    private Date createdAt;

    private String title;

    private String content;

    @ManyToMany
    private List<Category> categories;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Date getCreatedAt() { return createdAt; }

    public void setCreatedAt(Date createdAt) { this.createdAt = createdAt; }

    public String getTitle() { return title; }

    public void setTitle(String title) { this.title = title; }

    public String getContent() { return content; }

    public void setContent(String content) { this.content = content; }
}
