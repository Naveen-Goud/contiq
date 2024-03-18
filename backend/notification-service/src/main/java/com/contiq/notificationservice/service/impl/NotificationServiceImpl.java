package com.contiq.notificationservice.service.impl;

import com.contiq.notificationservice.component.UserService;
import com.contiq.notificationservice.dto.NotificationDto;
import com.contiq.notificationservice.dto.UserResponse;
import com.contiq.notificationservice.entity.CollaboratorsNotificationStatus;
import com.contiq.notificationservice.entity.Notification;
import com.contiq.notificationservice.repository.NotificationRepository;
import com.contiq.notificationservice.repository.NotificationStatusRepository;
import com.contiq.notificationservice.service.NotificationService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.NullArgumentException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class NotificationServiceImpl implements NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private NotificationStatusRepository notificationStatusRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    @Transactional
    public void generateNotification(NotificationDto notificationDto)  {

        log.info("Started process to generate notification.");
        if(notificationDto.getUserId() == null || notificationDto.getUserId().isBlank()){
            throw new NullArgumentException("user id");
        }

        UserResponse userResponse = userService.getUserDetailsById(notificationDto.getUserId()).block();
        if(userResponse == null){
            throw new NullArgumentException("user id");
        }

        if(notificationDto.getFileId() == null || notificationDto.getFileId().isBlank()){
            throw new NullArgumentException("file id");
        }

        Notification notification = convertToEntity(notificationDto);
        if (notification.getUpdateDate() == null) {
            notification.setUpdateDate(LocalDate.now());
        }
        notification.setSenderName(userResponse.getName());
        notification = notificationRepository.save(notification);
        log.info("Completed process to generate notification.");
        generateNotificationStatus(notification.getId());
    }

    @Override
    public List<NotificationDto> fetchAllNotifications() {

        log.info("Started fetching notifications...");
        List<Notification> notificationList = notificationRepository.findAll();
        if(notificationList.isEmpty()) return Collections.emptyList();

        log.info("Completed process to fetch notifications...");
        return notificationList.stream()
                .map(this::convertToDto)
                .toList();
    }

    @Transactional
    public void generateNotificationStatus(String notificationId) {
        log.info("Started process to generate Collaborators Notification status...");
        List<UserResponse> userList = userService.getAllUserDetails();
        if (userList.isEmpty()) {
            return;
        }

        List<CollaboratorsNotificationStatus> notificationStatusList = userList.stream()
                .map(user -> {
                    CollaboratorsNotificationStatus notificationStatus = new CollaboratorsNotificationStatus();
                    notificationStatus.setNotificationId(notificationId);
                    notificationStatus.setIsRead(false);
                    notificationStatus.setUserId(user.getId());
                    return notificationStatus;
                })
                .collect(Collectors.toList());

        notificationStatusRepository.saveAll(notificationStatusList);
        log.info("Completed process to generate Collaborators Notification status...");
    }

    private Notification convertToEntity(NotificationDto notificationDto) {
        return modelMapper.map(notificationDto, Notification.class);
    }

    private NotificationDto convertToDto(Notification notification) {
        return modelMapper.map(notification, NotificationDto.class);
    }
}
