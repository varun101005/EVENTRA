package com.eventra.service;

import com.eventra.ast.ProgramNode;
import com.eventra.interpreter.Interpreter;
import com.eventra.lexer.Lexer;
import com.eventra.lexer.Lexer.Token;
import com.eventra.parser.Parser;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service class that orchestrates the entire interpretation process
 * Coordinates between Lexer, Parser, and Interpreter
 */
@Service
public class InterpreterService {
    
    /**
     * Execute EVENTRA code and return the output
     * 
     * Process:
     * 1. Lexing - Convert source code to tokens
     * 2. Parsing - Convert tokens to AST
     * 3. Interpreting - Execute AST and produce output
     */
    public String executeCode(String code) {
        try {
            // Step 1: Lexing
            Lexer lexer = new Lexer(code);
            List<Token> tokens = lexer.tokenize();
            
            // Step 2: Parsing
            Parser parser = new Parser(tokens);
            ProgramNode program = parser.parse();
            
            // Step 3: Interpreting
            Interpreter interpreter = new Interpreter();
            String output = interpreter.interpret(program);
            
            return output;
            
        } catch (Exception e) {
            throw new RuntimeException("Error executing code: " + e.getMessage(), e);
        }
    }
    
    /**
     * Execute code and trigger a specific event
     */
    public String triggerEvent(String code, String eventName) {
        try {
            // Lexing and parsing
            Lexer lexer = new Lexer(code);
            List<Token> tokens = lexer.tokenize();
            
            Parser parser = new Parser(tokens);
            ProgramNode program = parser.parse();
            
            // Create interpreter and build event map
            Interpreter interpreter = new Interpreter();
            interpreter.interpret(program);
            
            // Trigger the specified event
            return interpreter.triggerEvent(eventName);
            
        } catch (Exception e) {
            throw new RuntimeException("Error triggering event: " + e.getMessage(), e);
        }
    }
    
    /**
     * Get all defined events from code
     */
    public java.util.Set<String> getDefinedEvents(String code) {
        try {
            Lexer lexer = new Lexer(code);
            List<Token> tokens = lexer.tokenize();
            
            Parser parser = new Parser(tokens);
            ProgramNode program = parser.parse();
            
            Interpreter interpreter = new Interpreter();
            interpreter.interpret(program);
            
            return interpreter.getDefinedEvents();
            
        } catch (Exception e) {
            return java.util.Collections.emptySet();
        }
    }
}
