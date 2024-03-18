package com.contiq.userservice.controller;

import com.contiq.userservice.config.JWTGenerator;
import com.contiq.userservice.controller.UserController;
import com.contiq.userservice.dto.LoginDTO;
import com.contiq.userservice.dto.request.UserRequest;
import com.contiq.userservice.dto.response.UserResponse;
import com.contiq.userservice.exceptions.BadRequestException;
import com.contiq.userservice.exceptions.UnAuthorizedUserException;
import com.contiq.userservice.exceptions.UserNotFoundException;
import com.contiq.userservice.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertThrows;
import static org.mockito.Mockito.*;


 class UserControllerTest {

    @Mock
    private UserService userService;

    @Mock
    private JWTGenerator jwtGenerator;

    @InjectMocks
    private UserController userController;

    @BeforeEach
     void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testSaveUser() {
        UserRequest userRequest = new UserRequest();
        UserResponse userResponse = new UserResponse();

        when(userService.saveUser(userRequest)).thenReturn(userResponse);

        ResponseEntity<UserResponse> responseEntity = userController.saveUser(userRequest);

        verify(userService, times(1)).saveUser(userRequest);

        assert (responseEntity.getStatusCode() == HttpStatus.CREATED);
    }

    @Test
    void testGetUserByEmail() {
        String email = "test@example.com";
        UserResponse userResponse = new UserResponse();

        when(userService.getUserByEmail(email)).thenReturn(userResponse);

        ResponseEntity<UserResponse> responseEntity = userController.getUserByEmail(email);

        verify(userService, times(1)).getUserByEmail(email);

        assert (responseEntity.getStatusCode() == HttpStatus.OK);
    }

    @Test
    void testUpdateUserPassword() {
        String userId = "1";
        UserRequest userRequest = new UserRequest();
        UserResponse updatedUser = new UserResponse();

        when(userService.updateUserPassword(userId, userRequest)).thenReturn(updatedUser);

        ResponseEntity<UserResponse> responseEntity = userController.updateUserPassword(userId, userRequest);

        verify(userService, times(1)).updateUserPassword(userId, userRequest);

        assert (responseEntity.getStatusCode() == HttpStatus.OK);
    }

    @Test
     void testListAllUsers() {
        List<UserResponse> userList = new ArrayList<>();

        when(userService.listAllUsers()).thenReturn(userList);

        ResponseEntity<List<UserResponse>> responseEntity = userController.listAllUsers();

        verify(userService, times(1)).listAllUsers();

        assert (responseEntity.getStatusCode() == HttpStatus.OK);
    }

    @Test
     void testGetUserById() {
        String userId = "1";
        UserResponse userResponse = new UserResponse();

        when(userService.getUserById(userId)).thenReturn(userResponse);

        ResponseEntity<UserResponse> responseEntity = userController.getUserById(userId);

        verify(userService, times(1)).getUserById(userId);

        assert (responseEntity.getStatusCode() == HttpStatus.OK);
    }

    @Test
     void testLoginUser_ValidCredentials() {
        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setEmail("valid@example.com");
        loginDTO.setPassword("validPassword");

        UserResponse userResponse = new UserResponse();

        when(userService.getUserByEmailAndPassword(loginDTO)).thenReturn(userResponse);

        Map<String, String> tokenMap = new HashMap<>();
        tokenMap.put("token", "sampleToken");
        when(jwtGenerator.generateToken(loginDTO)).thenReturn(tokenMap);

        ResponseEntity<?> responseEntity = userController.loginUser(loginDTO);

        verify(userService, times(1)).getUserByEmailAndPassword(loginDTO);
        verify(jwtGenerator, times(1)).generateToken(loginDTO);

        assert (responseEntity.getStatusCode() == HttpStatus.OK);
    }



    @Test
     void testLoginUser_InvalidCredentials() {
        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setEmail("invalid@example.com");
        loginDTO.setPassword("invalidPassword");

        // Mock the userService to return null for invalid credentials
        when(userService.getUserByEmailAndPassword(loginDTO)).thenReturn(null);

        // Use assertThrows to check if UserNotFoundException is thrown
        assertThrows(UserNotFoundException.class, () -> {
            userController.loginUser(loginDTO);
        });
        // You can also assert the response body or other details if needed.
    }
    // Add more test cases as needed for error scenarios, edge cases, etc.
}
