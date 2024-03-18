package com.contiq.userservice.exceptions;

public class UnAuthorizedUserException extends RuntimeException{

    public UnAuthorizedUserException(String message){
        super(message);
    }
}
