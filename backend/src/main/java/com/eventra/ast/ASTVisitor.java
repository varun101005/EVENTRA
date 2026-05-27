package com.eventra.ast;

/**
 * ==================================================
 * AST Visitor Interface
 * --------------------------------------------------
 * Used by Interpreter for AST Traversal
 * ==================================================
 */

public interface ASTVisitor {

    // Root Program
    void visit(ProgramNode node);

    // Event Block
    void visit(EventBlockNode node);

    // say statement
    void visit(SayStatementNode node);

    // input statement
    void visit(InputStatementNode node);

    // trigger statement
    void visit(TriggerStatementNode node);
}

