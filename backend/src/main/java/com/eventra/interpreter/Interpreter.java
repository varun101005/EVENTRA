package com.eventra.interpreter;

import com.eventra.ast.*;

import java.util.*;

/**
 * Improved Interpreter for EVENTRA Programming Language
 * ----------------------------------------------------
 * Features:
 * - Event-driven execution
 * - Runtime logging
 * - Variable memory management
 * - Input handling
 * - Event chaining
 * - Error handling
 * - Runtime statistics
 * - AST traversal using Visitor Pattern
 */

public class Interpreter implements ASTVisitor {

    // =========================
    // RUNTIME COMPONENTS
    // =========================

    private final StringBuilder output;

    // Variable storage
    private final Map<String, String> variables;

    // Event name -> event statements
    private final Map<String, List<ASTNode>> eventMap;

    // Input queue
    private Queue<String> inputQueue;

    // Runtime stats
    private int executedStatements;

    private long startTime;

    // =========================
    // CONSTRUCTOR
    // =========================

    public Interpreter() {

        this.output = new StringBuilder();

        this.variables = new HashMap<>();

        this.eventMap = new HashMap<>();

        this.inputQueue = new LinkedList<>();

        this.executedStatements = 0;
    }

    // =========================
    // SET INPUT VALUES
    // =========================

    public void setInputValues(List<String> inputs) {

        this.inputQueue = new LinkedList<>(inputs);
    }

    // =========================
    // MAIN INTERPRET METHOD
    // =========================

    public String interpret(ProgramNode program) {

        output.setLength(0);

        executedStatements = 0;

        startTime = System.currentTimeMillis();

        output.append("====================================\n");
        output.append(" EVENTRA Runtime Environment Started\n");
        output.append("====================================\n\n");

        // Load all events
        output.append("[Runtime] Loading event definitions...\n");

        for (EventBlockNode eventBlock : program.getEventBlocks()) {

            eventMap.put(
                    eventBlock.getEventName(),
                    eventBlock.getStatements()
            );

            output.append("[Loaded] Event: ")
                    .append(eventBlock.getEventName())
                    .append("\n");
        }

        output.append("\n");

        // Auto start event
        if (eventMap.containsKey("start")) {

            output.append("[Runtime] Auto-triggering start event\n\n");

            triggerEvent("start");

        } else {

            output.append("[Warning] No start event found\n");
        }

        // Runtime statistics
        long endTime = System.currentTimeMillis();

        output.append("\n====================================\n");
        output.append(" EVENTRA Runtime Statistics\n");
        output.append("====================================\n");

        output.append("Events Loaded      : ")
                .append(eventMap.size())
                .append("\n");

        output.append("Variables Stored   : ")
                .append(variables.size())
                .append("\n");

        output.append("Statements Executed: ")
                .append(executedStatements)
                .append("\n");

        output.append("Execution Time     : ")
                .append(endTime - startTime)
                .append(" ms\n");

        output.append("====================================\n");

        return output.toString();
    }

    // =========================
    // TRIGGER EVENT
    // =========================

    public String triggerEvent(String eventName) {

        output.append("\n[EVENT] Triggering Event -> ")
                .append(eventName)
                .append("\n");

        List<ASTNode> statements =
                eventMap.get(eventName);

        // Event not found
        if (statements == null) {

            output.append("[Runtime Error] Event '")
                    .append(eventName)
                    .append("' not found\n");

            return output.toString();
        }

        // Execute statements
        for (ASTNode statement : statements) {

            try {

                output.append("[EXEC] Executing statement...\n");

                statement.accept(this);

                executedStatements++;

            } catch (Exception e) {

                output.append("[Runtime Error] ")
                        .append(e.getMessage())
                        .append("\n");
            }
        }

        output.append("[SUCCESS] Event completed -> ")
                .append(eventName)
                .append("\n");

        return output.toString();
    }

    // =========================
    // GET OUTPUT
    // =========================

    public String getOutput() {

        return output.toString();
    }

    // =========================
    // GET EVENTS
    // =========================

    public Set<String> getDefinedEvents() {

        return eventMap.keySet();
    }

    // =========================
    // VISITOR METHODS
    // =========================

    @Override
    public void visit(ProgramNode node) {

        output.append("[AST] Visiting ProgramNode\n");
    }

    @Override
    public void visit(EventBlockNode node) {

        output.append("[AST] Visiting EventBlockNode -> ")
                .append(node.getEventName())
                .append("\n");
    }

    // =========================
    // SAY STATEMENT
    // =========================

    @Override
    public void visit(SayStatementNode node) {

        output.append("[AST] Visiting SayStatementNode\n");

        // Concatenation
        if (node.hasConcatenation()) {

            String firstPart;

            String secondPart;

            // First part
            if (node.isVariable()) {

                firstPart = variables.get(node.getValue());

                if (firstPart == null) {

                    firstPart =
                            "[Semantic Error: Undefined Variable -> "
                                    + node.getValue()
                                    + "]";
                }

            } else {

                firstPart = node.getValue();
            }

            // Second part
            if (node.concatIsVariable()) {

                secondPart =
                        variables.get(node.getConcatValue());

                if (secondPart == null) {

                    secondPart =
                            "[Semantic Error: Undefined Variable -> "
                                    + node.getConcatValue()
                                    + "]";
                }

            } else {

                secondPart = node.getConcatValue();
            }

            output.append(firstPart)
                    .append(secondPart)
                    .append("\n");
        }

        // Variable reference
        else if (node.isVariable()) {

            String value =
                    variables.get(node.getValue());

            if (value != null) {

                output.append(value)
                        .append("\n");

            } else {

                output.append("[Semantic Error] Variable '")
                        .append(node.getValue())
                        .append("' not defined\n");
            }
        }

        // Plain string
        else {

            output.append(node.getValue())
                    .append("\n");
        }
    }

    // =========================
    // INPUT STATEMENT
    // =========================

    @Override
    public void visit(InputStatementNode node) {

        output.append("[AST] Visiting InputStatementNode\n");

        // Input available
        if (!inputQueue.isEmpty()) {

            String inputValue = inputQueue.poll();

            variables.put(
                    node.getVariableName(),
                    inputValue
            );

            output.append("[INPUT] ")
                    .append(node.getVariableName())
                    .append(" = ")
                    .append(inputValue)
                    .append("\n");
        }

        // No input
        else {

            output.append("[Waiting For Input] ")
                    .append(node.getVariableName())
                    .append("\n");

            variables.put(
                    node.getVariableName(),
                    ""
            );
        }
    }

    // =========================
    // TRIGGER STATEMENT
    // =========================

    @Override
    public void visit(TriggerStatementNode node) {

        output.append("[AST] Visiting TriggerStatementNode\n");

        executeTrigger(node.getEventName());
    }

    // =========================
    // EVENT CHAINING
    // =========================

    public void executeTrigger(String eventName) {

        output.append("[CHAIN] Triggering nested event -> ")
                .append(eventName)
                .append("\n");

        triggerEvent(eventName);
    }
}