package com.example.gorentals.service;

import com.example.gorentals.entity.Vehicle;
import com.example.gorentals.entity.VehicleImage;
import com.example.gorentals.repository.VehicleImageRepository;
import com.example.gorentals.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class VehicleService {
    private final VehicleRepository vehicleRepository;
    private final VehicleImageRepository vehicleImageRepository;

    public List<Vehicle> getAll(String type, BigDecimal minPrice, BigDecimal maxPrice, Integer seats, String transmission) {
        Specification<Vehicle> spec = Specification.where(null);
        if (type != null) spec = spec.and((root, q, cb) -> cb.equal(root.get("type"), type));
        if (minPrice != null) spec = spec.and((root, q, cb) -> cb.greaterThanOrEqualTo(root.get("pricePerDay"), minPrice));
        if (maxPrice != null) spec = spec.and((root, q, cb) -> cb.lessThanOrEqualTo(root.get("pricePerDay"), maxPrice));
        if (seats != null) spec = spec.and((root, q, cb) -> cb.equal(root.get("seats"), seats));
        if (transmission != null) spec = spec.and((root, q, cb) -> cb.equal(root.get("transmission"), transmission));
        return spec == null ? vehicleRepository.findAll() : vehicleRepository.findAll(spec);
    }

    public Vehicle getById(Long id) {
        return vehicleRepository.findById(id).orElseThrow();
    }

    public Vehicle create(Vehicle v) { return vehicleRepository.save(v); }
    public Vehicle update(Long id, Vehicle v) {
        Vehicle existing = getById(id);
        existing.setMake(v.getMake());
        existing.setModel(v.getModel());
        existing.setYear(v.getYear());
        existing.setType(v.getType());
        existing.setPricePerDay(v.getPricePerDay());
        existing.setRegistrationNumber(v.getRegistrationNumber());
        existing.setAvailable(v.isAvailable());
        existing.setAvailableFrom(v.getAvailableFrom());
        existing.setDescription(v.getDescription());
        existing.setSeats(v.getSeats());
        existing.setTransmission(v.getTransmission());
        existing.setFuelType(v.getFuelType());
        return vehicleRepository.save(existing);
    }

    public void delete(Long id) { vehicleRepository.deleteById(id); }

    public VehicleImage addImage(Vehicle vehicle, String fileName, String contentType, byte[] data) {
        VehicleImage image = VehicleImage.builder()
                .vehicle(vehicle)
                .fileName(fileName)
                .contentType(contentType)
                .data(data)
                .createdAt(java.time.Instant.now())
                .build();
        return vehicleImageRepository.save(image);
    }

    public java.util.List<VehicleImage> getImages(Vehicle vehicle) {
        return vehicleImageRepository.findByVehicle(vehicle);
    }

    public void deleteImage(Long imageId) {
        vehicleImageRepository.deleteById(imageId);
    }

    public VehicleImage getImageById(Long imageId) {
        return vehicleImageRepository.findById(imageId).orElseThrow();
    }
}

