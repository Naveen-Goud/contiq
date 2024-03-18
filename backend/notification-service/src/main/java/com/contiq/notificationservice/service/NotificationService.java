package com.contiq.notificationservice.service;

import com.contiq.notificationservice.dto.NotificationDto;

import java.util.List;

public interface NotificationService {
    void generateNotification(NotificationDto notificationDto);

    List<NotificationDto> fetchAllNotifications();
}
