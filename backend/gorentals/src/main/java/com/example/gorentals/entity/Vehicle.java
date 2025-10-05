package com.example.gorentals.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "vehicles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String make;

    @Column(nullable = false)
    private String model;

    private int year;

    @Column(nullable = false)
    private String type; // SUV, Sedan, etc

    @Column(nullable = false)
    private BigDecimal pricePerDay;

    private String registrationNumber;

    @Builder.Default
    private boolean available = true;

    private LocalDate availableFrom;

    @Column(length = 1000)
    private String description;

    private Integer seats;

    private String transmission; // Automatic/Manual

    private String fuelType;

    @Transient
    @Builder.Default
    private List<String> imageUrls = new ArrayList<>();
}
