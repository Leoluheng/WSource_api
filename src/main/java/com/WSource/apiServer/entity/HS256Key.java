package com.WSource.apiServer.entity;

import javax.persistence.*;

@Entity
@Table(name="hs256key")
public class HS256Key {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private int id;

    private String secret;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getSecret() { return this.secret; }

    public void setSecret(String secret) { this.secret = secret; }

}
