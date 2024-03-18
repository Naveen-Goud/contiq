package com.contiq.userservice.service;//package com.contiq.userservice.service;
//
//import com.contiq.userservice.dto.LoginDTO;
//import com.contiq.userservice.dto.request.UserRequest;
//import com.contiq.userservice.dto.response.UserResponse;
//import com.contiq.userservice.entity.User;
//import com.contiq.userservice.exceptions.UserNotFoundException;
//import com.contiq.userservice.repository.UserRepository;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.junit.MockitoJUnitRunner;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Optional;
//
//import static org.junit.Assert.assertEquals;
//import static org.mockito.ArgumentMatchers.*;
//import static org.mockito.Mockito.when;
//
//@RunWith(MockitoJUnitRunner.class)
// class UserServiceImplTest {
//
//    @InjectMocks
//    private UserServiceImpl userService;
//
//    @Mock
//    private UserRepository userRepository;
//
//    @Mock
//    private PasswordEncoder passwordEncoder;
//
//    @Test
//     void testSaveUser() {
//        UserRequest userRequest = new UserRequest();
//        userRequest.setName("John");
//        userRequest.setEmail("john@example.com");
//        userRequest.setPassword("password");
//
//        User user = new User();
//        user.setName(userRequest.getName());
//        user.setEmail(userRequest.getEmail());
//        user.setPassword(userRequest.getPassword());
//
//        when(passwordEncoder.encode(anyString())).thenReturn("encoded_password");
//        when(userRepository.save(any(User.class))).thenReturn(user);
//
//        UserResponse result = userService.saveUser(userRequest);
//
//        assertEquals(user.getName(), result.getName());
//        assertEquals(user.getEmail(), result.getEmail());
//        // Add more assertions as needed
//    }
//
//    @Test
//     void testGetUserByEmail() {
//        String email = "john@example.com";
//        User user = new User();
//        user.setEmail(email);
//
//        when(userRepository.findByEmail(eq(email))).thenReturn(Optional.of(user));
//
//        UserResponse result = userService.getUserByEmail(email);
//
//        assertEquals(user.getEmail(), result.getEmail());
//        // Add more assertions as needed
//    }
//
//    @Test(expected = UserNotFoundException.class)
//     void testGetUserByEmailNotFound() {
//        String email = "nonexistent@example.com";
//
//        when(userRepository.findByEmail(eq(email))).thenReturn(Optional.empty());
//
//        userService.getUserByEmail(email);
//    }
//
//    @Test
//     void testUpdateUserPassword() {
//        String userId = "123";
//        UserRequest userRequest = new UserRequest();
//        userRequest.setPassword("new_password");
//
//        User user = new User();
//        user.setId(userId);
//        user.setPassword("old_password");
//
//        when(userRepository.findById(eq(userId))).thenReturn(Optional.of(user));
//        when(passwordEncoder.encode(anyString())).thenReturn("encoded_password");
//        when(userRepository.save(any(User.class))).thenReturn(user);
//
//        UserResponse result = userService.updateUserPassword(userId, userRequest);
//
//        assertEquals(userId, result.getId());
////        assertEquals("encoded_password", "new_password");
//        // Add more assertions as needed
//    }
//
//    @Test(expected = UserNotFoundException.class)
//     void testUpdateUserPasswordNotFound() {
//        String userId = "nonexistent";
//
//        when(userRepository.findById(eq(userId))).thenReturn(Optional.empty());
//
//        userService.updateUserPassword(userId, new UserRequest());
//    }
//
//
//
//    @Test(expected = UserNotFoundException.class)
//     void testGetUserByEmailAndPasswordInvalidEmail() {
//        String email = "satish@gmail.com";
//        String password = "Satish@3456";
//        LoginDTO loginDTO = new LoginDTO(email, password);
//
//        when(userRepository.findByEmail(eq(email))).thenReturn(Optional.empty());
//
//        UserResponse userResponse=userService.getUserByEmailAndPassword(loginDTO);
//        assertEquals(email, userResponse.getEmail());
//    }
//
//    @Test(expected = UserNotFoundException.class)
//     void testGetUserByEmailAndPasswordInvalidPassword() {
//        String email = "john@example.com";
//        String password = "invalid_password";
//        LoginDTO loginDTO = new LoginDTO(email, password);
//
//        User user = new User();
//        user.setEmail(email);
//        user.setPassword("encoded_password");
//
//        when(userRepository.findByEmail(eq(email))).thenReturn(Optional.of(user));
//
//        userService.getUserByEmailAndPassword(loginDTO);
//    }
//
//    @Test
//     void testListAllUsers() {
//        List<User> userList = new ArrayList<>();
//        // Initialize userList with mock user data
//
//        when(userRepository.findAll()).thenReturn(userList);
//
//        List<UserResponse> result = userService.listAllUsers();
//
//        assertEquals(userList.size(), result.size());
//        // Add more assertions as needed
//    }
//
//    @Test
//     void testGetUserById() {
//        String userId = "123";
//        User user = new User();
//        user.setId(userId);
//
//        when(userRepository.findById(eq(userId))).thenReturn(Optional.of(user));
//
//        UserResponse result = userService.getUserById(userId);
//
//        assertEquals(userId, result.getId());
//        // Add more assertions as needed
//    }
//
//    @Test(expected = UserNotFoundException.class)
//     void testGetUserByIdNotFound() {
//        String userId = "nonexistent";
//
//        when(userRepository.findById(eq(userId))).thenReturn(Optional.empty());
//
//        userService.getUserById(userId);
//    }
//}


import com.contiq.userservice.dto.LoginDTO;
import com.contiq.userservice.dto.request.UserRequest;
import com.contiq.userservice.dto.response.UserResponse;
import com.contiq.userservice.entity.User;
import com.contiq.userservice.exceptions.UserNotFoundException;
import com.contiq.userservice.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

 class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserServiceImpl userService;

    @BeforeEach
     void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
     void testSaveUser() {
        // Mock data
        UserRequest userRequest = new UserRequest();
        userRequest.setName("John");
        userRequest.setEmail("john@example.com");
        userRequest.setPassword("password123");

        User user = new User();
        user.setId("1");
        user.setName("John");
        user.setEmail("john@example.com");
        user.setPassword("hashed_password");

        when(passwordEncoder.encode(anyString())).thenReturn("hashed_password");
        when(userRepository.save(any(User.class))).thenReturn(user);

        // Call the service method
        UserResponse result = userService.saveUser(userRequest);

        // Assertions
        assertNotNull(result);
        assertEquals("1", result.getId());
        assertEquals("John", result.getName());
        assertEquals("john@example.com", result.getEmail());
    }

    @Test
     void testGetUserByEmail() {
        // Mock data
        String email = "john@example.com";
        User user = new User();
        user.setId("1");
        user.setName("John");
        user.setEmail(email);
        user.setPassword("hashed_password");

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));

        // Call the service method
        UserResponse result = userService.getUserByEmail(email);

        // Assertions
        assertNotNull(result);
        assertEquals("1", result.getId());
        assertEquals("John", result.getName());
        assertEquals(email, result.getEmail());
    }

    @Test
     void testGetUserByEmail_UserNotFound() {
        // Mock data
        String email = "nonexistent@example.com";

        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());

        // Call the service method and expect an exception
        assertThrows(UserNotFoundException.class, () -> userService.getUserByEmail(email));
    }

    @Test
     void testUpdateUserPassword() {
        // Mock data
        String userId = "1";
        UserRequest userRequest = new UserRequest();
        userRequest.setPassword("new_password");

        User user = new User();
        user.setId(userId);

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(passwordEncoder.encode(anyString())).thenReturn("hashed_password");
        when(userRepository.save(any(User.class))).thenReturn(user);

        // Call the service method
        UserResponse result = userService.updateUserPassword(userId, userRequest);

        // Assertions
        assertNotNull(result);
        assertEquals(userId, result.getId());
        // Add more assertions as needed
    }

    @Test
     void testUpdateUserPassword_UserNotFound() {
        // Mock data
        String userId = "nonexistent";
        UserRequest userRequest = new UserRequest();
        userRequest.setPassword("new_password");

        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        // Call the service method and expect an exception
        assertThrows(UserNotFoundException.class, () -> userService.updateUserPassword(userId, userRequest));
    }

//    @Test
//     void testGetUserByEmailAndPassword() {
//        // Mock data
//        String email = "john@example.com";
//        String password = "password123";
//        LoginDTO loginDTO = new LoginDTO();
//        loginDTO.setEmail(email);
//        loginDTO.setPassword(password);
//
//        User user = new User();
//        user.setEmail(email);
//        user.setPassword(passwordEncoder.encode(password));
//
//        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
//        when(passwordEncoder.encode(password)).thenReturn(user.getPassword()); // Mock the password encoder
//
//        // Call the service method
//        UserResponse result = userService.getUserByEmailAndPassword(loginDTO);
//
//        // Assertions
//        assertNotNull(result);
//        assertEquals(email, result.getEmail());
//        // Add more assertions as needed
//    }

    @Test
     void testGetUserByEmailAndPassword_UserNotFound() {
        // Mock data
        String email = "nonexistent@example.com";
        String password = "password123";
        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setEmail(email);
        loginDTO.setPassword(password);

        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());

        // Call the service method and expect an exception
        assertThrows(UserNotFoundException.class, () -> userService.getUserByEmailAndPassword(loginDTO));
    }

    @Test
     void testGetUserByEmailAndPassword_InvalidPassword() {
        // Mock data
        String email = "john@example.com";
        String password = "password123";
        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setEmail(email);
        loginDTO.setPassword(password);

        User user = new User();
        user.setEmail(email);
        user.setPassword("incorrect_hashed_password");

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));

        // Call the service method and expect an exception
        assertThrows(UserNotFoundException.class, () -> userService.getUserByEmailAndPassword(loginDTO));
    }

    @Test
     void testListAllUsers() {
        // Mock data
        List<User> userList = new ArrayList<>();
        User user1 = new User();
        user1.setId("1");
        user1.setName("User1");
        user1.setEmail("user1@example.com");
        userList.add(user1);

        User user2 = new User();
        user2.setId("2");
        user2.setName("User2");
        user2.setEmail("user2@example.com");
        userList.add(user2);

        when(userRepository.findAll()).thenReturn(userList);

        // Call the service method
        List<UserResponse> result = userService.listAllUsers();

        // Assertions
        assertNotNull(result);
        assertEquals(2, result.size());
        // Add more assertions as needed
    }

    @Test
     void testGetUserById() {
        // Mock data
        String userId = "1";
        User user = new User();
        user.setId(userId);
        user.setName("User1");
        user.setEmail("user1@example.com");

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        // Call the service method
        UserResponse result = userService.getUserById(userId);

        // Assertions
        assertNotNull(result);
        assertEquals(userId, result.getId());
        // Add more assertions as needed
    }

    @Test
     void testGetUserById_UserNotFound() {
        // Mock data
        String userId = "nonexistent";

        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        // Call the service method and expect an exception
        assertThrows(UserNotFoundException.class, () -> userService.getUserById(userId));
    }

    // Add more test methods for other service methods as needed
}
