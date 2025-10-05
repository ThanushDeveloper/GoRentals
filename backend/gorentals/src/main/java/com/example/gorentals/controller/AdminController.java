package com.example.gorentals.controller;

import com.example.gorentals.entity.*;
import com.example.gorentals.entity.enums.PaymentStatus;
import com.example.gorentals.entity.enums.RentalStatus;
import com.example.gorentals.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final UserRepository userRepository;
    private final VehicleRepository vehicleRepository;
    private final BookingRepository bookingRepository;
    private final PaymentRepository paymentRepository;

    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> dashboard() {
        long users = userRepository.count();
        long vehicles = vehicleRepository.count();
        long bookings = bookingRepository.count();
        long payments = paymentRepository.count();
        return ResponseEntity.ok(Map.of(
                "users", users,
                "vehicles", vehicles,
                "bookings", bookings,
                "payments", payments
        ));
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> users() { return ResponseEntity.ok(userRepository.findAll()); }

    @GetMapping("/payments")
    public ResponseEntity<List<Payment>> payments() { return ResponseEntity.ok(paymentRepository.findAll()); }

    @PutMapping("/payments/{id}/status")
    public ResponseEntity<Payment> updatePaymentStatus(@PathVariable Long id, @RequestParam PaymentStatus status) {
        Payment p = paymentRepository.findById(id).orElseThrow();
        p.setStatus(status);
        return ResponseEntity.ok(paymentRepository.save(p));
    }

    @GetMapping("/bookings")
    public ResponseEntity<List<Booking>> bookings() { return ResponseEntity.ok(bookingRepository.findAll()); }

    @PutMapping("/bookings/{id}/status")
    public ResponseEntity<Booking> updateBookingStatus(@PathVariable Long id, @RequestParam RentalStatus status) {
        Booking b = bookingRepository.findById(id).orElseThrow();
        b.setStatus(status);
        return ResponseEntity.ok(bookingRepository.save(b));
    }
}
