package com.eventra.model;

/**
 * Request model for triggering events
 * Contains event name and the code context
 */
public class TriggerRequest {
    private String eventName;
    private String code;

    // Default constructor
    public TriggerRequest() {
    }

    // Constructor with parameters
    public TriggerRequest(String eventName, String code) {
        this.eventName = eventName;
        this.code = code;
    }

    // Getters and Setters
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
}
