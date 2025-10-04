package com.example.gorentals.controller;

import com.example.gorentals.entity.Document;
import com.example.gorentals.entity.User;
import com.example.gorentals.service.DocumentService;
import com.example.gorentals.service.UserService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final DocumentService documentService;

    @GetMapping("/me")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<User> me(@AuthenticationPrincipal UserDetails principal) {
        return ResponseEntity.ok(userService.findByEmailOrThrow(principal.getUsername()));
    }

    @PutMapping("/me")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<User> update(@AuthenticationPrincipal UserDetails principal, @RequestBody UpdateProfileRequest req) {
        User me = userService.findByEmailOrThrow(principal.getUsername());
        return ResponseEntity.ok(userService.updateProfile(me.getId(), req.getName()));
    }

    @PostMapping("/me/documents")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Document> upload(@AuthenticationPrincipal UserDetails principal, @RequestParam("file") MultipartFile file) throws IOException {
        User me = userService.findByEmailOrThrow(principal.getUsername());
        return ResponseEntity.ok(documentService.upload(me, file));
    }

    @GetMapping("/me/documents")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<Document>> myDocs(@AuthenticationPrincipal UserDetails principal) {
        User me = userService.findByEmailOrThrow(principal.getUsername());
        return ResponseEntity.ok(documentService.findByUser(me));
    }

    @Data
    public static class UpdateProfileRequest { private String name; }
}

