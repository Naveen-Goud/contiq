package com.contiq.fileservice.services;

import com.contiq.fileservice.dto.FilesDto;

import java.util.List;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;


public interface FilesService {
    FilesDto getByFileId(String id);

    List<FilesDto> getFilesByUserId(String userId);

    List<FilesDto> findBySearchTerm(String keyword);

    FilesDto saveFile(MultipartFile newFile, String userId) throws IOException;

    String deleteFile(String id);

    String downloadFile(String userId,String fileId) throws IOException;

    String saveDriveFile(String userId, String fileId) throws IOException;

    ResponseEntity<byte[]> getResourceFile(String filePath ) throws IOException;
}