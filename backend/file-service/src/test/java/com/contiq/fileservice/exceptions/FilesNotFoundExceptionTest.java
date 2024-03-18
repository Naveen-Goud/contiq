package com.contiq.fileservice.exceptions;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

 class FilesNotFoundExceptionTest {

    @Test
     void testExceptionMessage() {
        // Arrange
        String expectedMessage = "File not found message";

        // Act
        FilesNotFoundException exception = new FilesNotFoundException(expectedMessage);

        // Assert
        assertEquals(expectedMessage, exception.getMessage());
    }
}