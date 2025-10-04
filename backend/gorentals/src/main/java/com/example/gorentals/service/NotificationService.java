package com.example.gorentals.service;

import com.example.gorentals.entity.Notification;
import com.example.gorentals.entity.User;
import com.example.gorentals.entity.enums.NotificationType;
import com.example.gorentals.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepository notificationRepository;

    public List<Notification> getForUserOrBroadcast(User user) {
        return notificationRepository.findByUserOrUserIsNullOrderByCreatedAtDesc(user);
    }

    @Transactional
    public Notification create(User user, String message, NotificationType type) {
        Notification n = Notification.builder()
                .user(user)
                .message(message)
                .type(type)
                .read(false)
                .createdAt(LocalDateTime.now())
                .build();
        return notificationRepository.save(n);
    }

    @Transactional
    public Notification markRead(Long id) {
        Notification n = notificationRepository.findById(id).orElseThrow();
        n.setRead(true);
        return notificationRepository.save(n);
    }
}

