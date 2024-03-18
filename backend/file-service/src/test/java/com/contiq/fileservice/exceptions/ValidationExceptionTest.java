package com.contiq.fileservice.exceptions;

import com.contiq.fileservice.exceptions.ValidationException;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class ValidationExceptionTest {

    @Test
    void testConstructorAndGetMessage() {
        String message = "Validation failed";

        ValidationException exception = new ValidationException(message);

        assertEquals(message, exception.getMessage());
    }
}
