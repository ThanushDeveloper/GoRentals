package com.example.gorentals.controller;

import com.example.gorentals.entity.Vehicle;
import com.example.gorentals.service.VehicleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.http.MediaType;
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
        List<Vehicle> vehicles = vehicleService.getAll(type, minPrice, maxPrice, seats, transmission);
        vehicles.forEach(v -> {
            var urls = vehicleService.getImages(v).stream()
                    .map(img -> "/api/vehicles/images/" + img.getId())
                    .toList();
            v.setImageUrls(urls);
        });
        return ResponseEntity.ok(vehicles);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vehicle> get(@PathVariable Long id) {
        Vehicle v = vehicleService.getById(id);
        var urls = vehicleService.getImages(v).stream().map(img -> "/api/vehicles/images/" + img.getId()).toList();
        v.setImageUrls(urls);
        return ResponseEntity.ok(v);
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

    @PostMapping("/{id}/images")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> uploadImage(@PathVariable Long id, @RequestParam("file") MultipartFile file) throws Exception {
        Vehicle v = vehicleService.getById(id);
        vehicleService.addImage(v, file.getOriginalFilename(), file.getContentType(), file.getBytes());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/images/batch")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> uploadImages(@PathVariable Long id, @RequestParam("files") List<MultipartFile> files) throws Exception {
        Vehicle v = vehicleService.getById(id);
        for (MultipartFile file : files) {
            vehicleService.addImage(v, file.getOriginalFilename(), file.getContentType(), file.getBytes());
        }
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}/images")
    public ResponseEntity<List<Long>> listImages(@PathVariable Long id) {
        Vehicle v = vehicleService.getById(id);
        List<Long> ids = vehicleService.getImages(v).stream().map(img -> img.getId()).toList();
        return ResponseEntity.ok(ids);
    }

    @GetMapping(value = "/images/{imageId}")
    public ResponseEntity<byte[]> getImageBytes(@PathVariable Long imageId) {
        var img = vehicleService.getImageById(imageId);
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(img.getContentType() != null ? img.getContentType() : MediaType.IMAGE_JPEG_VALUE))
                .body(img.getData());
    }
}

