package com.contiq.notificationservice.service;

import com.contiq.notificationservice.entity.CollaboratorsNotificationStatus;
import com.contiq.notificationservice.repository.NotificationStatusRepository;
import com.contiq.notificationservice.service.impl.NotificationStatusServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

class NotificationStatusServiceImplTest {

    @InjectMocks
    private NotificationStatusServiceImpl notificationStatusService;

    @Mock
    private NotificationStatusRepository notificationStatusRepository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetNotificationCounts() {
        String userId = "testUser";
        long expectedCount = 5;

        Mockito.when(notificationStatusRepository.countByUserIdAndIsRead(userId, false)).thenReturn(expectedCount);
        long actualCount = notificationStatusService.getNotificationCounts(userId);
        assertEquals(expectedCount, actualCount);
    }

    @Test
    void testUpdateNotificationCounts() {
        String userId = "testUser";
        List<CollaboratorsNotificationStatus> notificationStatusList = Arrays.asList(
                new CollaboratorsNotificationStatus("n001",false, userId, "file001"),
                new CollaboratorsNotificationStatus("n002",false, userId, "file002"),
                new CollaboratorsNotificationStatus("n003",false, userId, "file003")
        );

        Mockito.when(notificationStatusRepository.findByUserIdAndIsRead(userId, false))
                .thenReturn(notificationStatusList);

        notificationStatusService.updateNotificationCounts(userId);
        Mockito.verify(notificationStatusRepository,
                Mockito.times(1)).saveAll(notificationStatusList);
    }

    @Test
    void testUpdateNotificationCountsEmptyList() {
        String userId = "testUser";
        Mockito.when(notificationStatusRepository.findByUserIdAndIsRead(userId, false))
                .thenReturn(Collections.emptyList());

        notificationStatusService.updateNotificationCounts(userId);
        Mockito.verify(notificationStatusRepository, Mockito.never()).saveAll(Mockito.anyList());
    }
}
