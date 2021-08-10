package com.WSource.apiServer.service;

import com.WSource.apiServer.entity.Resource;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.lucene.search.Query;
import org.hibernate.search.jpa.FullTextEntityManager;
import org.hibernate.search.jpa.FullTextQuery;

import org.hibernate.search.jpa.Search;
import org.hibernate.search.query.dsl.QueryBuilder;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

@Component
@Slf4j
@RequiredArgsConstructor
public class SearchService {
    private final EntityManager entityManager;

    public List<Resource> getPostBasedOnWord(String word){
        FullTextEntityManager fullTextEntityManager = Search.getFullTextEntityManager(entityManager);
        QueryBuilder qb = fullTextEntityManager.getSearchFactory().buildQueryBuilder()
                .forEntity(Resource.class)
                .get();
        Query foodQuery = qb.keyword().onFields("content","title").matching(word).createQuery();
        FullTextQuery fullTextQuery = fullTextEntityManager.createFullTextQuery(foodQuery, Resource.class);
        return (List<Resource>) fullTextQuery.getResultList();
    }
}
