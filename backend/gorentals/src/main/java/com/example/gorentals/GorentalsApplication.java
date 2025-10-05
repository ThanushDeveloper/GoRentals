package com.example.gorentals;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import com.example.gorentals.entity.User;
import com.example.gorentals.entity.Vehicle;
import com.example.gorentals.repository.UserRepository;
import com.example.gorentals.repository.VehicleRepository;
import java.math.BigDecimal;
import java.util.HashSet;

@SpringBootApplication
public class GorentalsApplication {

	public static void main(String[] args) {
		SpringApplication.run(GorentalsApplication.class, args);
	}

	@Bean
	CommandLineRunner seedData(UserRepository users, VehicleRepository vehicles, org.springframework.security.crypto.password.PasswordEncoder encoder) {
		return args -> {
			if (users.count() == 0) {
				var adminRoles = new HashSet<String>();
				adminRoles.add("ROLE_ADMIN");
				adminRoles.add("ROLE_USER");
				users.save(User.builder()
						.name("Admin")
						.email("admin@gmail.com")
						.passwordHash(encoder.encode("admin@1234"))
						.roles(adminRoles)
						.build());

				var userRoles = new HashSet<String>();
				userRoles.add("ROLE_USER");
				users.save(User.builder()
						.name("John Doe")
						.email("user@gmail.com")
						.passwordHash(encoder.encode("user@1234"))
						.roles(userRoles)
						.build());
			}

			if (vehicles.count() == 0) {
				vehicles.save(Vehicle.builder()
						.make("Toyota").model("Corolla").year(2022).type("Sedan")
						.pricePerDay(new BigDecimal("2200"))
						.registrationNumber("KA01AB1234")
						.seats(5).transmission("Automatic").fuelType("Petrol")
						.description("Comfortable sedan ideal for city rides.")
						.build());
				vehicles.save(Vehicle.builder()
						.make("Honda").model("City").year(2023).type("Sedan")
						.pricePerDay(new BigDecimal("2500"))
						.registrationNumber("KA02CD5678")
						.seats(5).transmission("Manual").fuelType("Diesel")
						.description("Spacious sedan with great mileage.")
						.build());
				vehicles.save(Vehicle.builder()
						.make("Mahindra").model("XUV700").year(2024).type("SUV")
						.pricePerDay(new BigDecimal("3800"))
						.registrationNumber("KA03EF9012")
						.seats(7).transmission("Automatic").fuelType("Petrol")
						.description("Premium SUV perfect for family trips.")
						.build());
			}
		};
	}

}

