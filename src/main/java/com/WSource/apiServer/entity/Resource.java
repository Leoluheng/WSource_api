package com.WSource.apiServer.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.search.annotations.Analyzer;
import org.hibernate.search.annotations.Field;
import org.hibernate.search.annotations.Indexed;

import javax.persistence.*;
import java.util.Date;
import java.util.List;


@Getter
@Setter
@Entity
@Table(name="resources")
@Indexed(index = "idx_resource")
public class Resource {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;

    @ManyToOne
    private User user;

    @Field
    @Column(name="created_at")
    private Date createdAt;

    @Field
    private String title;

    @Field
    private String content;

    private String status;

    // Todo: change name to contentFormat
    private String contentType;

    // Different section: Services, Offical, Community
    private String resourceType;

    // Todo: do we want a list of categories
    @ManyToOne
    private Category category;

    // Todo: might want to have tags
    // @OneToMany
    // private List<String> tag;

    private Integer voteCount;
}
