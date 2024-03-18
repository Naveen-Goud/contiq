package com.contiq.fileservice.controller;

import com.contiq.fileservice.dto.FilesDto;
import com.contiq.fileservice.services.FilesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
import java.io.IOException;

@RestController
//@CrossOrigin("*")
@RequestMapping("/files")
@Slf4j
public class FilesController {
    @Autowired
    private FilesService filesService;

    @GetMapping("/{id}")
    public FilesDto findById(@PathVariable String id){
        return filesService.getByFileId(id);
    }

    @GetMapping("/user/{userId}")
    public List<FilesDto> findByUserId(@PathVariable String userId){
        return filesService.getFilesByUserId(userId);
    }

    @GetMapping("/search")
    public List<FilesDto> searchFiles(@RequestParam String keyword) {
        return filesService.findBySearchTerm(keyword);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteFile(@PathVariable  String id){
        return filesService.deleteFile(id);
    }
    @PostMapping("/upload/{userId}")
    public  FilesDto postFile(@PathVariable String userId,@RequestParam("file") MultipartFile multipartFile) throws IOException {
        return filesService.saveFile(multipartFile,userId);
    }

    @PostMapping("/googleDrive")
    public  String postFromGoogleDrive(@RequestParam String userId,@RequestParam String fileId) throws IOException {
        return filesService.saveDriveFile(userId,fileId);
    } 

    @GetMapping("/resource")
    public ResponseEntity<byte[]>  resourceFile(@RequestParam String filePath ) throws IOException {
        return filesService.getResourceFile(filePath );
    }

}