package com.eventra.model;

/**
 * Request model for code execution
 * Contains the EVENTRA code to be executed
 */
public class ExecuteRequest {
    private String code;

    // Default constructor
    public ExecuteRequest() {
    }

    // Constructor with parameters
    public ExecuteRequest(String code) {
        this.code = code;
    }

    // Getters and Setters
    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
