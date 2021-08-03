package com.WSource.apiServer.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.search.annotations.Analyzer;
import org.hibernate.search.annotations.Field;
import org.hibernate.search.annotations.Indexed;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Getter
@Setter
@Entity
@Table(name="resources")
@Indexed(index = "idx_resources")
public class Resource {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;

    @ManyToOne
    private User user;

    @Field
    @Column(name="created_at")
    private Date createdAt;

    @Field
    private String title;

    @Field
//    @Field(name = "contentFiltered", analyzer = @Analyzer(definition = "stop"))
    private String content;

    private String status;

    private String contentType;

    // Todo: do we want a list of categories
    @ManyToOne
    private Category category;

    // Todo: might want to have tags
//    @OneToMany
//    private List<String> tag;

}
