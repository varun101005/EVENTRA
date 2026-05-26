package com.eventra.model;

import jakarta.validation.constraints.NotBlank;

/**
 * ExecuteRequest
 * -----------------------------------
 * Request model used for EVENTRA code execution.
 * Sent from frontend to interpreter runtime.
 */

public class ExecuteRequest {

    @NotBlank(message = "Code cannot be empty")
    private String code;

    // Optional runtime mode
    private String executionMode = "INTERPRET";

    // =========================
    // CONSTRUCTORS
    // =========================

    public ExecuteRequest() {
    }

    public ExecuteRequest(String code) {
        this.code = code;
    }

    public ExecuteRequest(String code, String executionMode) {
        this.code = code;
        this.executionMode = executionMode;
    }

    // =========================
    // GETTERS & SETTERS
    // =========================

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getExecutionMode() {
        return executionMode;
    }

    public void setExecutionMode(String executionMode) {
        this.executionMode = executionMode;
    }

    @Override
    public String toString() {
        return "ExecuteRequest{" +
                "executionMode='" + executionMode + '\'' +
                ", codeLength=" + (code != null ? code.length() : 0) +
                '}';
    }
}