package com.eventra.interpreter;

import com.eventra.ast.*;
import java.util.*;

/**
 * Interpreter for EVENTRA programming language
 * Executes AST nodes and manages program state
 */
public class Interpreter implements ASTVisitor {
    private StringBuilder output;
    private Map<String, String> variables;
    private Map<String, List<ASTNode>> eventMap;
    private Queue<String> inputQueue;
    
    /**
     * Constructor
     */
    public Interpreter() {
        this.output = new StringBuilder();
        this.variables = new HashMap<>();
        this.eventMap = new HashMap<>();
        this.inputQueue = new LinkedList<>();
    }
    
    /**
     * Set input values for 'input' statements
     */
    public void setInputValues(List<String> inputs) {
        this.inputQueue = new LinkedList<>(inputs);
    }
    
    /**
     * Interpret a program node
     */
    public String interpret(ProgramNode program) {
        output.setLength(0); // Clear output
        
        // Build event map from all event blocks
        for (EventBlockNode eventBlock : program.getEventBlocks()) {
            eventMap.put(eventBlock.getEventName(), eventBlock.getStatements());
        }
        
        // Automatically trigger 'start' event if it exists
        if (eventMap.containsKey("start")) {
            triggerEvent("start");
        }
        
        return output.toString();
    }
    
    /**
     * Trigger a specific event by name
     */
    public String triggerEvent(String eventName) {
        output.append("Event triggered: ").append(eventName).append("\n");
        
        List<ASTNode> statements = eventMap.get(eventName);
        if (statements == null) {
            output.append("Error: Event '").append(eventName).append("' not found\n");
            return output.toString();
        }
        
        // Execute all statements in the event
        for (ASTNode statement : statements) {
            statement.accept(this);
        }
        
        return output.toString();
    }
    
    /**
     * Get current output
     */
    public String getOutput() {
        return output.toString();
    }
    
    /**
     * Get all defined events
     */
    public Set<String> getDefinedEvents() {
        return eventMap.keySet();
    }
    
    @Override
    public void visit(ProgramNode node) {
        // Program execution is handled by interpret() method
    }
    
    @Override
    public void visit(EventBlockNode node) {
        // Event block execution is handled by triggerEvent() method
    }
    
    @Override
    public void visit(SayStatementNode node) {
        if (node.isVariable()) {
            // It's a variable reference
            String value = variables.get(node.getValue());
            if (value != null) {
                output.append(value).append("\n");
            } else {
                output.append("[undefined: ").append(node.getValue()).append("]\n");
            }
        } else {
            // It's a string literal
            output.append(node.getValue()).append("\n");
        }
    }
    
    @Override
    public void visit(InputStatementNode node) {
        // Get input from queue
        if (!inputQueue.isEmpty()) {
            String inputValue = inputQueue.poll();
            variables.put(node.getVariableName(), inputValue);
            output.append("Input received: ").append(node.getVariableName()).append(" = ").append(inputValue).append("\n");
        } else {
            // No input available, set to empty or prompt
            output.append("Waiting for input: ").append(node.getVariableName()).append("\n");
            variables.put(node.getVariableName(), "");
        }
    }
}
