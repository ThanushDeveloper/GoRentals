package com.example.gorentals.controller;
import com.example.gorentals.dto.AuthDtos;
import com.example.gorentals.entity.User;
import com.example.gorentals.security.jwt.JwtService;
import com.example.gorentals.entity.RefreshToken;
import com.example.gorentals.service.AuthService;
import com.example.gorentals.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AuthDtos.RegisterRequest request) {
        User user = userService.registerUser(request.getName(), request.getEmail(), request.getPassword());
        var token = jwtService.generateToken(user.getEmail(), new HashMap<>());
        RefreshToken refresh = authService.issueRefreshToken(user);
        AuthDtos.AuthResponse response = AuthDtos.AuthResponse.builder()
                .token(token)
                .userId(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .roles(user.getRoles())
                .refreshToken(refresh.getToken())
                .build();
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthDtos.LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        String token = jwtService.generateToken(principal.getUsername(), new HashMap<>());
        User user = userService.findByEmailOrThrow(principal.getUsername());
        RefreshToken refresh = authService.issueRefreshToken(user);
        AuthDtos.AuthResponse response = AuthDtos.AuthResponse.builder()
                .token(token)
                .userId(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .roles(user.getRoles())
                .refreshToken(refresh.getToken())
                .build();
        return ResponseEntity.ok(response);
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@RequestBody AuthDtos.RefreshRequest request) {
        var rt = authService.findRefreshTokenOrThrow(request.getRefreshToken());
        var user = rt.getUser();
        String token = jwtService.generateToken(user.getEmail(), new HashMap<>());
        return ResponseEntity.ok(AuthDtos.TokenResponse.builder().token(token).build());
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgot(@RequestBody AuthDtos.EmailRequest request) {
        var user = userService.findByEmailOrThrow(request.getEmail());
        var reset = authService.createResetToken(user);
        return ResponseEntity.ok(AuthDtos.ResetInitiatedResponse.builder().resetToken(reset.getToken()).build());
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> reset(@RequestBody AuthDtos.ResetPasswordRequest request) {
        var user = userService.findByEmailOrThrow(request.getEmail());
        var updated = authService.resetPassword(request.getToken(), userService.encodePassword(request.getNewPassword()));
        return ResponseEntity.ok().build();
    }
}



