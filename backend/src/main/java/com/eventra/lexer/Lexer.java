package com.eventra.lexer;

import java.util.ArrayList;
import java.util.List;

/**
 * Lexer for EVENTRA programming language
 * Converts source code into tokens for parsing
 * 
 * Supported tokens:
 * - START, ON, INPUT, SAY keywords
 * - IDENTIFIER (variable names, event names)
 * - STRING (quoted text)
 * - LBRACE, RBRACE ({ })
 * - NEWLINE
 */
public class Lexer {
    
    private String code;
    private int position;
    private char currentChar;
    
    // Token types
    public enum TokenType {
        START,      // "start" keyword
        ON,         // "on" keyword
        INPUT,      // "input" keyword
        SAY,        // "say" keyword
        IDENTIFIER, // variable/event names
        STRING,     // quoted strings
        LBRACE,     // {
        RBRACE,     // }
        NEWLINE,    // line break
        EOF         // end of file
    }
    
    /**
     * Token class representing a lexical unit
     */
    public static class Token {
        public TokenType type;
        public String value;
        public int line;
        
        public Token(TokenType type, String value, int line) {
            this.type = type;
            this.value = value;
            this.line = line;
        }
        
        @Override
        public String toString() {
            return "Token{" + type + ", '" + value + "', line " + line + "}";
        }
    }
    
    /**
     * Constructor - initializes the lexer with source code
     */
    public Lexer(String code) {
        this.code = code;
        this.position = 0;
        this.currentChar = code.length() > 0 ? code.charAt(0) : '\0';
    }
    
    /**
     * Main method to tokenize the entire code
     * Returns a list of tokens
     */
    public List<Token> tokenize() {
        List<Token> tokens = new ArrayList<>();
        int line = 1;
        
        while (currentChar != '\0') {
            // Skip whitespace (but not newlines)
            if (Character.isWhitespace(currentChar) && currentChar != '\n' && currentChar != '\r') {
                advance();
                continue;
            }
            
            // Handle newlines
            if (currentChar == '\n') {
                tokens.add(new Token(TokenType.NEWLINE, "\n", line));
                advance();
                line++;
                continue;
            }
            
            // Skip carriage return
            if (currentChar == '\r') {
                advance();
                continue;
            }
            
            // Handle comments (lines starting with #)
            if (currentChar == '#') {
                while (currentChar != '\0' && currentChar != '\n') {
                    advance();
                }
                continue;
            }
            
            // Handle braces
            if (currentChar == '{') {
                tokens.add(new Token(TokenType.LBRACE, "{", line));
                advance();
                continue;
            }
            
            if (currentChar == '}') {
                tokens.add(new Token(TokenType.RBRACE, "}", line));
                advance();
                continue;
            }
            
            // Handle strings (double quotes)
            if (currentChar == '"') {
                tokens.add(readString(line));
                continue;
            }
            
            // Handle identifiers and keywords
            if (Character.isLetter(currentChar) || currentChar == '_') {
                tokens.add(readIdentifier(line));
                continue;
            }
            
            // Unknown character
            throw new RuntimeException("Unexpected character: '" + currentChar + "' at line " + line);
        }
        
        // Add EOF token
        tokens.add(new Token(TokenType.EOF, "", line));
        return tokens;
    }
    
    /**
     * Advance to the next character
     */
    private void advance() {
        position++;
        if (position < code.length()) {
            currentChar = code.charAt(position);
        } else {
            currentChar = '\0';
        }
    }
    
    /**
     * Read a string literal (between quotes)
     */
    private Token readString(int line) {
        StringBuilder result = new StringBuilder();
        advance(); // Skip opening quote
        
        while (currentChar != '"' && currentChar != '\0') {
            result.append(currentChar);
            advance();
        }
        
        if (currentChar == '"') {
            advance(); // Skip closing quote
        }
        
        return new Token(TokenType.STRING, result.toString(), line);
    }
    
    /**
     * Read an identifier or keyword
     */
    private Token readIdentifier(int line) {
        StringBuilder result = new StringBuilder();
        
        while (currentChar != '\0' && 
               (Character.isLetterOrDigit(currentChar) || currentChar == '_')) {
            result.append(currentChar);
            advance();
        }
        
        String value = result.toString();
        
        // Check if it's a keyword
        switch (value) {
            case "start":
                return new Token(TokenType.START, value, line);
            case "on":
                return new Token(TokenType.ON, value, line);
            case "input":
                return new Token(TokenType.INPUT, value, line);
            case "say":
                return new Token(TokenType.SAY, value, line);
            default:
                return new Token(TokenType.IDENTIFIER, value, line);
        }
    }
}
