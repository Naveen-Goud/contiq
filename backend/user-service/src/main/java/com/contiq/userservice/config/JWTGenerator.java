package com.contiq.userservice.config;



import com.contiq.userservice.dto.LoginDTO;

import java.util.Map;

public interface JWTGenerator {
    Map<String, String> generateToken(LoginDTO loginDTO);
}
