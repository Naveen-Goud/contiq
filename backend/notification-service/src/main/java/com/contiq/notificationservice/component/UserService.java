package com.contiq.notificationservice.component;

import com.contiq.notificationservice.constants.ServiceUrls;
import com.contiq.notificationservice.dto.UserResponse;
import com.contiq.notificationservice.exception.InvalidIdentityException;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;

@Component
public class UserService {

    public List<UserResponse> getAllUserDetails() {

        WebClient webClient = WebClient.builder()
                .baseUrl(ServiceUrls.USER_SERVICE.getUrl())
                .build();

        return webClient
                .get()
                .uri("/all")
                .retrieve()
                .bodyToFlux(UserResponse.class)
                .collectList()
                .block();
    }

    public Mono<UserResponse> getUserDetailsById(String userId) {
        WebClient webClient = WebClient.builder()
                .baseUrl(ServiceUrls.USER_SERVICE.getUrl())
                .build();

        return webClient
                .get()
                .uri("/" + userId)
                .retrieve()
                .bodyToMono(UserResponse.class)
                .switchIfEmpty(Mono.error(new InvalidIdentityException(userId)));
    }
}
