package com.eventra.controller;

import com.eventra.model.ExecuteRequest;
import com.eventra.model.ExecuteResponse;
import com.eventra.model.TriggerRequest;
import com.eventra.service.InterpreterService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

/**
 * ==================================================
 * EVENTRA Runtime API Controller
 * --------------------------------------------------
 * REST API layer for EVENTRA Runtime Engine
 * ==================================================
 */

@RestController
@RequestMapping("/api")
public class RunController {

    @Autowired
    private InterpreterService interpreterService;

    // ==========================================
    // RUN EVENTRA CODE
    // ==========================================

    @PostMapping("/run")
    public ResponseEntity<ExecuteResponse> runCode(
            @RequestBody ExecuteRequest request
    ) {

        long startTime =
                System.currentTimeMillis();

        try {

            String code =
                    request.getCode();

            // Validation
            if (
                    code == null
                    ||
                    code.trim().isEmpty()
            ) {

                return ResponseEntity
                        .badRequest()
                        .body(

                                new ExecuteResponse(
                                        "",
                                        false,
                                        "No EVENTRA code provided"
                                )
                        );
            }

            // Execute code
            String output =
                    interpreterService
                            .executeCode(code);

            long endTime =
                    System.currentTimeMillis();

            ExecuteResponse response =
                    new ExecuteResponse(
                            output,
                            true
                    );

            // Optional metadata
            response.setExecutionTimeMs(
                    endTime - startTime
            );

            response.setTimestamp(
                    LocalDateTime.now()
            );

            return ResponseEntity.ok(
                    response
            );
        }

        catch (Exception e) {

            // PRINT REAL ERROR
            e.printStackTrace();

            ExecuteResponse errorResponse =
                    new ExecuteResponse(
                            "",
                            false,
                            e.getMessage()
                    );

            errorResponse.setTimestamp(
                    LocalDateTime.now()
            );

            return ResponseEntity
                    .internalServerError()
                    .body(errorResponse);
        }
    }

    // ==========================================
    // TRIGGER EVENT
    // ==========================================

    @PostMapping("/trigger")
    public ResponseEntity<Map<String, Object>>
    triggerEvent(
            @RequestBody TriggerRequest request
    ) {

        try {

            String eventName =
                    request.getEventName();

            String code =
                    request.getCode();

            // Validation
            if (
                    eventName == null
                    ||
                    eventName.trim().isEmpty()
            ) {

                return buildErrorResponse(
                        "No event name provided"
                );
            }

            if (
                    code == null
                    ||
                    code.trim().isEmpty()
            ) {

                return buildErrorResponse(
                        "No EVENTRA code provided"
                );
            }

            // Trigger event
            String output =
                    interpreterService
                            .triggerEvent(
                                    code,
                                    eventName
                            );

            Map<String, Object> response =
                    new HashMap<>();

            response.put(
                    "success",
                    true
            );

            response.put(
                    "event",
                    eventName
            );

            response.put(
                    "output",
                    output
            );

            response.put(
                    "timestamp",
                    LocalDateTime.now()
                            .toString()
            );

            return ResponseEntity.ok(
                    response
            );
        }

        catch (Exception e) {

            // PRINT REAL ERROR
            e.printStackTrace();

            return buildErrorResponse(
                    e.getMessage()
            );
        }
    }

    // ==========================================
    // GET EVENTS
    // ==========================================

    @PostMapping("/events")
    public ResponseEntity<Map<String, Object>>
    getEvents(
            @RequestBody ExecuteRequest request
    ) {

        try {

            String code =
                    request.getCode();

            // Validation
            if (
                    code == null
                    ||
                    code.trim().isEmpty()
            ) {

                return buildErrorResponse(
                        "No EVENTRA code provided"
                );
            }

            // Extract events
            Set<String> events =
                    interpreterService
                            .getDefinedEvents(code);

            Map<String, Object> response =
                    new HashMap<>();

            response.put(
                    "success",
                    true
            );

            response.put(
                    "events",
                    events
            );

            response.put(
                    "count",
                    events.size()
            );

            response.put(
                    "timestamp",
                    LocalDateTime.now()
                            .toString()
            );

            return ResponseEntity.ok(
                    response
            );
        }

        catch (Exception e) {

            // PRINT REAL ERROR
            e.printStackTrace();

            return buildErrorResponse(
                    e.getMessage()
            );
        }
    }

    // ==========================================
    // COMMON ERROR RESPONSE
    // ==========================================

    private ResponseEntity<Map<String, Object>>
    buildErrorResponse(
            String errorMessage
    ) {

        Map<String, Object> error =
                new HashMap<>();

        error.put(
                "success",
                false
        );

        error.put(
                "error",
                errorMessage
        );

        error.put(
                "timestamp",
                LocalDateTime.now()
                        .toString()
        );

        return ResponseEntity
                .badRequest()
                .body(error);
    }
}
