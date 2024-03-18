package com.contiq.notificationservice.exception;

public class InvalidIdentityException extends Exception{

    public InvalidIdentityException(){
        super("Invalid Identity Exception.");
    }

    public InvalidIdentityException(String id){
        super("Invalid Identity Exception: "+id);
    }

    public InvalidIdentityException(String message, String id){
        super(message+" "+id);
    }
}
