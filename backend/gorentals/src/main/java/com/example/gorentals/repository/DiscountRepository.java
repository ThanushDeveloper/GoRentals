package com.example.gorentals.repository;

import com.example.gorentals.entity.Discount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DiscountRepository extends JpaRepository<Discount, Long> {
    Optional<Discount> findByCodeAndActiveTrue(String code);
}
