package com.contiq.fileservice.exceptions;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

 class FilesByUserIdNotFoundExceptionTest {

    @Test
    void testExceptionMessage() {
        // Arrange
        String userId = "123";
        String expectedMessage = "No files found for user with ID: " + userId;

        // Act
        FilesByUserIdNotFoundException exception = new FilesByUserIdNotFoundException(userId);

        // Assert
        assertEquals(expectedMessage, exception.getMessage());
    }
}
