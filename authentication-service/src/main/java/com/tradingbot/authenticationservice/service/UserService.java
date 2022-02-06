package com.tradingbot.authenticationservice.service;

import com.tradingbot.authenticationservice.dto.UserDto;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {

    void createUser(UserDto userDto);
    UserDto getUserByUserId(String userId);
    UserDto getUserByEmail(String email);
    void updateUser(UserDto requestUser);
}
