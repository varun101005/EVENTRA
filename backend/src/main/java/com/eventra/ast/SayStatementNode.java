package com.eventra.ast;

/**
 * Represents a 'say' statement in EVENTRA
 * Example: say "Hello" or say name or say "Hello, " + name
 */
public class SayStatementNode implements ASTNode {
    private String value;  // Can be a string literal or variable name
    private boolean isVariable;  // true if it's a variable reference
    private String concatValue;  // Second part for concatenation
    private boolean concatIsVariable;  // true if second part is variable
    private boolean hasConcatenation;  // true if this is a concatenation
    
    public SayStatementNode(String value, boolean isVariable) {
        this.value = value;
        this.isVariable = isVariable;
        this.hasConcatenation = false;
    }
    
    public SayStatementNode(String value, boolean isVariable, String concatValue, boolean concatIsVariable) {
        this.value = value;
        this.isVariable = isVariable;
        this.concatValue = concatValue;
        this.concatIsVariable = concatIsVariable;
        this.hasConcatenation = true;
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
    
    /**
     * Check if this statement has concatenation
     */
    public boolean hasConcatenation() {
        return hasConcatenation;
    }
    
    /**
     * Get the concatenation value
     */
    public String getConcatValue() {
        return concatValue;
    }
    
    /**
     * Check if concatenation value is a variable
     */
    public boolean concatIsVariable() {
        return concatIsVariable;
    }
    
    @Override
    public void accept(ASTVisitor visitor) {
        visitor.visit(this);
    }
}
