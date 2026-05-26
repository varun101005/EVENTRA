package com.eventra.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * ==================================================
 * EVENTRA CORS Configuration
 * ==================================================
 */

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {

        return new WebMvcConfigurer() {

            @Override
            public void addCorsMappings(
                    CorsRegistry registry
            ) {

                registry.addMapping("/api/**")

                        // FRONTEND URL
                        .allowedOrigins(
                                "http://localhost:3000"
                        )

                        // METHODS
                        .allowedMethods(
                                "GET",
                                "POST",
                                "PUT",
                                "DELETE",
                                "OPTIONS"
                        )

                        // HEADERS
                        .allowedHeaders("*")

                        // IMPORTANT
                        .allowCredentials(false);
            }
        };
    }
}