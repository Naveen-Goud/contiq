package com.contiq.fileservice.entity;

import jakarta.persistence.*;
 
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Document(indexName = "file")
@Entity
public class Files {
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        private String id ;
        @Field(type = FieldType.Text,name = "user_id")
        private String  userId ;
        @Field(type = FieldType.Text,name = "name")
        private String  name ;
        @Field(type = FieldType.Text,name = "type")
        private String  type ;
        @Field(type = FieldType.Text,name = "content")
        private String  content;
        @Field(type = FieldType.Text,name = "path")
        private String  path ;
        @Field(type = FieldType.Text,name = "download_link")
        private String  downloadLink ;
        @Field(type = FieldType.Date,name = "upload_date")
        private LocalDate uploadDate ;
        @Field(type = FieldType.Date,name = "update_date")
        private LocalDate  updateDate ;
        @Field(type = FieldType.Boolean,name = "is_sync")
        private boolean  isSync ;
        @Field(type = FieldType.Boolean,name = "is_deleted")
        private boolean  isDeleted ;
} 
