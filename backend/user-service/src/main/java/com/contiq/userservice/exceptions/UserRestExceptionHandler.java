package com.contiq.userservice.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class UserRestExceptionHandler {


    @ExceptionHandler
    public ResponseEntity<UserErrorResponse> handleAccessDeniedException(AccessDeniedException exc)
    {
        UserErrorResponse error=new UserErrorResponse(
                HttpStatus.FORBIDDEN.value(),exc.getMessage(),System.currentTimeMillis());

        return new ResponseEntity<>(error,HttpStatus.FORBIDDEN);
    }
    @ExceptionHandler
    public ResponseEntity<UserErrorResponse> handleNotFoundException(UserNotFoundException exc)
    {
        UserErrorResponse error=new UserErrorResponse(
                HttpStatus.NOT_FOUND.value(),exc.getMessage(),System.currentTimeMillis());

        return new ResponseEntity<>(error,HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler
    public ResponseEntity<UserErrorResponse> handleBadRequestException(BadRequestException exc)
    {
        UserErrorResponse error=new UserErrorResponse(
                HttpStatus.BAD_REQUEST.value(),exc.getMessage(),System.currentTimeMillis());

        return new ResponseEntity<>(error,HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler
    public ResponseEntity<UserErrorResponse> handleBadRequestException(UnAuthorizedUserException exc)
    {
        UserErrorResponse error=new UserErrorResponse(
                HttpStatus.UNAUTHORIZED.value(),exc.getMessage(),System.currentTimeMillis());

        return new ResponseEntity<>(error,HttpStatus.UNAUTHORIZED);
    }
    @ExceptionHandler
    public ResponseEntity<UserErrorResponse> handleException(Exception exc)
    {
        UserErrorResponse error=new UserErrorResponse(
                HttpStatus.BAD_REQUEST.value(),exc.getMessage(),System.currentTimeMillis());

        return new ResponseEntity<>(error,HttpStatus.BAD_REQUEST);
    }


}
