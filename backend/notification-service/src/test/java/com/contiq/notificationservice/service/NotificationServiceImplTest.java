package com.contiq.notificationservice.service;

import com.contiq.notificationservice.component.UserService;
import com.contiq.notificationservice.dto.NotificationDto;
import com.contiq.notificationservice.dto.UserResponse;
import com.contiq.notificationservice.entity.CollaboratorsNotificationStatus;
import com.contiq.notificationservice.entity.Notification;
import com.contiq.notificationservice.repository.NotificationRepository;
import com.contiq.notificationservice.repository.NotificationStatusRepository;
import com.contiq.notificationservice.service.impl.NotificationServiceImpl;
import org.apache.commons.lang.NullArgumentException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;
import reactor.core.publisher.Mono;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class NotificationServiceImplTest {

    @InjectMocks
    private NotificationServiceImpl notificationService;

    @Mock
    private UserService userService;

    @Mock
    private NotificationRepository notificationRepository;

    @Mock
    private NotificationStatusRepository notificationStatusRepository;


    @Mock
    private ModelMapper modelMapper;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGenerateNotification_Success() {
        NotificationDto notificationDto = new NotificationDto();
        notificationDto.setUserId("user001");
        notificationDto.setFileId("file001");

        Notification notification = new Notification();
        notification.setFileId(notificationDto.getFileId());
        notification.setUserId(notificationDto.getUserId());

        when(userService.getUserDetailsById(notificationDto.getUserId())).thenReturn(createUserResponse());
        when(notificationRepository.save(any(Notification.class))).thenReturn(new Notification());
        when(modelMapper.map(notificationDto, Notification.class)).thenReturn(notification);

        notificationService.generateNotification(notificationDto);
        verify(notificationRepository, times(1)).save(any(Notification.class));

    }

    @Test
    void testGenerateNotification_Success_withUpdateDateExisting() {
        NotificationDto notificationDto = new NotificationDto();
        notificationDto.setUserId("user001");
        notificationDto.setFileId("file001");
        notificationDto.setUpdateDate(LocalDate.now());

        Notification notification = new Notification();
        notification.setFileId(notificationDto.getFileId());
        notification.setUserId(notificationDto.getUserId());
        notification.setUpdateDate(notificationDto.getUpdateDate());

        when(userService.getUserDetailsById(notificationDto.getUserId())).thenReturn(createUserResponse());
        when(notificationRepository.save(any(Notification.class))).thenReturn(new Notification());
        when(modelMapper.map(notificationDto, Notification.class)).thenReturn(notification);

        notificationService.generateNotification(notificationDto);
        verify(notificationRepository, times(1)).save(any(Notification.class));
    }

    @Test
    void testGenerateNotification_NullUserId() {
        NotificationDto notificationDto = new NotificationDto();
        notificationDto.setFileId("file001");

        try {
            notificationService.generateNotification(notificationDto);
        } catch (NullArgumentException e) {
            String expectedMessage = "user id";
            String actualMessage = e.getMessage();
            assert(actualMessage.contains(expectedMessage));
        }
        verify(notificationRepository, never()).save(any(Notification.class));
    }

    @Test
    void testGenerateNotification_BlankUserId() {
        NotificationDto notificationDto = new NotificationDto();
        notificationDto.setFileId("file001");
        notificationDto.setUserId("");

        try {
            notificationService.generateNotification(notificationDto);
        } catch (NullArgumentException e) {
            String expectedMessage = "user id";
            String actualMessage = e.getMessage();
            assert(actualMessage.contains(expectedMessage));
        }
        verify(notificationRepository, never()).save(any(Notification.class));
    }

    @Test
    void testGenerateNotification_EmptyMonoUSer() {
        NotificationDto notificationDto = new NotificationDto();
        notificationDto.setFileId("file001");
        notificationDto.setUserId("user001");
        when(userService.getUserDetailsById(notificationDto.getUserId())).thenReturn(Mono.empty());

        try {
            notificationService.generateNotification(notificationDto);
        } catch (NullArgumentException e) {
            String expectedMessage = "user id";
            String actualMessage = e.getMessage();
            assert(actualMessage.contains(expectedMessage));
        }
        verify(notificationRepository, never()).save(any(Notification.class));
    }

    @Test
    void testGenerateNotification_NullFileId() {
        NotificationDto notificationDto = new NotificationDto();
        notificationDto.setUserId("user001");
        when(userService.getUserDetailsById(notificationDto.getUserId())).thenReturn(createUserResponse());

        try {
            notificationService.generateNotification(notificationDto);
        } catch (NullArgumentException e) {
            String expectedMessage = "file id";
            String actualMessage = e.getMessage();
            assert(actualMessage.contains(expectedMessage));
        }
        verify(notificationRepository, never()).save(any(Notification.class));
    }

    @Test
    void testGenerateNotification_BlankFileId() {
        NotificationDto notificationDto = new NotificationDto();
        notificationDto.setUserId("user001");
        notificationDto.setFileId("");



        when(userService.getUserDetailsById(notificationDto.getUserId())).thenReturn(createUserResponse());

        try {
            notificationService.generateNotification(notificationDto);
        } catch (NullArgumentException e) {
            String expectedMessage = "file id";
            String actualMessage = e.getMessage();
            assert(actualMessage.contains(expectedMessage));
        }
        verify(notificationRepository, never()).save(any(Notification.class));
    }

    @Test
    void testFetchAllNotifications_Success() {
        List<Notification> notificationList = new ArrayList<>();
        notificationList.add(createNotification("1", "Message 1"));
        notificationList.add(createNotification("2", "Message 2"));

        when(notificationRepository.findAll()).thenReturn(notificationList);
        List<NotificationDto> notificationDtoList = notificationService.fetchAllNotifications();

        verify(notificationRepository, times(1)).findAll();

        Assertions.assertNotNull(notificationDtoList);
        Assertions.assertEquals(2, notificationDtoList.size());
    }

    @Test
    void testFetchAllNotifications_NoNotifications() {
        when(notificationRepository.findAll()).thenReturn(new ArrayList<>());
        List<NotificationDto> notificationDtoList = notificationService.fetchAllNotifications();

        verify(notificationRepository, times(1)).findAll();
        Assertions.assertEquals(0, notificationDtoList.size());
    }

    @Test
    void testGenerateNotificationStatus_Success() {
        when(userService.getAllUserDetails()).thenReturn(createUserResponseList());
        String notificationId = "notification123";

        List<CollaboratorsNotificationStatus> expectedNotificationStatusList = createUserResponseList().stream()
                .map(user -> CollaboratorsNotificationStatus.builder()
                        .notificationId(notificationId)
                        .isRead(false)
                        .userId(user.getId())
                        .build())
                .collect(Collectors.toList());

        when(notificationStatusRepository.saveAll(expectedNotificationStatusList))
                .thenReturn(expectedNotificationStatusList);

        notificationService.generateNotificationStatus(notificationId);

        verify(userService, times(1)).getAllUserDetails();
        verify(notificationStatusRepository, times(1)).saveAll(any());
    }

    @Test
    void testGenerateNotificationStatus_EmptyUserList() {
        when(userService.getAllUserDetails()).thenReturn(new ArrayList<>());
        String notificationId = "notification123";

        notificationService.generateNotificationStatus(notificationId);
        verify(notificationStatusRepository, never()).save(any(CollaboratorsNotificationStatus.class));
    }

    private Notification createNotification(String id, String message) {
        Notification notification = new Notification();
        notification.setId(id);
        notification.setMessage(message);
        notification.setUserId("userId");
        notification.setFileId("fieldId");
        notification.setUpdateDate(LocalDate.now());
        return notification;
    }

    private List<UserResponse> createUserResponseList() {
        List<UserResponse> userList = new ArrayList<>();

        UserResponse userResponse = new UserResponse();
        userResponse.setId("user1");
        userResponse.setName("john");
        userList.add(userResponse);

        return userList;
    }

    private Mono<UserResponse> createUserResponse() {
        UserResponse userResponse = new UserResponse();
        userResponse.setName("user");
        userResponse.setId("1");
        userResponse.setEmail("user@example.com");
        return Mono.just(userResponse);
    }
}

