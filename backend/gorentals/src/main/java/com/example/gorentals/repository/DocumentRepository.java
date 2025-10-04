package com.example.gorentals.repository;

import com.example.gorentals.entity.Document;
import com.example.gorentals.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DocumentRepository extends JpaRepository<Document, Long> {
    List<Document> findByUser(User user);
}
