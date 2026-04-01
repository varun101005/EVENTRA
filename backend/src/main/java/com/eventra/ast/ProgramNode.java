package com.eventra.ast;

import java.util.ArrayList;
import java.util.List;

/**
 * Represents the root of the AST (Abstract Syntax Tree)
 * Contains all event blocks in the program
 */
public class ProgramNode implements ASTNode {
    private List<EventBlockNode> eventBlocks;
    
    public ProgramNode() {
        this.eventBlocks = new ArrayList<>();
    }
    
    /**
     * Add an event block to the program
     */
    public void addEventBlock(EventBlockNode eventBlock) {
        eventBlocks.add(eventBlock);
    }
    
    /**
     * Get all event blocks
     */
    public List<EventBlockNode> getEventBlocks() {
        return eventBlocks;
    }
    
    /**
     * Find an event block by event name
     */
    public EventBlockNode findEventBlock(String eventName) {
        for (EventBlockNode block : eventBlocks) {
            if (block.getEventName().equals(eventName)) {
                return block;
            }
        }
        return null;
    }
    
    @Override
    public void accept(ASTVisitor visitor) {
        visitor.visit(this);
    }
}
