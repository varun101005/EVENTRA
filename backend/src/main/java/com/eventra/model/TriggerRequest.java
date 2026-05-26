package com.eventra.model;

import jakarta.validation.constraints.NotBlank;

/**
 * TriggerRequest
 * -----------------------------------
 * Request model used for triggering
 * runtime events in EVENTRA.
 */

public class TriggerRequest {

    @NotBlank(message = "Event name is required")
    private String eventName;

    @NotBlank(message = "Code cannot be empty")
    private String code;

    // Optional event priority
    private int priority = 1;

    // =========================
    // CONSTRUCTORS
    // =========================

    public TriggerRequest() {
    }

    public TriggerRequest(
            String eventName,
            String code
    ) {

        this.eventName = eventName;
        this.code = code;
    }

    public TriggerRequest(
            String eventName,
            String code,
            int priority
    ) {

        this.eventName = eventName;
        this.code = code;
        this.priority = priority;
    }

    // =========================
    // GETTERS & SETTERS
    // =========================

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public int getPriority() {
        return priority;
    }

    public void setPriority(int priority) {
        this.priority = priority;
    }

    @Override
    public String toString() {

        return "TriggerRequest{" +
                "eventName='" + eventName + '\'' +
                ", priority=" + priority +
                '}';
    }
}
