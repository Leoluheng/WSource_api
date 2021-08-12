package com.WSource.apiServer.entity;

import lombok.Getter;
import lombok.Setter;
import org.apache.lucene.analysis.core.LowerCaseFilterFactory;
import org.apache.lucene.analysis.core.StopFilterFactory;
import org.apache.lucene.analysis.snowball.SnowballPorterFilterFactory;
import org.apache.lucene.analysis.standard.StandardFilterFactory;
import org.apache.lucene.analysis.standard.StandardTokenizerFactory;
import org.hibernate.annotations.*;
import org.hibernate.search.annotations.*;
import org.hibernate.search.annotations.Index;
import org.hibernate.search.annotations.Parameter;

import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.CascadeType;
import java.sql.Timestamp;

@Getter
@Setter
@Entity
@Table(name="resources")
@Indexed(index = "idx_resource")
@AnalyzerDef(name = "ResourceTextAnalyzer",
        tokenizer = @TokenizerDef(factory = StandardTokenizerFactory.class),
        filters = {
                @TokenFilterDef(factory = LowerCaseFilterFactory.class),
                @TokenFilterDef(factory = StandardFilterFactory.class),
                @TokenFilterDef(factory = StopFilterFactory.class),
                @TokenFilterDef(factory = SnowballPorterFilterFactory.class,
                        params = { @Parameter(name = "language", value = "English") }),
        })
public class Resource {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;

    @ManyToOne
    private User user;

    @Field
    @CreationTimestamp
    private Timestamp createdAtTimestamp;

    @Column
    private Timestamp updateAtTimestamp;

    @Field
    private String createdAt;

    @Column
    private String updateAt;

    @Field(index=Index.YES, analyze=Analyze.YES, store=Store.NO, analyzer=@Analyzer(definition = "ResourceTextAnalyzer"))
    private String title;

    @Field(index=Index.YES, analyze=Analyze.YES, store=Store.NO, analyzer=@Analyzer(definition = "ResourceTextAnalyzer"))
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
//
//    @OneToMany(cascade = { CascadeType.REMOVE, CascadeType.PERSIST })
//    private List<Comment> commentList;
}
