package com.eventra.model;

/**
 * Response model for code execution
 * Contains output, success status, and optional error message
 */
public class ExecuteResponse {
    private String output;
    private boolean success;
    private String error;

    // Default constructor
    public ExecuteResponse() {
    }

    // Constructor with parameters
    public ExecuteResponse(String output, boolean success) {
        this.output = output;
        this.success = success;
    }

    // Constructor with error
    public ExecuteResponse(String output, boolean success, String error) {
        this.output = output;
        this.success = success;
        this.error = error;
    }

    // Getters and Setters
    public String getOutput() {
        return output;
    }

    public void setOutput(String output) {
        this.output = output;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }
}
