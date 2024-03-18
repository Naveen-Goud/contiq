package com.contiq.notificationservice.repository;

import com.contiq.notificationservice.entity.CollaboratorsNotificationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationStatusRepository extends JpaRepository<CollaboratorsNotificationStatus, String> {

    Long countByUserIdAndIsRead(String userId, Boolean isRead);

    List<CollaboratorsNotificationStatus> findByUserIdAndIsRead(String userId, Boolean isRead);
}
