package com.example.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class ApiApplication {

    @GetMapping("/health")
    public ApiResponse health() {
        return new ApiResponse("OK", "Spring Boot API");
    }

    public static void main(String[] args) {
        SpringApplication.run(ApiApplication.class, args);
        System.out.println("\n╔════════════════════════════════════════════════════════╗");
        System.out.println("║  Spring Boot API Server running on port 3004           ║");
        System.out.println("║  Endpoints:                                            ║");
        System.out.println("║    GET    /api/items                                   ║");
        System.out.println("║    GET    /api/items/{id}                              ║");
        System.out.println("║    POST   /api/items                                   ║");
        System.out.println("║    PATCH  /api/items/{id}                              ║");
        System.out.println("║    DELETE /api/items/{id}                              ║");
        System.out.println("║    GET    /health                                      ║");
        System.out.println("╚════════════════════════════════════════════════════════╝\n");
    }
}
