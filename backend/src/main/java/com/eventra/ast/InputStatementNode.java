package com.eventra.ast;

/**
 * Represents an 'input' statement in EVENTRA
 * Example: input name (prompts user for input and stores in variable)
 */
public class InputStatementNode implements ASTNode {
    private String variableName;
    
    public InputStatementNode(String variableName) {
        this.variableName = variableName;
    }
    
    /**
     * Get the variable name to store input in
     */
    public String getVariableName() {
        return variableName;
    }
    
    @Override
    public void accept(ASTVisitor visitor) {
        visitor.visit(this);
    }
}
