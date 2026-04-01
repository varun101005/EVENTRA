package com.eventra;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main application class for EVENTRA
 * Event-driven programming language interpreter with Spring Boot backend
 */
@SpringBootApplication
public class EventraApplication {

    public static void main(String[] args) {
        SpringApplication.run(EventraApplication.class, args);
        System.out.println("EVENTRA Backend Started Successfully!");
    }
}
