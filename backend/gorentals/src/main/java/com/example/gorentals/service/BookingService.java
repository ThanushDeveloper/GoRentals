package com.example.gorentals.service;

import com.example.gorentals.entity.*;
import com.example.gorentals.entity.enums.RentalStatus;
import com.example.gorentals.repository.BookingRepository;
import com.example.gorentals.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingService {
    private final BookingRepository bookingRepository;
    private final VehicleRepository vehicleRepository;

    public List<Booking> findByUser(User user) { return bookingRepository.findByUser(user); }
    public List<Booking> findByVehicle(Vehicle vehicle) { return bookingRepository.findByVehicle(vehicle); }

    @Transactional
    public Booking create(User user, Vehicle vehicle, java.time.LocalDate start, java.time.LocalDate end) {
        long days = ChronoUnit.DAYS.between(start, end);
        if (days <= 0) throw new IllegalArgumentException("Invalid dates");
        BigDecimal total = vehicle.getPricePerDay().multiply(BigDecimal.valueOf(days));
        Booking booking = Booking.builder()
                .user(user)
                .vehicle(vehicle)
                .startDate(start)
                .endDate(end)
                .status(RentalStatus.ACTIVE)
                .totalAmount(total)
                .build();
        return bookingRepository.save(booking);
    }

    @Transactional
    public Booking cancel(Long id) {
        Booking b = bookingRepository.findById(id).orElseThrow();
        b.setStatus(RentalStatus.CANCELLED);
        return bookingRepository.save(b);
    }

    @Transactional
    public Booking extend(Long id, java.time.LocalDate newEndDate) {
        Booking b = bookingRepository.findById(id).orElseThrow();
        long days = ChronoUnit.DAYS.between(b.getStartDate(), newEndDate);
        if (days <= 0) throw new IllegalArgumentException("Invalid extension");
        b.setEndDate(newEndDate);
        BigDecimal total = b.getVehicle().getPricePerDay().multiply(BigDecimal.valueOf(days));
        b.setTotalAmount(total);
        return bookingRepository.save(b);
    }
}