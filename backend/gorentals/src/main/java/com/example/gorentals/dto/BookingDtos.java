package com.example.gorentals.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

public class BookingDtos {

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateBookingRequest {
        private Long rentalId;
        private LocalDate startDate;
        private LocalDate endDate;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class BookingResponse {
        private Long id;
        private Long rentalId;
        private String rentalTitle;
        private String rentalImageUrl;
        private Long userId;
        private LocalDate startDate;
        private LocalDate endDate;
        private BigDecimal totalPrice;
        private String status;
    }
}
