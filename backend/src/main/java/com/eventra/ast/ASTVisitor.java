package com.eventra.ast;

/**
 * Visitor interface for traversing AST nodes
 * Used by the interpreter to execute statements
 */
public interface ASTVisitor {
    void visit(ProgramNode node);
    void visit(EventBlockNode node);
    void visit(SayStatementNode node);
    void visit(InputStatementNode node);
}
