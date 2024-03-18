package com.contiq.fileservice.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class FilesByUserIdNotFoundException extends RuntimeException {
    public FilesByUserIdNotFoundException(String userId) {
        super("No files found for user with ID: " + userId);
    }
}
