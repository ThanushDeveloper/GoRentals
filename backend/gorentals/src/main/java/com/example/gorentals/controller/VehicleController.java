package com.example.gorentals.controller;

import com.example.gorentals.entity.Vehicle;
import com.example.gorentals.service.VehicleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
@RequiredArgsConstructor
public class VehicleController {

    private final VehicleService vehicleService;

    @GetMapping
    public ResponseEntity<List<Vehicle>> list(
            @RequestParam(required = false) String type,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) Integer seats,
            @RequestParam(required = false) String transmission
    ) {
        return ResponseEntity.ok(vehicleService.getAll(type, minPrice, maxPrice, seats, transmission));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vehicle> get(@PathVariable Long id) {
        return ResponseEntity.ok(vehicleService.getById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Vehicle> create(@RequestBody Vehicle v) {
        return ResponseEntity.ok(vehicleService.create(v));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Vehicle> update(@PathVariable Long id, @RequestBody Vehicle v) {
        return ResponseEntity.ok(vehicleService.update(id, v));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        vehicleService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // Image endpoints placeholders; implement with DocumentService or dedicated storage
    @PostMapping("/{id}/images")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Vehicle> uploadImage(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        Vehicle v = vehicleService.getById(id);
        v.getImageUrls().add("/uploads/" + file.getOriginalFilename());
        return ResponseEntity.ok(vehicleService.update(id, v));
    }

    @DeleteMapping("/{id}/images")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Vehicle> deleteImage(@PathVariable Long id, @RequestParam String url) {
        Vehicle v = vehicleService.getById(id);
        v.getImageUrls().remove(url);
        return ResponseEntity.ok(vehicleService.update(id, v));
    }
}

