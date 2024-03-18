package com.contiq.notificationservice.service.impl;

import com.contiq.notificationservice.entity.CollaboratorsNotificationStatus;
import com.contiq.notificationservice.repository.NotificationStatusRepository;
import com.contiq.notificationservice.service.NotificationStatusService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@Slf4j
public class NotificationStatusServiceImpl implements NotificationStatusService {

    @Autowired
    private NotificationStatusRepository notificationStatusRepository;

    @Override
    public Long getNotificationCounts(String userId) {
        return notificationStatusRepository.countByUserIdAndIsRead(userId, false);
    }

    @Override
    public void updateNotificationCounts(String userId) {
        List<CollaboratorsNotificationStatus> notificationStatusList =
                notificationStatusRepository.findByUserIdAndIsRead(userId, false);

        if(!notificationStatusList.isEmpty()){
            notificationStatusList.forEach(notificationStatus -> notificationStatus.setIsRead(true));
            notificationStatusRepository.saveAll(notificationStatusList);
        }
    }
}
