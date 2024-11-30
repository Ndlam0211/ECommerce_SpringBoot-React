package com.nguyendinhlam.demo5.service.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.nguyendinhlam.demo5.config.UserInfoConfig;
import com.nguyendinhlam.demo5.entity.User;
import com.nguyendinhlam.demo5.exceptions.ResourceNotFoundException;
import com.nguyendinhlam.demo5.repository.UserRepo;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    private UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepo.findByEmail(username);
        return (UserDetails) user.map(UserInfoConfig::new)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", username));
    }
}
