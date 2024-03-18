package com.contiq.userservice.service;

import com.contiq.userservice.dto.LoginDTO;
import com.contiq.userservice.dto.request.UserRequest;
import com.contiq.userservice.dto.response.UserResponse;
import com.contiq.userservice.entity.User;
import com.contiq.userservice.exceptions.UserNotFoundException;
import com.contiq.userservice.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
@Slf4j
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    private ModelMapper modelMapper;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserServiceImpl(){
        modelMapper=new ModelMapper();

    }

    @Override
    public UserResponse saveUser(UserRequest userRequest) {
        String bcryptEncodedPassword = passwordEncoder.encode(userRequest.getPassword());
        userRequest.setPassword(bcryptEncodedPassword);
        User user = modelMapper.map(userRequest, User.class);
        return modelMapper.map(userRepository.save(user), UserResponse.class);
    }

    @Override
    public UserResponse getUserByEmail(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() ->
                new UserNotFoundException("User not found with email: " + email)
        );
        return modelMapper.map(user, UserResponse.class);
    }

    @Override
    public UserResponse updateUserPassword(String id, UserRequest userRequest) {
        Optional<User> optionalUser = userRepository.findById(id);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            String bcryptEncodedPassword = passwordEncoder.encode(userRequest.getPassword());
            user.setPassword(bcryptEncodedPassword);
            User updatedUser = userRepository.save(user);
            return modelMapper.map(updatedUser, UserResponse.class);
        } else {
            throw new UserNotFoundException("User with ID " + id + " not found.");
        }
    }

    @Override
    public UserResponse getUserByEmailAndPassword(LoginDTO loginDTO) {

        Optional<User> user = userRepository.findByEmail(loginDTO.getEmail());
        if(!user.isPresent() || !user.get().isPasswordValid(loginDTO.getPassword())){

            throw new UserNotFoundException("Invalid email and password");
        }
        return modelMapper.map(user,UserResponse.class);
    }


    @Override
    public List<UserResponse> listAllUsers() {
        List<User> userList = userRepository.findAll();
        return userList.stream().map(user -> modelMapper.map(user,UserResponse.class)).toList();
    }

    @Override
    public UserResponse getUserById(String userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (!optionalUser.isPresent()) {
            throw new UserNotFoundException("User with ID " + userId + " not found.");
        }
        return modelMapper.map(optionalUser.get(), UserResponse.class);
    }
}