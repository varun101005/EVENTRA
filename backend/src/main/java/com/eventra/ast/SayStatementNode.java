package com.eventra.ast;

/**
 * Represents a 'say' statement in EVENTRA
 * Example: say "Hello" or say name
 */
public class SayStatementNode implements ASTNode {
    private String value;  // Can be a string literal or variable name
    private boolean isVariable;  // true if it's a variable reference
    
    public SayStatementNode(String value, boolean isVariable) {
        this.value = value;
        this.isVariable = isVariable;
    }
    
    /**
     * Get the value to print
     */
    public String getValue() {
        return value;
    }
    
    /**
     * Check if this is a variable reference
     */
    public boolean isVariable() {
        return isVariable;
    }
    
    @Override
    public void accept(ASTVisitor visitor) {
        visitor.visit(this);
    }
}
