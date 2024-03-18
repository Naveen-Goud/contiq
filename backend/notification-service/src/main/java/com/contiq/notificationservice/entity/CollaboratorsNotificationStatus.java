package com.contiq.notificationservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "collaborators_notification_status")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class CollaboratorsNotificationStatus {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(length = 40)
    private String id;

    @Column(name = "is_read")
    private Boolean isRead;

    @Column(name = "notification_id", length = 40)
    private String notificationId;

    @Column(name = "user_id", length = 40)
    private String userId;
}
