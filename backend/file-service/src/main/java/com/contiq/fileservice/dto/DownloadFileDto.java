package com.contiq.fileservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;


@NoArgsConstructor
@AllArgsConstructor
@Data
public class DownloadFileDto {
    private String id ;
    private String  userId ;
    private String  name ;
    private String  type ;
    private String  content;
    private String  path ;
    private String  downloadLink ;
    private LocalDate uploadDate ;
    private boolean  isSync ;
}