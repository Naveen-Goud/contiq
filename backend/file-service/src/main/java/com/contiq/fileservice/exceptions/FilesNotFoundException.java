package com.contiq.fileservice.exceptions;

public class FilesNotFoundException extends RuntimeException{
    public FilesNotFoundException(String message){
        super(message);
    }
}