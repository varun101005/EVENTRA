package com.eventra.parser;

import com.eventra.ast.*;
import com.eventra.lexer.Lexer;
import com.eventra.lexer.Lexer.Token;
import com.eventra.lexer.Lexer.TokenType;

import java.util.List;

/**
 * Parser for EVENTRA programming language
 * Converts tokens into an Abstract Syntax Tree (AST)
 */
public class Parser {
    private List<Token> tokens;
    private int position;
    private Token currentToken;
    
    /**
     * Constructor - initializes parser with tokens
     */
    public Parser(List<Token> tokens) {
        this.tokens = tokens;
        this.position = 0;
        this.currentToken = tokens.get(0);
    }
    
    /**
     * Main parsing method - returns the complete AST
     */
    public ProgramNode parse() {
        ProgramNode program = new ProgramNode();
        
        while (currentToken.type != TokenType.EOF) {
            // Skip newlines at the beginning
            if (currentToken.type == TokenType.NEWLINE) {
                advance();
                continue;
            }
            
            // Parse event blocks
            if (currentToken.type == TokenType.START || currentToken.type == TokenType.ON) {
                EventBlockNode eventBlock = parseEventBlock();
                program.addEventBlock(eventBlock);
            } else {
                throw new RuntimeException("Unexpected token: " + currentToken.value + " at line " + currentToken.line);
            }
        }
        
        return program;
    }
    
    /**
     * Parse an event block (start { ... } or on eventName { ... })
     */
    private EventBlockNode parseEventBlock() {
        String eventName;
        
        // Check if it's a 'start' block or 'on eventName' block
        if (currentToken.type == TokenType.START) {
            eventName = "start";
            advance();
        } else if (currentToken.type == TokenType.ON) {
            advance(); // consume 'on'
            
            // Skip newlines
            while (currentToken.type == TokenType.NEWLINE) {
                advance();
            }
            
            // Expect event name
            if (currentToken.type != TokenType.IDENTIFIER) {
                throw new RuntimeException("Expected event name after 'on' at line " + currentToken.line);
            }
            eventName = currentToken.value;
            advance();
        } else {
            throw new RuntimeException("Expected 'start' or 'on' at line " + currentToken.line);
        }
        
        // Skip newlines
        while (currentToken.type == TokenType.NEWLINE) {
            advance();
        }
        
        // Expect opening brace
        if (currentToken.type != TokenType.LBRACE) {
            throw new RuntimeException("Expected '{' after event name at line " + currentToken.line);
        }
        advance(); // consume '{'
        
        EventBlockNode eventBlock = new EventBlockNode(eventName);
        
        // Parse statements inside the block
        while (currentToken.type != TokenType.RBRACE && currentToken.type != TokenType.EOF) {
            // Skip newlines
            if (currentToken.type == TokenType.NEWLINE) {
                advance();
                continue;
            }
            
            // Parse statement
            ASTNode statement = parseStatement();
            if (statement != null) {
                eventBlock.addStatement(statement);
            }
            
            // Skip newlines after statement
            while (currentToken.type == TokenType.NEWLINE) {
                advance();
            }
        }
        
        // Expect closing brace
        if (currentToken.type != TokenType.RBRACE) {
            throw new RuntimeException("Expected '}' to close event block at line " + currentToken.line);
        }
        advance(); // consume '}'
        
        return eventBlock;
    }
    
    /**
     * Parse a single statement
     */
    private ASTNode parseStatement() {
        // Skip newlines
        while (currentToken.type == TokenType.NEWLINE) {
            advance();
        }
        
        if (currentToken.type == TokenType.SAY) {
            return parseSayStatement();
        } else if (currentToken.type == TokenType.INPUT) {
            return parseInputStatement();
        } else if (currentToken.type == TokenType.RBRACE) {
            return null; // End of block
        } else if (currentToken.type == TokenType.EOF) {
            return null; // End of file
        } else {
            throw new RuntimeException("Unknown statement at line " + currentToken.line);
        }
    }
    
    /**
     * Parse a 'say' statement
     */
    private ASTNode parseSayStatement() {
        advance(); // consume 'say'
        
        // Skip newlines
        while (currentToken.type == TokenType.NEWLINE) {
            advance();
        }
        
        // Check if it's a string or variable
        if (currentToken.type == TokenType.STRING) {
            String value = currentToken.value;
            advance();
            return new SayStatementNode(value, false);
        } else if (currentToken.type == TokenType.IDENTIFIER) {
            String varName = currentToken.value;
            advance();
            return new SayStatementNode(varName, true);
        } else {
            throw new RuntimeException("Expected string or variable after 'say' at line " + currentToken.line);
        }
    }
    
    /**
     * Parse an 'input' statement
     */
    private ASTNode parseInputStatement() {
        advance(); // consume 'input'
        
        // Skip newlines
        while (currentToken.type == TokenType.NEWLINE) {
            advance();
        }
        
        // Expect variable name
        if (currentToken.type != TokenType.IDENTIFIER) {
            throw new RuntimeException("Expected variable name after 'input' at line " + currentToken.line);
        }
        
        String varName = currentToken.value;
        advance();
        
        return new InputStatementNode(varName);
    }
    
    /**
     * Advance to the next token
     */
    private void advance() {
        position++;
        if (position < tokens.size()) {
            currentToken = tokens.get(position);
        } else {
            currentToken = new Token(TokenType.EOF, "", 0);
        }
    }
}
