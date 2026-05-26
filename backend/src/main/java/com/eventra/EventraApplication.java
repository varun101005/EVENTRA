package com.eventra;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * EVENTRA Application
 * ---------------------------------------------------
 * Event-Driven Programming Language Runtime
 *
 * Features:
 * - Custom Lexer
 * - Recursive Descent Parser
 * - AST Generation
 * - Runtime Interpreter
 * - Event Triggering System
 * - Spring Boot REST Backend
 */

@SpringBootApplication
public class EventraApplication {

    public static void main(String[] args) {

        long startTime =
                System.currentTimeMillis();

        System.out.println(
                "===================================="
        );

        System.out.println(
                " Starting EVENTRA Runtime Engine..."
        );

        System.out.println(
                "===================================="
        );

        // Start Spring Boot
        SpringApplication.run(
                EventraApplication.class,
                args
        );

        long endTime =
                System.currentTimeMillis();

        System.out.println(
                "\n[SUCCESS] EVENTRA Backend Started"
        );

        System.out.println(
                "[INFO] Runtime Environment Ready"
        );

        System.out.println(
                "[INFO] Spring Boot Server Active"
        );

        System.out.println(
                "[INFO] Initialization Time: "
                        + (endTime - startTime)
                        + " ms"
        );

        System.out.println(
                "===================================="
        );
    }
}