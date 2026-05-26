package com.eventra.service;

import com.eventra.ast.ProgramNode;
import com.eventra.interpreter.Interpreter;
import com.eventra.lexer.Lexer;
import com.eventra.lexer.Lexer.Token;
import com.eventra.parser.Parser;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

/**
 * InterpreterService
 * ----------------------------------------
 * Core runtime orchestration service
 * for EVENTRA Programming Language.
 *
 * Responsibilities:
 * - Lexical Analysis
 * - Syntax Parsing
 * - AST Generation
 * - Runtime Interpretation
 * - Event Triggering
 */

@Service
public class InterpreterService {

    // =========================
    // EXECUTE CODE
    // =========================

    public String executeCode(String code) {

        long startTime =
                System.currentTimeMillis();

        StringBuilder runtimeLog =
                new StringBuilder();

        try {

            runtimeLog.append(
                    "====================================\n"
            );

            runtimeLog.append(
                    " EVENTRA Execution Started\n"
            );

            runtimeLog.append(
                    "====================================\n\n"
            );

            // ====================================
            // STEP 1: LEXICAL ANALYSIS
            // ====================================

            runtimeLog.append(
                    "[Phase 1] Lexical Analysis Started\n"
            );

            Lexer lexer =
                    new Lexer(code);

            List<Token> tokens =
                    lexer.tokenize();

            runtimeLog.append(
                    "[SUCCESS] Tokens Generated: "
            ).append(tokens.size())
                    .append("\n\n");

            // ====================================
            // STEP 2: SYNTAX ANALYSIS
            // ====================================

            runtimeLog.append(
                    "[Phase 2] Syntax Parsing Started\n"
            );

            Parser parser =
                    new Parser(tokens);

            ProgramNode program =
                    parser.parse();

            runtimeLog.append(
                    "[SUCCESS] AST Generated\n\n"
            );

            // ====================================
            // STEP 3: INTERPRETATION
            // ====================================

            runtimeLog.append(
                    "[Phase 3] Runtime Interpretation Started\n"
            );

            Interpreter interpreter =
                    new Interpreter();

            String result =
                    interpreter.interpret(program);

            runtimeLog.append(
                    "[SUCCESS] Program Executed\n\n"
            );

            long endTime =
                    System.currentTimeMillis();

            runtimeLog.append(
                    "Execution Time: "
            ).append(endTime - startTime)
                    .append(" ms\n");

            runtimeLog.append(
                    "====================================\n"
            );

            return runtimeLog + "\n" + result;

        }

        catch (Exception e) {

            runtimeLog.append(
                    "\n[EXECUTION ERROR]\n"
            );

            runtimeLog.append(
                    e.getMessage()
            ).append("\n");

            runtimeLog.append(
                    "\n===================================="
            );

            throw new RuntimeException(
                    runtimeLog.toString(),
                    e
            );
        }
    }

    // =========================
    // TRIGGER EVENT
    // =========================

    public String triggerEvent(
            String code,
            String eventName
    ) {

        try {

            Lexer lexer =
                    new Lexer(code);

            List<Token> tokens =
                    lexer.tokenize();

            Parser parser =
                    new Parser(tokens);

            ProgramNode program =
                    parser.parse();

            Interpreter interpreter =
                    new Interpreter();

            interpreter.interpret(program);

            return interpreter
                    .triggerEvent(eventName);

        }

        catch (Exception e) {

            throw new RuntimeException(

                    "[Runtime Trigger Error] "
                            + e.getMessage(),

                    e
            );
        }
    }

    // =========================
    // GET DEFINED EVENTS
    // =========================

    public Set<String> getDefinedEvents(
            String code
    ) {

        try {

            Lexer lexer =
                    new Lexer(code);

            List<Token> tokens =
                    lexer.tokenize();

            Parser parser =
                    new Parser(tokens);

            ProgramNode program =
                    parser.parse();

            Interpreter interpreter =
                    new Interpreter();

            interpreter.interpret(program);

            return interpreter
                    .getDefinedEvents();
        }

        catch (Exception e) {

            return java.util.Collections
                    .emptySet();
        }
    }
}