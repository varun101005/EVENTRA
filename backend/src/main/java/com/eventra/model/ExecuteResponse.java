package com.eventra.model;

import java.time.LocalDateTime;

/**
 * ExecuteResponse
 * -----------------------------------
 * Response model returned after EVENTRA
 * runtime execution.
 */

public class ExecuteResponse {

    private String output;

    private boolean success;

    private String error;

    private LocalDateTime timestamp;

    private long executionTimeMs;

    // =========================
    // CONSTRUCTORS
    // =========================

    public ExecuteResponse() {

        this.timestamp = LocalDateTime.now();
    }

    public ExecuteResponse(
            String output,
            boolean success
    ) {

        this.output = output;
        this.success = success;
        this.timestamp = LocalDateTime.now();
    }

    public ExecuteResponse(
            String output,
            boolean success,
            String error
    ) {

        this.output = output;
        this.success = success;
        this.error = error;
        this.timestamp = LocalDateTime.now();
    }

    // =========================
    // GETTERS & SETTERS
    // =========================

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

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public long getExecutionTimeMs() {
        return executionTimeMs;
    }

    public void setExecutionTimeMs(long executionTimeMs) {
        this.executionTimeMs = executionTimeMs;
    }

    @Override
    public String toString() {

        return "ExecuteResponse{" +
                "success=" + success +
                ", executionTimeMs=" + executionTimeMs +
                ", timestamp=" + timestamp +
                '}';
    }
}