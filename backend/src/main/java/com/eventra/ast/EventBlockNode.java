package com.eventra.ast;

import java.util.ArrayList;
import java.util.List;

/**
 * EventBlockNode
 * -----------------------------------
 * Represents EVENTRA event blocks.
 *
 * Example:
 *
 * event start {
 *    say "Hello"
 * }
 */

public class EventBlockNode
        implements ASTNode {

    private final String eventName;

    private final List<ASTNode> statements;

    public EventBlockNode(
            String eventName
    ) {

        this.eventName = eventName;

        this.statements =
                new ArrayList<>();
    }

    // =========================
    // ADD STATEMENT
    // =========================

    public void addStatement(
            ASTNode statement
    ) {

        statements.add(statement);
    }

    // =========================
    // GET EVENT NAME
    // =========================

    public String getEventName() {

        return eventName;
    }

    // =========================
    // GET STATEMENTS
    // =========================

    public List<ASTNode>
    getStatements() {

        return statements;
    }

    // =========================
    // VISITOR ACCEPT
    // =========================

    @Override
    public void accept(
            ASTVisitor visitor
    ) {

        visitor.visit(this);
    }
}