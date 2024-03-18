package com.contiq.userservice.service;

import com.contiq.userservice.dto.LoginDTO;
import com.contiq.userservice.dto.request.UserRequest;
import com.contiq.userservice.dto.response.UserResponse;

import java.util.List;

public interface UserService {
    UserResponse saveUser(UserRequest userRequest);


    UserResponse getUserByEmail(String email);


    UserResponse updateUserPassword(String id, UserRequest userRequest);


    List<UserResponse> listAllUsers();

    UserResponse getUserById(String userId);
    UserResponse getUserByEmailAndPassword(LoginDTO loginDTO);
}
