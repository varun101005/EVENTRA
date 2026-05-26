package com.eventra.parser;

import com.eventra.ast.*;
import com.eventra.lexer.Lexer.Token;
import com.eventra.lexer.Lexer.TokenType;

import java.util.List;

/**
 * ==================================================
 * FINAL EVENTRA PARSER
 * --------------------------------------------------
 * Recursive Descent Parser
 * Generates AST from EVENTRA source code
 * ==================================================
 */

public class Parser {

    // ==========================================
    // PARSER STATE
    // ==========================================

    private final List<Token> tokens;

    private int position;

    private Token currentToken;

    // ==========================================
    // CONSTRUCTOR
    // ==========================================

    public Parser(List<Token> tokens) {

        this.tokens = tokens;

        this.position = 0;

        this.currentToken = tokens.get(0);
    }

    // ==========================================
    // MAIN PARSE METHOD
    // ==========================================

    public ProgramNode parse() {

        ProgramNode program =
                new ProgramNode();

        while (
                currentToken.type
                !=
                TokenType.EOF
        ) {

            skipNewLines();

            // Parse event block
            if (
                    currentToken.type
                    ==
                    TokenType.EVENT
            ) {

                EventBlockNode block =
                        parseEventBlock();

                program.addEventBlock(block);
            }

            else {

                syntaxError(
                        "Expected 'event' declaration"
                );
            }
        }

        return program;
    }

    // ==========================================
    // PARSE EVENT BLOCK
    // ==========================================

    private EventBlockNode parseEventBlock() {

        // CONSUME EVENT KEYWORD
        expect(TokenType.EVENT);

        skipNewLines();

        // EXPECT EVENT NAME
        if (
                currentToken.type
                !=
                TokenType.IDENTIFIER
        ) {

            syntaxError(
                    "Expected event name"
            );
        }

        // GET EVENT NAME
        String eventName =
                currentToken.value;

        // CONSUME IDENTIFIER
        advance();

        skipNewLines();

        // EXPECT {
        expect(TokenType.LBRACE);

        // CREATE EVENT BLOCK
        EventBlockNode block =
                new EventBlockNode(
                        eventName
                );

        skipNewLines();

        // PARSE STATEMENTS
        while (
                currentToken.type
                !=
                TokenType.RBRACE
                &&
                currentToken.type
                !=
                TokenType.EOF
        ) {

            ASTNode statement =
                    parseStatement();

            if (statement != null) {

                block.addStatement(
                        statement
                );
            }

            skipNewLines();
        }

        // EXPECT }
        expect(TokenType.RBRACE);

        return block;
    }

    // ==========================================
    // PARSE STATEMENT
    // ==========================================

    private ASTNode parseStatement() {

        skipNewLines();

        switch (currentToken.type) {

            case SAY:
                return parseSayStatement();

            case INPUT:
                return parseInputStatement();

            case TRIGGER:
                return parseTriggerStatement();

            case RBRACE:
                return null;

            case EOF:
                return null;

            default:

                syntaxError(
                        "Unknown statement"
                );

                return null;
        }
    }

    // ==========================================
    // PARSE SAY
    // ==========================================

    private ASTNode parseSayStatement() {

        // consume say
        expect(TokenType.SAY);

        skipNewLines();

        String value;

        boolean isVariable;

        // STRING
        if (
                currentToken.type
                ==
                TokenType.STRING
        ) {

            value =
                    currentToken.value;

            isVariable = false;

            advance();
        }

        // VARIABLE
        else if (
                currentToken.type
                ==
                TokenType.IDENTIFIER
        ) {

            value =
                    currentToken.value;

            isVariable = true;

            advance();
        }

        else {

            syntaxError(
                    "Expected string or identifier after 'say'"
            );

            return null;
        }

        skipNewLines();

        // CONCAT SUPPORT
        if (
                currentToken.type
                ==
                TokenType.PLUS
        ) {

            advance();

            skipNewLines();

            String concatValue;

            boolean concatIsVariable;

            if (
                    currentToken.type
                    ==
                    TokenType.STRING
            ) {

                concatValue =
                        currentToken.value;

                concatIsVariable = false;

                advance();
            }

            else if (
                    currentToken.type
                    ==
                    TokenType.IDENTIFIER
            ) {

                concatValue =
                        currentToken.value;

                concatIsVariable = true;

                advance();
            }

            else {

                syntaxError(
                        "Expected value after '+'"
                );

                return null;
            }

            return new SayStatementNode(
                    value,
                    isVariable,
                    concatValue,
                    concatIsVariable
            );
        }

        return new SayStatementNode(
                value,
                isVariable
        );
    }

    // ==========================================
    // PARSE INPUT
    // ==========================================

    private ASTNode parseInputStatement() {

        // consume input
        expect(TokenType.INPUT);

        skipNewLines();

        if (
                currentToken.type
                !=
                TokenType.IDENTIFIER
        ) {

            syntaxError(
                    "Expected variable name after input"
            );
        }

        String variableName =
                currentToken.value;

        advance();

        return new InputStatementNode(
                variableName
        );
    }

    // ==========================================
    // PARSE TRIGGER
    // ==========================================

    private ASTNode parseTriggerStatement() {

        // consume trigger
        expect(TokenType.TRIGGER);

        skipNewLines();

        if (
                currentToken.type
                !=
                TokenType.IDENTIFIER
        ) {

            syntaxError(
                    "Expected event name after trigger"
            );
        }

        String eventName =
                currentToken.value;

        advance();

        return new TriggerStatementNode(
                eventName
        );
    }

    // ==========================================
    // EXPECT TOKEN
    // ==========================================

    private void expect(TokenType expected) {

        if (
                currentToken.type
                !=
                expected
        ) {

            syntaxError(
                    "Expected token: "
                            + expected
            );
        }

        advance();
    }

    // ==========================================
    // SKIP NEWLINES
    // ==========================================

    private void skipNewLines() {

        while (
                currentToken.type
                ==
                TokenType.NEWLINE
        ) {

            advance();
        }
    }

    // ==========================================
    // ADVANCE TOKEN
    // ==========================================

    private void advance() {

        position++;

        if (position < tokens.size()) {

            currentToken =
                    tokens.get(position);

        } else {

            currentToken =
                    tokens.get(tokens.size() - 1);
        }
    }

    // ==========================================
    // SYNTAX ERROR
    // ==========================================

    private void syntaxError(
            String message
    ) {

        throw new RuntimeException(

                "[Syntax Error] Line "
                        + currentToken.line
                        + ": "
                        + message
                        + " -> Found '"
                        + currentToken.value
                        + "'"
        );
    }
}