package com.example.gorentals.service;

import com.example.gorentals.entity.Booking;
import com.example.gorentals.entity.Payment;
import com.example.gorentals.entity.enums.PaymentStatus;
import com.example.gorentals.repository.BookingRepository;
import com.example.gorentals.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class PaymentService {
    private final PaymentRepository paymentRepository;
    private final BookingRepository bookingRepository;

    @Transactional
    public Payment makePayment(Long bookingId, BigDecimal amount, String method) {
        Booking b = bookingRepository.findById(bookingId).orElseThrow();
        Payment p = Payment.builder()
                .booking(b)
                .amount(amount)
                .method(method)
                .status(PaymentStatus.PENDING)
                .createdAt(LocalDateTime.now())
                .build();
        return paymentRepository.save(p);
    }

    @Transactional
    public Payment approve(Long id) {
        Payment p = paymentRepository.findById(id).orElseThrow();
        p.setStatus(PaymentStatus.APPROVED);
        return paymentRepository.save(p);
    }

    @Transactional
    public Payment reject(Long id) {
        Payment p = paymentRepository.findById(id).orElseThrow();
        p.setStatus(PaymentStatus.REJECTED);
        return paymentRepository.save(p);
    }
}

