package com.eventra.ast;

import java.util.ArrayList;
import java.util.List;

/**
 * Represents an event block in EVENTRA
 * Example: on click { ... } or start { ... }
 */
public class EventBlockNode implements ASTNode {
    private String eventName;
    private List<ASTNode> statements;
    
    public EventBlockNode(String eventName) {
        this.eventName = eventName;
        this.statements = new ArrayList<>();
    }
    
    /**
     * Add a statement to the event block
     */
    public void addStatement(ASTNode statement) {
        statements.add(statement);
    }
    
    /**
     * Get the event name
     */
    public String getEventName() {
        return eventName;
    }
    
    /**
     * Get all statements in this block
     */
    public List<ASTNode> getStatements() {
        return statements;
    }
    
    @Override
    public void accept(ASTVisitor visitor) {
        visitor.visit(this);
    }
}
