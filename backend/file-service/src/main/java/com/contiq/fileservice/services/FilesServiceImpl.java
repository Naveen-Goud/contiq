package com.contiq.fileservice.services;

import com.contiq.fileservice.dto.FilesDto;
import com.contiq.fileservice.entity.Files;
import com.contiq.fileservice.exceptions.FilesByUserIdNotFoundException;
import com.contiq.fileservice.exceptions.FilesNotFoundException;
import com.contiq.fileservice.exceptions.ValidationException;
import com.contiq.fileservice.repository.FilesRepository;
import com.contiq.fileservice.utils.Helper;
import com.google.api.client.googleapis.json.GoogleJsonResponseException;
import com.google.api.client.http.HttpRequestInitializer;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.DriveScopes;
import com.google.api.services.drive.model.File;
import com.google.auth.http.HttpCredentialsAdapter;
import com.google.auth.oauth2.GoogleCredentials;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.output.ByteArrayOutputStream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import static java.util.UUID.randomUUID;

@Service
@Slf4j
public class FilesServiceImpl implements FilesService {

    @Autowired
    private FilesRepository filesRepository;

    private final Helper helper = new Helper();

    @Override
    public FilesDto getByFileId(String id) {
        Optional<Files> file = filesRepository.findById(id);
        if (file.isPresent()) {
            return FilesDto.convertEntityToDto(file.get());
        } else {
            throw new FilesNotFoundException("File is not present");
        }
    }

    @Override
    public List<FilesDto> getFilesByUserId(String userId) {
        List<Files> files = filesRepository.findAllFilesByUserId(userId);
        if (files.isEmpty()) {
            throw new FilesByUserIdNotFoundException(userId); // Throw the custom exception
        }
        return files.stream()
                .map(FilesDto::convertEntityToDto)
                .toList();
    }

    @Override
    public List<FilesDto> findBySearchTerm(String keyword) {
        List<Files> matchingDocuments = filesRepository.searchFilesByNameOrContent(keyword);
        if (matchingDocuments.isEmpty()) {
            throw new FilesNotFoundException("No File found with this keyword in name or content");
        }
        return matchingDocuments.stream()
                .map(FilesDto::convertEntityToDto)
                .toList();
    }

    @Override
    public FilesDto saveFile(MultipartFile newFile, String userId) throws IOException {
        String fileName = Objects.requireNonNull(newFile.getOriginalFilename());
        Path uploadDirectory = Paths.get(System.getProperty("user.dir"), "Documents", "files");
        Files existingUploadFile = filesRepository.findByNameAndUserId(fileName,userId);
        if (!java.nio.file.Files.exists(uploadDirectory)) {
            java.nio.file.Files.createDirectories(uploadDirectory);
        }
        Path filePath = uploadDirectory.resolve(fileName);
        MultipartFile file = (MultipartFile) newFile;
        byte[] pdfData = newFile.getBytes();
        String content = helper.extractTextFromPDF(pdfData);
        try {
            if (existingUploadFile!=null ) {
              //  Files existingUploadFile = filesRepository.findByNameAndUserId(fileName,userId);
                existingUploadFile.setContent(content);
                existingUploadFile.setUpdateDate(LocalDate.now());
                existingUploadFile.setName(fileName);
                if (content != null) {
                    java.nio.file.Files.write(filePath,pdfData);
                } else {
                     throw new ValidationException("An error occurred during file operations.");
                }
                existingUploadFile = filesRepository.save(existingUploadFile);
                FilesDto uploadFiles = FilesDto.convertEntityToDto(existingUploadFile);
                return uploadFiles;
            } else {
                Files uploadFile = new Files();
                uploadFile.setId(randomUUID().toString());
                uploadFile.setUserId(userId);
                uploadFile.setName(file.getOriginalFilename());
                uploadFile.setContent(content);
                uploadFile.setType("PDF");
                uploadFile.setUploadDate(LocalDate.now());
                uploadFile.setUpdateDate(LocalDate.now());
                uploadFile.setPath(uploadDirectory.toString());
                //saving the selected files locally
                if (content != null) {
                    java.nio.file.Files.write(filePath,pdfData);
                } else {
                    throw new ValidationException("An error occurred during file operations.");
                }
               
                uploadFile = filesRepository.save(uploadFile);
                FilesDto uploadFiles = FilesDto.convertEntityToDto(uploadFile);
                return uploadFiles;
            }
        } catch (IOException e) {
            e.printStackTrace(); // or log the exception
            throw new ValidationException("An error occurred during file operations.");
        }
    }

    @Override
    public String deleteFile(String id) {
        if (filesRepository.existsById(id)) {
            filesRepository.deleteById(id);
            return "File deleted with ID " + id;
        } else {
             throw  new FilesNotFoundException("File with ID " + id + " not found");
        }
    }

    @Override
    public String downloadFile(String userId,String realFileId) throws IOException {
        GoogleCredentials credentials = GoogleCredentials.getApplicationDefault()
                .createScoped(Arrays.asList(DriveScopes.DRIVE));
        HttpRequestInitializer requestInitializer = new HttpCredentialsAdapter(
                credentials);
        Drive service = new Drive.Builder(new NetHttpTransport(),
                GsonFactory.getDefaultInstance(),
                requestInitializer)
                .setApplicationName("Drive samples")
                .build();
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        try {
            service.files().get(realFileId)
                    .executeMediaAndDownloadTo(outputStream);
            File fileMetadata = service.files().get(realFileId).execute();
            String fileName = fileMetadata.getName();
            byte[] fileBytes = outputStream.toByteArray();

            Path directoryPath = Paths.get(System.getProperty("user.dir"), "Documents", "files");
            java.nio.file.Files.createDirectories(directoryPath);
            Path filePath = directoryPath.resolve(fileName);
            try (OutputStream fileOutputStream = java.nio.file.Files.newOutputStream(filePath)) {
                fileOutputStream.write(fileBytes);
            }
            outputStream.close();
            String content = helper.extractTextFromPDF(fileBytes);

            Files document = new Files();
            document.setUserId(userId);
            document.setId(realFileId);
            document.setName(fileName);
            document.setContent(content);
            document.setUploadDate(LocalDate.now());
            document.setPath(directoryPath.toString() + "/" + fileName);
            document.setType("PDF");
            document.setUpdateDate(LocalDate.now());
            document.setSync(false);
            document.setDeleted(false);
            document.setDownloadLink("");  
            filesRepository.save(document); 

        } catch (GoogleJsonResponseException e) {
            System.err.println("Unable to export file: " + e.getDetails());
            throw e;
        }
        return "file has been downloaded";
    }

    @Override
    public String saveDriveFile(String userId, String fileId) throws IOException {
        System.out.println("inside the drive method");
        return downloadFile(userId,fileId);
    }


    public ResponseEntity<byte[]> getResourceFile( String filePath) throws IOException {
        java.io.File file = new java.io.File(filePath); 
        byte[] pdfBytes = java.nio.file.Files.readAllBytes(file.toPath());
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
       // headers.setContentDispositionFormData("attachment", "candidates.pdf");
        return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
    }
     }




