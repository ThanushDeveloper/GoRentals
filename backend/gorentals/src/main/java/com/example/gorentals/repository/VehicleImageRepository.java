package com.example.gorentals.repository;

import com.example.gorentals.entity.Vehicle;
import com.example.gorentals.entity.VehicleImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VehicleImageRepository extends JpaRepository<VehicleImage, Long> {
    List<VehicleImage> findByVehicle(Vehicle vehicle);
}