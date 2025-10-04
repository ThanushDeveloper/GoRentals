package com.example.gorentals.repository;

import com.example.gorentals.entity.Booking;
import com.example.gorentals.entity.User;
import com.example.gorentals.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUser(User user);
    List<Booking> findByVehicle(Vehicle vehicle);
}

