package com.WSource.apiServer.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.search.annotations.Field;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@Entity()
@Table(name = "comments")
public class Comment {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;

    private String review;

    @ManyToOne
    private User user;

    @ManyToOne
    @JoinColumn(name = "resources_id")
    @JsonIdentityInfo(generator= ObjectIdGenerators.PropertyGenerator.class, property="id")
    @JsonIdentityReference(alwaysAsId=true)
    @JsonProperty("resources_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @Cascade(CascadeType.DELETE)
    private Resource resource;

    @Column(name="created_at")
    private Date createdAt;

}
