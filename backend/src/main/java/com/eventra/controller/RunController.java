package com.eventra.controller;

import com.eventra.model.ExecuteRequest;
import com.eventra.model.ExecuteResponse;
import com.eventra.model.TriggerRequest;
import com.eventra.service.InterpreterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

/**
 * REST API Controller for EVENTRA
 * Provides endpoints for running code and triggering events
 */
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000") // Allow frontend requests
public class RunController {
    
    @Autowired
    private InterpreterService interpreterService;
    
    /**
     * POST /api/run
     * Execute EVENTRA code and return output
     */
    @PostMapping("/run")
    public ResponseEntity<ExecuteResponse> runCode(@RequestBody ExecuteRequest request) {
        try {
            String code = request.getCode();
            
            if (code == null || code.trim().isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(new ExecuteResponse("Error: No code provided", false));
            }
            
            // Execute the code
            String output = interpreterService.executeCode(code);
            
            return ResponseEntity.ok(new ExecuteResponse(output, true));
            
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(new ExecuteResponse("", false, e.getMessage()));
        }
    }
    
    /**
     * POST /api/trigger
     * Trigger a specific event in the code
     */
    @PostMapping("/trigger")
    public ResponseEntity<Map<String, Object>> triggerEvent(@RequestBody TriggerRequest request) {
        try {
            String eventName = request.getEventName();
            String code = request.getCode();
            
            if (eventName == null || eventName.trim().isEmpty()) {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("output", "Error: No event name provided");
                errorResponse.put("success", false);
                return ResponseEntity.badRequest().body(errorResponse);
            }
            
            if (code == null || code.trim().isEmpty()) {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("output", "Error: No code provided");
                errorResponse.put("success", false);
                return ResponseEntity.badRequest().body(errorResponse);
            }
            
            // Trigger the event
            String output = interpreterService.triggerEvent(code, eventName);
            
            Map<String, Object> response = new HashMap<>();
            response.put("output", output);
            response.put("success", true);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("output", "");
            errorResponse.put("success", false);
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.internalServerError().body(errorResponse);
        }
    }
    
    /**
     * POST /api/events
     * Get all defined events from code
     */
    @PostMapping("/events")
    public ResponseEntity<Map<String, Object>> getEvents(@RequestBody ExecuteRequest request) {
        try {
            String code = request.getCode();
            
            if (code == null || code.trim().isEmpty()) {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("events", new java.util.ArrayList<>());
                errorResponse.put("success", false);
                return ResponseEntity.badRequest().body(errorResponse);
            }
            
            // Get defined events
            Set<String> events = interpreterService.getDefinedEvents(code);
            
            Map<String, Object> response = new HashMap<>();
            response.put("events", events);
            response.put("success", true);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("events", new java.util.ArrayList<>());
            errorResponse.put("success", false);
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.internalServerError().body(errorResponse);
        }
    }
}
