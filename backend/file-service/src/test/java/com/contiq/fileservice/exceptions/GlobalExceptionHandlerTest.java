package com.contiq.fileservice.exceptions;

import com.contiq.fileservice.exceptions.ExceptionDetails;
import com.contiq.fileservice.exceptions.FileNotFoundException;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.data.elasticsearch.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.context.request.WebRequest;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;

class GlobalExceptionHandlerTest {

    @Test
    void testHandleFileNotFoundException() {
        GlobalExceptionHandler globalExceptionHandler = new GlobalExceptionHandler();

        FileNotFoundException exception = new FileNotFoundException("File not found");
        WebRequest webRequest = Mockito.mock(WebRequest.class);
        ResponseEntity<ExceptionDetails> responseEntity = globalExceptionHandler.handleFileNotFoundException(exception, webRequest);

        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
        assertEquals("File not found", responseEntity.getBody().getMsg());
    }

    @Test
    void testHandleInternalServer() {
        GlobalExceptionHandler globalExceptionHandler = new GlobalExceptionHandler();

        ResourceNotFoundException exception = new ResourceNotFoundException("Internal server error");
        WebRequest webRequest = Mockito.mock(WebRequest.class);
        ResponseEntity<ExceptionDetails> responseEntity = globalExceptionHandler.handleInternalServer(exception, webRequest);

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, responseEntity.getStatusCode());
        assertEquals("error", responseEntity.getBody().getMsg());
    }
}
