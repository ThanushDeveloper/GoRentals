package com.example.gorentals.controller;

import com.example.gorentals.entity.Rental;
import com.example.gorentals.repository.RentalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
@RequiredArgsConstructor
public class VehicleController {

    private final RentalRepository rentalRepository;

    @GetMapping
    public ResponseEntity<List<Rental>> getAllVehicles() {
        return ResponseEntity.ok(rentalRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Rental> getVehicle(@PathVariable Long id) {
        return rentalRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Rental> createVehicle(@RequestBody Rental vehicle) {
        return ResponseEntity.ok(rentalRepository.save(vehicle));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Rental> updateVehicle(@PathVariable Long id, @RequestBody Rental updated) {
        return rentalRepository.findById(id)
                .map(existing -> {
                    existing.setTitle(updated.getTitle());
                    existing.setDescription(updated.getDescription());
                    existing.setPricePerDay(updated.getPricePerDay());
                    existing.setImageUrl(updated.getImageUrl());
                    return ResponseEntity.ok(rentalRepository.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteVehicle(@PathVariable Long id) {
        if (!rentalRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        rentalRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
