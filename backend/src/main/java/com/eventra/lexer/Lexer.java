package com.eventra.lexer;

import java.util.ArrayList;
import java.util.List;

/**
 * Improved Lexer for EVENTRA Programming Language
 * -----------------------------------------------
 * Features:
 * - Event-driven syntax support
 * - Variables
 * - Trigger system
 * - Better error handling
 * - Integer support
 * - Operators and semicolons
 * - Comments
 */

public class Lexer {

    private final String code;
    private int position;
    private char currentChar;
    private int line;

    // =========================
    // TOKEN TYPES
    // =========================
    public enum TokenType {

        // Keywords
        EVENT,
        TRIGGER,
        VAR,
        SAY,
        INPUT,

        // Data Types
        IDENTIFIER,
        STRING,
        NUMBER,

        // Operators
        ASSIGN,     // =
        PLUS,       // +
        MINUS,      // -
        MULTIPLY,   // *
        DIVIDE,     // /

        // Symbols
        LBRACE,     // {
        RBRACE,     // }
        LPAREN,     // (
        RPAREN,     // )
        SEMICOLON,  // ;

        // Utility
        NEWLINE,
        EOF
    }

    // =========================
    // TOKEN CLASS
    // =========================
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
            return "Token{" +
                    "type=" + type +
                    ", value='" + value + '\'' +
                    ", line=" + line +
                    '}';
        }
    }

    // =========================
    // CONSTRUCTOR
    // =========================
    public Lexer(String code) {
        this.code = code;
        this.position = 0;
        this.line = 1;

        this.currentChar =
                code.length() > 0
                        ? code.charAt(0)
                        : '\0';
    }

    // =========================
    // MAIN TOKENIZER
    // =========================
    public List<Token> tokenize() {

        List<Token> tokens = new ArrayList<>();

        while (currentChar != '\0') {

            // Skip spaces/tabs
            if (Character.isWhitespace(currentChar)
                    && currentChar != '\n'
                    && currentChar != '\r') {

                advance();
                continue;
            }

            // Handle newline
            if (currentChar == '\n') {
                tokens.add(new Token(TokenType.NEWLINE, "\\n", line));
                advance();
                line++;
                continue;
            }

            // Ignore carriage return
            if (currentChar == '\r') {
                advance();
                continue;
            }

            // Comments
            if (currentChar == '#') {
                skipComment();
                continue;
            }

            // Symbols
            switch (currentChar) {

                case '{':
                    tokens.add(new Token(TokenType.LBRACE, "{", line));
                    advance();
                    continue;

                case '}':
                    tokens.add(new Token(TokenType.RBRACE, "}", line));
                    advance();
                    continue;

                case '(':
                    tokens.add(new Token(TokenType.LPAREN, "(", line));
                    advance();
                    continue;

                case ')':
                    tokens.add(new Token(TokenType.RPAREN, ")", line));
                    advance();
                    continue;

                case ';':
                    tokens.add(new Token(TokenType.SEMICOLON, ";", line));
                    advance();
                    continue;

                case '=':
                    tokens.add(new Token(TokenType.ASSIGN, "=", line));
                    advance();
                    continue;

                case '+':
                    tokens.add(new Token(TokenType.PLUS, "+", line));
                    advance();
                    continue;

                case '-':
                    tokens.add(new Token(TokenType.MINUS, "-", line));
                    advance();
                    continue;

                case '*':
                    tokens.add(new Token(TokenType.MULTIPLY, "*", line));
                    advance();
                    continue;

                case '/':
                    tokens.add(new Token(TokenType.DIVIDE, "/", line));
                    advance();
                    continue;

                case '"':
                    tokens.add(readString());
                    continue;
            }

            // Numbers
            if (Character.isDigit(currentChar)) {
                tokens.add(readNumber());
                continue;
            }

            // Identifiers / Keywords
            if (Character.isLetter(currentChar)
                    || currentChar == '_') {

                tokens.add(readIdentifier());
                continue;
            }

            // Unknown Character
            throw new RuntimeException(
                    "Lexical Error at line "
                            + line
                            + ": Unexpected character '"
                            + currentChar
                            + "'"
            );
        }

        tokens.add(new Token(TokenType.EOF, "", line));
        return tokens;
    }

    // =========================
    // ADVANCE POINTER
    // =========================
    private void advance() {

        position++;

        if (position < code.length()) {
            currentChar = code.charAt(position);
        } else {
            currentChar = '\0';
        }
    }

    // =========================
    // SKIP COMMENTS
    // =========================
    private void skipComment() {

        while (currentChar != '\0'
                && currentChar != '\n') {

            advance();
        }
    }

    // =========================
    // READ STRING
    // =========================
    private Token readString() {

        StringBuilder result = new StringBuilder();

        advance(); // Skip opening quote

        while (currentChar != '"'
                && currentChar != '\0') {

            result.append(currentChar);
            advance();
        }

        // Unterminated string error
        if (currentChar == '\0') {

            throw new RuntimeException(
                    "Unterminated string at line "
                            + line
            );
        }

        advance(); // Skip closing quote

        return new Token(
                TokenType.STRING,
                result.toString(),
                line
        );
    }

    // =========================
    // READ NUMBER
    // =========================
    private Token readNumber() {

        StringBuilder result = new StringBuilder();

        while (Character.isDigit(currentChar)) {

            result.append(currentChar);
            advance();
        }

        return new Token(
                TokenType.NUMBER,
                result.toString(),
                line
        );
    }

    // =========================
    // READ IDENTIFIER / KEYWORD
    // =========================
    private Token readIdentifier() {

        StringBuilder result = new StringBuilder();

        while (currentChar != '\0'
                &&
                (Character.isLetterOrDigit(currentChar)
                        || currentChar == '_')) {

            result.append(currentChar);
            advance();
        }

        String value = result.toString();

        switch (value) {

            case "event":
                return new Token(TokenType.EVENT, value, line);

            case "trigger":
                return new Token(TokenType.TRIGGER, value, line);

            case "var":
                return new Token(TokenType.VAR, value, line);

            case "say":
                return new Token(TokenType.SAY, value, line);

            case "input":
                return new Token(TokenType.INPUT, value, line);

            default:
                return new Token(TokenType.IDENTIFIER, value, line);
        }
    }
}