package com.contiq.fileservice.dto;

import com.contiq.fileservice.entity.Files;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class FilesDto {
    private String id;
    private String name;
    private String type;
    private String content;
    private String path;
    private String downloadLink;
    private Boolean isDeleted;
    private Boolean isSync;
    private LocalDateTime uploadDate;
    private LocalDateTime updateDate;
    private String userId;

    @Autowired
    private static ModelMapper modelMapper;

    static {
        modelMapper=new ModelMapper();
    }

    public static Files convertDtoToEntity(FilesDto filesDto){
        modelMapper.getConfiguration()
                .setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(filesDto,Files.class);
    }

    public static FilesDto convertEntityToDto(Files files){
        modelMapper.getConfiguration()
                .setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(files, FilesDto.class);
    }
}
