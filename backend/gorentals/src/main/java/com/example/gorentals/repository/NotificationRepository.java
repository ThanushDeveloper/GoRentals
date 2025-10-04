package com.example.gorentals.repository;

import com.example.gorentals.entity.Notification;
import com.example.gorentals.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByUserOrUserIsNullOrderByCreatedAtDesc(User user);
}
