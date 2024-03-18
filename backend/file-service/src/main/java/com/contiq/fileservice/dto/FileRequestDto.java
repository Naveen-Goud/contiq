package com.contiq.fileservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class FileRequestDto {
    private String  name ;
    private String  type ;
    private byte[]  content;
    private String  path ;
    private Date uploadDate ;
    private Date  updateDate ;
    private String  userId ;
    private boolean  isSync ;
}
