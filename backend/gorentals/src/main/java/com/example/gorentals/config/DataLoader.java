package com.example.gorentals.config;

import com.example.gorentals.entity.Rental;
import com.example.gorentals.entity.User;
import com.example.gorentals.repository.RentalRepository;
import com.example.gorentals.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

@Component
@RequiredArgsConstructor
@Profile({"default"})
public class DataLoader implements ApplicationRunner {

    private final RentalRepository rentalRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(ApplicationArguments args) {
        if (userRepository.count() == 0) {
            User admin = User.builder()
                    .name("Admin")
                    .email("admin@gorentals.com")
                    .passwordHash(passwordEncoder.encode("admin123"))
                    .roles(Set.of("ROLE_ADMIN", "ROLE_USER"))
                    .build();
            User user = User.builder()
                    .name("Demo User")
                    .email("user@gorentals.com")
                    .passwordHash(passwordEncoder.encode("user123"))
                    .roles(Set.of("ROLE_USER"))
                    .build();
            userRepository.saveAll(List.of(admin, user));
        }

        if (rentalRepository.count() == 0) {
            rentalRepository.saveAll(List.of(
                    Rental.builder().title("Toyota Corolla").description("Reliable sedan").pricePerDay(new BigDecimal("30"))
                            .imageUrl("/assets/cars/corolla.jpg").build(),
                    Rental.builder().title("Honda Civic").description("Fuel efficient").pricePerDay(new BigDecimal("35"))
                            .imageUrl("/assets/cars/civic.jpg").build(),
                    Rental.builder().title("Ford Explorer").description("Spacious SUV").pricePerDay(new BigDecimal("50"))
                            .imageUrl("/assets/cars/explorer.jpg").build()
            ));
        }
    }
}
