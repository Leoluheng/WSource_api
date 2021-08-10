package com.WSource.apiServer.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.search.annotations.Analyzer;
import org.hibernate.search.annotations.Field;
import org.hibernate.search.annotations.Indexed;

import javax.persistence.*;
import java.sql.Timestamp;
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
    @CreationTimestamp
    @Column(name="created_at")
    private Timestamp createdAt;

    @Column
    @UpdateTimestamp
    private Timestamp updateAt;

    @Field
    private String title;

    @Field
    @Lob
    @Column(length=1000000)
    private String content;

    private String status;

    // Todo: change name to contentFormat
    private String contentType;

    // Different section: Services, Offical, Community
    private String resourceType;

    // Todo: do we want a list of categories
    private String category;

    // Todo: might want to have tags
    // @OneToMany
    // private List<String> tag;
    @ColumnDefault("0")
    private Integer voteCount;

    @ColumnDefault("0")
    private Integer viewCount;
}
