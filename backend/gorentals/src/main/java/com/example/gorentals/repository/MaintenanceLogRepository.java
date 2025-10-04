package com.example.gorentals.repository;

import com.example.gorentals.entity.MaintenanceLog;
import com.example.gorentals.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MaintenanceLogRepository extends JpaRepository<MaintenanceLog, Long> {
    List<MaintenanceLog> findByVehicle(Vehicle vehicle);
}

