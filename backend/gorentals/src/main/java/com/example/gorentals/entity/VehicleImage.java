package com.example.gorentals.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Entity
@Table(name = "vehicle_images")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VehicleImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "vehicle_id")
    private Vehicle vehicle;

    @Lob
    @Basic(fetch = FetchType.LAZY)
    @Column(name = "data", columnDefinition = "LONGBLOB")
    private byte[] data;

    @Column(name = "content_type", length = 100)
    private String contentType;

    @Column(name = "file_name", length = 255)
    private String fileName;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt;
}