package com.contiq.fileservice.controller;

import com.contiq.fileservice.dto.FilesDto;
import com.contiq.fileservice.services.FilesService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.hamcrest.Matchers.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.io.IOException;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


class FilesControllerTest {

    private MockMvc mockMvc;

    @Mock
    private FilesService filesService;

    @InjectMocks
    private FilesController filesController;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
         mockMvc = MockMvcBuilders.standaloneSetup(filesController).build();
    }

    @Test
    void testFindById() {
        // Create a sample FilesDto
        FilesDto filesDto = new FilesDto();
        filesDto.setId("1");
        filesDto.setName("Test File");

        // Mock the service method
        when(filesService.getByFileId("1")).thenReturn(filesDto);

        // Call the controller method
        FilesDto response = filesController.findById("1");

        // Verify that the service method was called
        verify(filesService, times(1)).getByFileId("1");

        // Check the response
        assertEquals(filesDto, response);
    }
    @Test
    void testResourceFile() throws Exception {
        // Mocked file content
        byte[] fileContent = "Sample PDF Content".getBytes();

        // Mock the service method to return a ResponseEntity with content
        ResponseEntity<byte[]> responseEntity = new ResponseEntity<>(fileContent, HttpStatus.OK);

        when(filesService.getResourceFile(anyString()))
                .thenReturn(responseEntity);

        // Perform the GET request to the resourceFile endpoint
        mockMvc.perform(MockMvcRequestBuilders
                        .get("/files/resource")
                        .param("filePath", "dummyFilePath")
                        .contentType(MediaType.APPLICATION_PDF))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_OCTET_STREAM)) // Updated content type expectation
                .andExpect(content().bytes(fileContent));

        // Verify that the service method was called with the correct file path
        verify(filesService, times(1)).getResourceFile("dummyFilePath");
    }

    @Test
   void testFindByUserId() {
        String userId = "user123";

        List<FilesDto> filesList = Arrays.asList(new FilesDto(), new FilesDto());
        when(filesService.getFilesByUserId(userId)).thenReturn(filesList);
        List<FilesDto> response = filesController.findByUserId(userId);
        verify(filesService, times(1)).getFilesByUserId(userId);
        assertEquals(filesList, response);
    }

    @Test
    void testSearchFiles() {
        String keyword = "document";
        List<FilesDto> searchResults = Arrays.asList(new FilesDto(), new FilesDto());
        when(filesService.findBySearchTerm(keyword)).thenReturn(searchResults);
        List<FilesDto> response = filesController.searchFiles(keyword);
        verify(filesService, times(1)).findBySearchTerm(keyword);
        assertEquals(searchResults, response);
    }

    @Test
    void testPostFromGoogleDrive() throws Exception {
        String userId = "user123";
        String fileId = "file456";

        Mockito.when(filesService.saveDriveFile(userId, fileId)).thenReturn("File saved successfully");

        mockMvc.perform(MockMvcRequestBuilders.post("/files/googleDrive")
                        .param("userId", userId)
                        .param("fileId", fileId)
                        .contentType(MediaType.APPLICATION_FORM_URLENCODED))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("File saved successfully"));
    }

    @Test
    void testPostFile() throws Exception {
        String userId = "user123";
        MockMultipartFile file = new MockMultipartFile("file", "test.txt", MediaType.TEXT_PLAIN_VALUE, "Hello, World!".getBytes());
        FilesDto filesDto = mock(FilesDto.class);
        Mockito.when(filesService.saveFile(file, userId)).thenReturn(filesDto);

        mockMvc.perform(MockMvcRequestBuilders.multipart("/files/upload/{userId}", userId)
                        .file(file)
                        .contentType(MediaType.MULTIPART_FORM_DATA))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }
    @Test
    void testDeleteFile() throws Exception {
        String fileId = "file123";
        Mockito.when(filesService.deleteFile(fileId)).thenReturn("File deleted successfully");

        mockMvc.perform(MockMvcRequestBuilders.delete("/files/delete/{id}", fileId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("File deleted successfully"));

        Mockito.verify(filesService, Mockito.times(1)).deleteFile(fileId);
    }

}
