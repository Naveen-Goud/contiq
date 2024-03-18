package com.contiq.notificationservice.entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDate;

@Entity
@Table(name = "notification")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class Notification {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(length = 40)
    private String id;

    private String message;

    @Column(name = "update_date")
    private LocalDate updateDate;

    @Column(name = "file_id", length = 40)
    private String fileId;

    @Column(name = "user_id", length = 40)
    private String userId;

    @Column(name = "sender_name")
    private String senderName;
}