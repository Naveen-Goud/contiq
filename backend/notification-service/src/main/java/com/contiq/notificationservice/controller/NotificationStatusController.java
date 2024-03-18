package com.contiq.notificationservice.controller;

import com.contiq.notificationservice.service.NotificationStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
//@CrossOrigin("*")
@RequestMapping("/api/notificationStatus")
public class NotificationStatusController {

    @Autowired
    private NotificationStatusService notificationStatusService;

    @GetMapping("/user/{userId}")
    @ResponseStatus(HttpStatus.OK)
    public Long getNotificationCounts(@PathVariable String userId){
        return notificationStatusService.getNotificationCounts(userId);
    }

    @PutMapping("/user/{userId}")
    @ResponseStatus(HttpStatus.OK)
    public void updateNotificationCounts(@PathVariable String userId){
        notificationStatusService.updateNotificationCounts(userId);
    }
}
