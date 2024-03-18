package com.contiq.notificationservice.controller;

import com.contiq.notificationservice.dto.NotificationDto;
import com.contiq.notificationservice.service.NotificationService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.ArrayList;
import java.util.List;

@WebMvcTest(NotificationController.class)
class NotificationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private NotificationService notificationService;

    @Test
    void testGenerateNotification() throws Exception {
        NotificationDto notificationDto = new NotificationDto();
        notificationDto.setMessage("Test Message");

        mockMvc.perform(MockMvcRequestBuilders.post("/api/notifications")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(notificationDto))
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isCreated());

        Mockito.verify(notificationService, Mockito.times(1)).generateNotification(notificationDto);
    }

    @Test
    void testFetchAllNotifications() throws Exception {
        List<NotificationDto> notificationDtoList = new ArrayList<>();
        NotificationDto notification1 = new NotificationDto();
        notification1.setMessage("Message 1");
        notificationDtoList.add(notification1);

        Mockito.when(notificationService.fetchAllNotifications()).thenReturn(notificationDtoList);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/notifications")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].message").value("Message 1"));
    }

    private String asJsonString(Object obj) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(obj);
    }
}
