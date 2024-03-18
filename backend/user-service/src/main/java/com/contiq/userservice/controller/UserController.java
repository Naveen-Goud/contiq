package com.contiq.userservice.controller;

import com.contiq.userservice.config.JWTGenerator;
import com.contiq.userservice.dto.LoginDTO;
import com.contiq.userservice.dto.request.UserRequest;
import com.contiq.userservice.dto.response.UserResponse;
import com.contiq.userservice.exceptions.BadRequestException;
import com.contiq.userservice.exceptions.UnAuthorizedUserException;
import com.contiq.userservice.exceptions.UserNotFoundException;
import com.contiq.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//@CrossOrigin("*")
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JWTGenerator jwtGenerator;


    @PostMapping("/save")
    public ResponseEntity<UserResponse> saveUser(@RequestBody UserRequest userRequest){
        return new ResponseEntity<>(userService.saveUser(userRequest), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<UserResponse> getUserByEmail(@RequestParam("email") String email){
        UserResponse user = userService.getUserByEmail(email);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserResponse> updateUserPassword(@PathVariable String id,@RequestBody UserRequest userRequest){
        UserResponse updatedUser=userService.updateUserPassword(id,userRequest);

        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }
    @GetMapping("/all")
    public ResponseEntity<List<UserResponse>> listAllUsers(){
        List<UserResponse> userList = userService.listAllUsers();
        return new ResponseEntity<>(userList, HttpStatus.OK);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable String userId){
        UserResponse user = userService.getUserById(userId);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginDTO loginDTO) {
        try {
            if (loginDTO.getEmail() == null || loginDTO.getPassword() == null) {
                throw new BadRequestException("UserName or Password is Empty");
            }
            UserResponse userData = userService.getUserByEmailAndPassword(loginDTO);
            if (userData == null) {
                throw new UnAuthorizedUserException("UserName or Password is Invalid");
            }
            return new ResponseEntity<>(jwtGenerator.generateToken(loginDTO), HttpStatus.OK);
        }
        catch (Exception exception){
            throw new UserNotFoundException("login failed");
        }
    }
}
