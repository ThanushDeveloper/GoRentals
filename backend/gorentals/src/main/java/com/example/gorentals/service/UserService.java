package com.example.gorentals.service;

import com.example.gorentals.entity.User;
import com.example.gorentals.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;
import java.util.HashSet;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public User registerUser(String name, String email, String rawPassword) {
        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Email already registered");
        }
        Set<String> roles = new HashSet<>();
        roles.add("ROLE_USER");
        User user = User.builder()
                .name(name)
                .email(email)
                .passwordHash(passwordEncoder.encode(rawPassword))
                .roles(roles)
                .build();
        return userRepository.save(user);
    }

    public User findByEmailOrThrow(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    public String encodePassword(String raw) {
        return passwordEncoder.encode(raw);
    }

    @Transactional
    public User updateProfile(Long userId, String name) {
        User user = userRepository.findById(userId).orElseThrow();
        user.setName(name);
        return userRepository.save(user);
    }
}


