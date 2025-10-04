package com.example.gorentals.controller;

import com.example.gorentals.entity.Booking;
import com.example.gorentals.entity.User;
import com.example.gorentals.entity.Vehicle;
import com.example.gorentals.service.BookingService;
import com.example.gorentals.service.UserService;
import com.example.gorentals.service.VehicleService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;
    private final VehicleService vehicleService;
    private final UserService userService;

    @GetMapping("/me")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<Booking>> myBookings(@AuthenticationPrincipal UserDetails principal) {
        User user = userService.findByEmailOrThrow(principal.getUsername());
        return ResponseEntity.ok(bookingService.findByUser(user));
    }

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Booking> create(
            @AuthenticationPrincipal UserDetails principal,
            @RequestParam Long vehicleId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate
    ) {
        User user = userService.findByEmailOrThrow(principal.getUsername());
        Vehicle v = vehicleService.getById(vehicleId);
        return ResponseEntity.ok(bookingService.create(user, v, startDate, endDate));
    }

    @PostMapping("/{id}/cancel")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Booking> cancel(@PathVariable Long id) {
        return ResponseEntity.ok(bookingService.cancel(id));
    }

    @PostMapping("/{id}/extend")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Booking> extend(@PathVariable Long id,
                                          @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate newEndDate) {
        return ResponseEntity.ok(bookingService.extend(id, newEndDate));
    }
}
