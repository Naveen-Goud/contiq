package com.contiq.fileservice.exceptions;

import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;

class ExceptionDetailsTest {

    @Test
    void testConstructorAndGetters() {
        Date timeStamp = new Date();
        String message = "Test message";
        HttpStatus status = HttpStatus.BAD_REQUEST;

        ExceptionDetails exceptionDetails = new ExceptionDetails(timeStamp, message, status);

        assertEquals(timeStamp, exceptionDetails.getTimeStamp());
        assertEquals(message, exceptionDetails.getMsg());
        assertEquals(status, exceptionDetails.getStatus());
    }

    @Test
    void testNoArgsConstructor() {
        ExceptionDetails exceptionDetails = new ExceptionDetails();

        assertEquals(null, exceptionDetails.getTimeStamp());
        assertEquals(null, exceptionDetails.getMsg());
        assertEquals(null, exceptionDetails.getStatus());
    }

    @Test
    void testSetters() {
        Date timeStamp = new Date();
        String message = "Test message";
        HttpStatus status = HttpStatus.BAD_REQUEST;

        ExceptionDetails exceptionDetails = new ExceptionDetails();

        exceptionDetails.setTimeStamp(timeStamp);
        exceptionDetails.setMsg(message);
        exceptionDetails.setStatus(status);

        assertEquals(timeStamp, exceptionDetails.getTimeStamp());
        assertEquals(message, exceptionDetails.getMsg());
        assertEquals(status, exceptionDetails.getStatus());
    }
}
