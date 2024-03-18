package com.contiq.fileservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@NoArgsConstructor
@Data
@AllArgsConstructor
public class FileResponseDto {
    private String  name ;
    private String  type ;
    private String  content;
    private String  path ;
    private Date uploadDate ;
    private Date  updateDate ;
    private String  userId ;
    private boolean  isSync ;
}
