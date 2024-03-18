package com.contiq.fileservice.exceptions;

import org.springframework.data.elasticsearch.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.context.request.WebRequest;

import java.util.Date;

@ControllerAdvice
public class GlobalExceptionHandler extends  RuntimeException{

    @ExceptionHandler(FileNotFoundException.class)
    public ResponseEntity<ExceptionDetails> handleFileNotFoundException(FileNotFoundException exception, WebRequest status){
        ExceptionDetails details=new ExceptionDetails(new Date(),exception.getMessage(), HttpStatus.BAD_REQUEST);

        return new ResponseEntity<>(details,HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(HttpServerErrorException.class)
    public ResponseEntity<ExceptionDetails> handleInternalServer(ResourceNotFoundException exception, WebRequest status){
        ExceptionDetails details=new ExceptionDetails(new Date(),"error", HttpStatus.INTERNAL_SERVER_ERROR);

        return new ResponseEntity<>(details,HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
