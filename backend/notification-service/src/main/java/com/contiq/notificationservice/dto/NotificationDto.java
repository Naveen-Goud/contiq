package com.contiq.notificationservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data

public class NotificationDto {

    private String id;

    private String message;

    private LocalDate updateDate;

    private String fileId;

    private String userId;

    private String senderName;
}
