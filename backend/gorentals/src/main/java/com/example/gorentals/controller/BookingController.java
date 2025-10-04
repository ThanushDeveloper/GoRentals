package com.example.gorentals.controller;

import com.example.gorentals.dto.BookingDtos;
import com.example.gorentals.entity.Booking;
import com.example.gorentals.entity.Rental;
import com.example.gorentals.entity.User;
import com.example.gorentals.repository.BookingRepository;
import com.example.gorentals.repository.RentalRepository;
import com.example.gorentals.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingRepository bookingRepository;
    private final RentalRepository rentalRepository;
    private final UserService userService;

    @PostMapping
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<BookingDtos.BookingResponse> createBooking(
            @RequestBody BookingDtos.CreateBookingRequest request,
            Authentication authentication
    ) {
        User user = userService.findByEmailOrThrow(authentication.getName());
        Rental rental = rentalRepository.findById(request.getRentalId())
                .orElseThrow(() -> new IllegalArgumentException("Vehicle not found"));
        long days = ChronoUnit.DAYS.between(request.getStartDate(), request.getEndDate());
        if (days <= 0) {
            throw new IllegalArgumentException("End date must be after start date");
        }
        BigDecimal total = rental.getPricePerDay().multiply(BigDecimal.valueOf(days));
        Booking booking = Booking.builder()
                .user(user)
                .rental(rental)
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .totalPrice(total)
                .status("CONFIRMED")
                .build();
        booking = bookingRepository.save(booking);
        return ResponseEntity.ok(toResponse(booking));
    }

    @GetMapping("/my")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<List<BookingDtos.BookingResponse>> myBookings(Authentication authentication) {
        User user = userService.findByEmailOrThrow(authentication.getName());
        List<BookingDtos.BookingResponse> data = bookingRepository.findByUserId(user.getId()).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(data);
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<BookingDtos.BookingResponse>> allBookings() {
        List<BookingDtos.BookingResponse> data = bookingRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(data);
    }

    private BookingDtos.BookingResponse toResponse(Booking booking) {
        return BookingDtos.BookingResponse.builder()
                .id(booking.getId())
                .rentalId(booking.getRental().getId())
                .rentalTitle(booking.getRental().getTitle())
                .rentalImageUrl(booking.getRental().getImageUrl())
                .userId(booking.getUser().getId())
                .startDate(booking.getStartDate())
                .endDate(booking.getEndDate())
                .totalPrice(booking.getTotalPrice())
                .status(booking.getStatus())
                .build();
    }
}
