package com.eventra.ast;

import java.util.ArrayList;
import java.util.List;

/**
 * ProgramNode
 * -----------------------------------
 * Root node of EVENTRA AST.
 * Contains all event blocks.
 */

public class ProgramNode implements ASTNode {

    private final List<EventBlockNode> eventBlocks;

    public ProgramNode() {

        this.eventBlocks =
                new ArrayList<>();
    }

    // =========================
    // ADD EVENT BLOCK
    // =========================

    public void addEventBlock(
            EventBlockNode block
    ) {

        eventBlocks.add(block);
    }

    // =========================
    // GET ALL EVENTS
    // =========================

    public List<EventBlockNode>
    getEventBlocks() {

        return eventBlocks;
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