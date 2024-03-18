package com.contiq.notificationservice.service;

public interface NotificationStatusService {
     Long getNotificationCounts(String userId);

    void updateNotificationCounts(String userId);
}
