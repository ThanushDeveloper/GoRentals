package com.example.gorentals.controller;

import com.example.gorentals.entity.Payment;
import com.example.gorentals.service.PaymentService;
import com.example.gorentals.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;
    private final PaymentRepository paymentRepository;

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Payment> pay(@RequestParam Long bookingId, @RequestParam BigDecimal amount, @RequestParam String method) {
        return ResponseEntity.ok(paymentService.makePayment(bookingId, amount, method));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<Payment> get(@PathVariable Long id) {
        return ResponseEntity.ok(paymentRepository.findById(id).orElseThrow());
    }

    @PostMapping("/{id}/approve")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Payment> approve(@PathVariable Long id) {
        return ResponseEntity.ok(paymentService.approve(id));
    }

    @PostMapping("/{id}/reject")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Payment> reject(@PathVariable Long id) {
        return ResponseEntity.ok(paymentService.reject(id));
    }
}
