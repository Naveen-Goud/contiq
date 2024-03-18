package com.contiq.fileservice.repository;

import com.contiq.fileservice.entity.Files;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FilesRepository extends ElasticsearchRepository<Files,String> {

    Boolean existsByName(String fileName);

    Files findByName(String fileName);
    Files findByNameAndUserId(String fileName,String userId);
    String deleteByName(String name);

    List<Files> findAllFilesByUserId(String userId);

    @Query("{\"bool\": {\"should\": [{\"wildcard\": {\"name\": \"*?0*\"}}, {\"match\": {\"content\": \"?0\"}}]}}")
    List<Files> searchFilesByNameOrContent(String keyword);
}
