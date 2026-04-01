package com.eventra.ast;

/**
 * Base interface for all AST (Abstract Syntax Tree) nodes
 * Represents a node in the parsed syntax tree
 */
public interface ASTNode {
    /**
     * Accept method for visitor pattern
     */
    void accept(ASTVisitor visitor);
}
