package com.example.gorentals.seed;

import com.example.gorentals.entity.Rental;
import com.example.gorentals.entity.User;
import com.example.gorentals.repository.RentalRepository;
import com.example.gorentals.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class DataInitializer implements ApplicationRunner {

    private final RentalRepository rentalRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(ApplicationArguments args) {
        if (rentalRepository.count() == 0) {
            rentalRepository.saveAll(List.of(
                    Rental.builder().title("Compact Car").description("Fuel-efficient city car").pricePerDay(new BigDecimal("35.00")).imageUrl("/images/compact.jpg").build(),
                    Rental.builder().title("SUV").description("Spacious SUV for family trips").pricePerDay(new BigDecimal("65.00")).imageUrl("/images/suv.jpg").build(),
                    Rental.builder().title("Luxury Sedan").description("Premium comfort and performance").pricePerDay(new BigDecimal("120.00")).imageUrl("/images/luxury.jpg").build()
            ));
        }

        userRepository.findByEmail("admin@gorentals.com").orElseGet(() ->
                userRepository.save(User.builder()
                        .name("Admin")
                        .email("admin@gorentals.com")
                        .passwordHash(passwordEncoder.encode("admin123"))
                        .roles(Set.of("ROLE_ADMIN", "ROLE_USER"))
                        .build())
        );
    }
}
