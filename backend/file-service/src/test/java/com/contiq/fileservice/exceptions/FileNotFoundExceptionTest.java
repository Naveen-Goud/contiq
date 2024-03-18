package com.contiq.fileservice.exceptions;

import com.contiq.fileservice.exceptions.FileNotFoundException;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class FileNotFoundExceptionTest {

    @Test
    void testConstructorAndGetMessage() {
        String message = "File not found";

        FileNotFoundException exception = new FileNotFoundException(message);

        assertEquals(message, exception.getMessage());
    }
}
