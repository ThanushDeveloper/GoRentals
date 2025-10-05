package com.example.gorentals.service;

import com.example.gorentals.entity.PasswordResetToken;
import com.example.gorentals.entity.RefreshToken;
import com.example.gorentals.entity.User;
import com.example.gorentals.repository.PasswordResetTokenRepository;
import com.example.gorentals.repository.RefreshTokenRepository;
import com.example.gorentals.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final UserRepository userRepository;

    @Value("${app.refresh.expiration-hours:168}")
    private int refreshExpirationHours;

    @Value("${app.reset.expiration-mins:30}")
    private int resetExpirationMinutes;

    @Transactional
    public RefreshToken issueRefreshToken(User user) {
        refreshTokenRepository.deleteByUser(user);
        RefreshToken t = RefreshToken.builder()
                .user(user)
                .token(UUID.randomUUID().toString())
                .expiresAt(LocalDateTime.now().plusHours(refreshExpirationHours))
                .revoked(false)
                .build();
        return refreshTokenRepository.save(t);
    }

    public RefreshToken findRefreshTokenOrThrow(String token) {
        return refreshTokenRepository.findByToken(token).orElseThrow();
    }

    @Transactional
    public void revokeRefreshToken(String token) {
        RefreshToken t = refreshTokenRepository.findByToken(token).orElseThrow();
        t.setRevoked(true);
        refreshTokenRepository.save(t);
    }

    @Transactional
    public PasswordResetToken createResetToken(User user) {
        PasswordResetToken t = PasswordResetToken.builder()
                .user(user)
                .token(UUID.randomUUID().toString())
                .expiresAt(LocalDateTime.now().plusMinutes(resetExpirationMinutes))
                .used(false)
                .build();
        return passwordResetTokenRepository.save(t);
    }

    @Transactional
    public User resetPassword(String token, String newPasswordHash) {
        PasswordResetToken t = passwordResetTokenRepository.findByToken(token).orElseThrow();
        if (t.isUsed() || t.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Invalid or expired reset token");
        }
        User user = t.getUser();
        user.setPasswordHash(newPasswordHash);
        t.setUsed(true);
        passwordResetTokenRepository.save(t);
        return userRepository.save(user);
    }
}
