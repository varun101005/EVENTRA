package com.eventra.ast;

/**
 * TriggerStatementNode
 * -----------------------------------
 * Represents:
 *
 * trigger eventName
 */

public class TriggerStatementNode
        implements ASTNode {

    private final String eventName;

    public TriggerStatementNode(
            String eventName
    ) {

        this.eventName = eventName;
    }

    // =========================
    // GET EVENT NAME
    // =========================

    public String getEventName() {

        return eventName;
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

