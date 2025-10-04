package com.example.gorentals.service;

import com.example.gorentals.entity.Document;
import com.example.gorentals.entity.User;
import com.example.gorentals.repository.DocumentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DocumentService {
    private final DocumentRepository documentRepository;

    @Value("${app.upload.dir:uploads}")
    private String uploadDir;

    public List<Document> findByUser(User user) { return documentRepository.findByUser(user); }

    @Transactional
    public Document upload(User user, MultipartFile file) throws IOException {
        Files.createDirectories(Paths.get(uploadDir));
        String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path dest = Paths.get(uploadDir, filename);
        file.transferTo(dest);
        Document doc = Document.builder()
                .user(user)
                .name(file.getOriginalFilename())
                .url("/uploads/" + filename)
                .build();
        return documentRepository.save(doc);
    }
}

