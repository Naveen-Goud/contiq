package com.contiq.fileservice.exceptions;

public class ValidationException extends RuntimeException {
    public ValidationException(String message){
        super(message);
    }
}
