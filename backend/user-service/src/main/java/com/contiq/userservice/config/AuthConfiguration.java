package com.contiq.userservice.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.security.SecureRandom;

@Configuration
public class AuthConfiguration {
    @Bean
    public PasswordEncoder passwordEncoder() {
        final int strength = 10;
        return new BCryptPasswordEncoder(strength, new SecureRandom());
    }
}
