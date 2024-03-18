package com.contiq.notificationservice.controller;

import com.contiq.notificationservice.service.NotificationStatusService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class NotificationStatusControllerTest {
    @Mock
    private NotificationStatusService notificationStatusService;

    @InjectMocks
    private NotificationStatusController notificationStatusController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetNotificationCounts() {
        // Arrange
        String userId = "testUser";
        Long expectedCount = 5L;

        when(notificationStatusService.getNotificationCounts(userId)).thenReturn(expectedCount);

        // Act
        Long actualCount = notificationStatusController.getNotificationCounts(userId);

        // Assert
        assertEquals(expectedCount, actualCount);
        verify(notificationStatusService, times(1)).getNotificationCounts(userId);
    }

    @Test
    void testUpdateNotificationCounts() {
        // Arrange
        String userId = "testUser";

        // Act
        notificationStatusController.updateNotificationCounts(userId);

        // Assert
        verify(notificationStatusService, times(1)).updateNotificationCounts(userId);
    }

}
