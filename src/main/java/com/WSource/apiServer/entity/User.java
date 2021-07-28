package com.WSource.apiServer.entity;

import javax.persistence.*;

@Entity // This tells Hibernate to make a table out of this class
@Table(name="users")
public class User {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;

    private String name;

    private String email;

    private String password;

    private String token;

    @Column(name="access_level")
    private Integer accessLevel;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getAccessLevel() {
        return accessLevel;
    }

    public void setAccessLevel(Integer accessLevel){
        this.accessLevel = accessLevel;
    }

    public String getPassword() { return password; }

    public void setPassword(String password) {this.password = password; }

    public String getToken() { return token; }

    public void setToken(String token) { this.token = token; }
}
