package com.contiq.notificationservice.controller;

import com.contiq.notificationservice.dto.NotificationDto;
import com.contiq.notificationservice.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
//@CrossOrigin("*")
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void generateNotification(@RequestBody NotificationDto notificationDto) {
        notificationService.generateNotification(notificationDto);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<NotificationDto> fetchAllNotifications() {
        return notificationService.fetchAllNotifications();
    }
}
