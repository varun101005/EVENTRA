# 🏗️ EVENTRA - Complete Architecture Diagram

## System Architecture Overview

This document provides a comprehensive view of EVENTRA's complete system architecture.

---

## 📊 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE (React)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────────┐  │
│  │ Monaco Editor│  │ Output       │  │ Event Trigger Buttons    │  │
│  │              │  │ Console      │  │ (Dynamically Generated)  │  │
│  └──────┬───────┘  └──────┬───────┘  └────────────┬─────────────┘  │
│         │                 │                        │                 │
│         │ HTTP POST       │                        │ HTTP POST       │
│         │ /api/run        │                        │ /api/trigger    │
│         └─────────────────┴────────────────────────┘                 │
│                              │                                        │
└──────────────────────────────┼───────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    SPRING BOOT BACKEND (Java)                       │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                   REST CONTROLLER LAYER                       │  │
│  │  ┌─────────────┐ ┌──────────────┐ ┌──────────────┐          │  │
│  │  │ POST /run   │ │POST /trigger │ │ POST /events │          │  │
│  │  └──────┬──────┘ └──────┬───────┘ └──────┬───────┘          │  │
│  └─────────┼───────────────┼─────────────────┼──────────────────┘  │
│            │               │                 │                      │
│            └───────────────┴─────────────────┘                      │
│                            │                                         │
│                            ▼                                         │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                   SERVICE LAYER                               │  │
│  │              InterpreterService.java                          │  │
│  │         (Orchestrates Lexing, Parsing, Interpreting)          │  │
│  └──────────────────────────┬───────────────────────────────────┘  │
│                             │                                       │
│                             ▼                                       │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                  LANGUAGE PROCESSING PIPELINE                 │  │
│  │                                                               │  │
│  │   SOURCE CODE → LEXER → TOKENS → PARSER → AST → INTERPRETER  │  │
│  │                                                               │  │
│  │   ┌─────────┐    ┌──────────┐    ┌─────────┐    ┌──────────┐ │  │
│  │   │ Source  │ →  │  Lexer   │ →  │ Parser  │ →  │Interpreter│ │  │
│  │   │  Code   │    │(Tokens)  │    │  (AST)  │    │ (Output) │ │  │
│  │   └─────────┘    └──────────┘    └─────────┘    └──────────┘ │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
                               │
                               ▼
                    ┌──────────────────┐
                    │   OUTPUT TO      │
                    │   CONSOLE        │
                    └──────────────────┘
```

---

## 🔄 Request-Response Flow

### 1. RUN CODE Flow

```
USER
 │
 │ 1. Clicks "Run Code"
 │
 ▼
FRONTEND (React)
 │
 │ 2. POST /api/run
 │    { code: "start { say \"Hello\" }" }
 │
 ▼
BACKEND (Spring Boot)
 │
 │ 3. RunController.runCode()
 │
 ▼
InterpreterService
 │
 │ 4. executeCode(code)
 │
 ├─────────────────────────────────────────────┐
 │                                             │
 ▼                                             │
Lexer                                          │
 │                                             │
 │ Tokenize                                    │
 │                                             │
 ▼                                             │
Tokens                                         │
 │ [START, LBRACE, SAY, STRING, RBRACE]       │
 │                                             │
 ▼                                             │
Parser                                         │
 │                                             │
 │ Build AST                                   │
 │                                             │
 ▼                                             │
ProgramNode (AST)                              │
 │                                             │
 ├── EventBlockNode ("start")                 │
 │    ├── SayStatementNode ("Hello")          │
 │                                             │
 ▼                                             │
Interpreter                                    │
 │                                             │
 │ Execute AST                                 │
 │ - Build eventMap                           │
 │ - Auto-trigger "start"                     │
 │ - Execute statements                       │
 │                                             │
 ▼                                             │
Output String                                 │
 │ "Event triggered: start\nHello\n"          │
 │                                             │
 └─────────────────────────────────────────────┘
 │
 ▼
ExecuteResponse
{
  output: "...",
  success: true
}
 │
 ▼
FRONTEND
 │
 │ Display in console
 │ Detect events → Create buttons
 │
 ▼
USER sees output
```

---

## ⚡ TRIGGER EVENT Flow

```
USER
 │
 │ 1. Clicks event button (e.g., "click")
 │
 ▼
FRONTEND
 │
 │ 2. POST /api/trigger
 │    { 
 │      eventName: "click",
 │      code: "..."
 │    }
 │
 ▼
BACKEND
 │
 │ 3. RunController.triggerEvent()
 │
 ▼
InterpreterService
 │
 │ 4. triggerEvent(code, eventName)
 │
 ├─────────────────────────────────────────────┐
 │                                             │
 ▼                                             │
Lexer → Parser (same as run)                  │
 │                                             │
 ▼                                             │
ProgramNode (AST)                              │
 │                                             │
 ▼                                             │
Interpreter                                    │
 │                                             │
 │ interpret(program) - builds eventMap       │
 │                                             │
 ▼                                             │
triggerEvent("click")                          │
 │                                             │
 │ - Print "Event triggered: click"           │
 │ - Find event block in eventMap             │
 │ - Execute statements                       │
 │                                             │
 ▼                                             │
Output String                                 │
 │                                             │
 └─────────────────────────────────────────────┘
 │
 ▼
Response
 │
 ▼
FRONTEND
 │
 │ Append to console
 │
 ▼
USER
```

---

## 🧱 Component Architecture

### Frontend Components

```
App.js (Root)
 │
 ├── State: code
 ├── State: output
 ├── State: events[]
 ├── State: isDarkMode
 │
 ├───▶ ThemeToggle
 │     └── Props: isDarkMode, onToggle
 │
 ├───▶ EditorComponent
 │     └── Props: code, onCodeChange, isDarkMode
 │         └── Monaco Editor
 │
 ├───▶ RunButton
 │     └── Props: code, onOutput, onClear, onEventsDetected
 │         ├── API Call: POST /api/run
 │         ├── API Call: POST /api/events
 │         └── Error handling
 │
 ├───▶ OutputConsole
 │     └── Props: output, isDarkMode
 │         └── Auto-scroll logic
 │
 └───▶ EventButtons
       └── Props: events[], code, onOutput
           ├── Dynamic button generation
           └── API Call: POST /api/trigger (per button)
```

---

## 🏛️ Backend Class Structure

```
com.eventra
 │
 ├── EventraApplication (Main)
 │
 ├── config
 │   └── CorsConfig
 │
 ├── controller
 │   └── RunController
 │       ├── /api/run
 │       ├── /api/trigger
 │       └── /api/events
 │
 ├── service
 │   └── InterpreterService
 │       ├── executeCode()
 │       ├── triggerEvent()
 │       └── getDefinedEvents()
 │
 ├── lexer
 │   └── Lexer
 │       ├── tokenize()
 │       ├── readString()
 │       ├── readIdentifier()
 │       └── advance()
 │
 ├── parser
 │   └── Parser
 │       ├── parse()
 │       ├── parseEventBlock()
 │       ├── parseSayStatement()
 │       ├── parseInputStatement()
 │       └── advance()
 │
 ├── ast
 │   ├── ASTNode (interface)
 │   ├── ASTVisitor (interface)
 │   ├── ProgramNode
 │   ├── EventBlockNode
 │   ├── SayStatementNode
 │   └── InputStatementNode
 │
 ├── interpreter
 │   └── Interpreter
 │       ├── interpret()
 │       ├── triggerEvent()
 │       ├── visit(ProgramNode)
 │       ├── visit(EventBlockNode)
 │       ├── visit(SayStatementNode)
 │       └── visit(InputStatementNode)
 │
 └── model
     ├── ExecuteRequest
     ├── ExecuteResponse
     └── TriggerRequest
```

---

## 📦 Data Flow Diagram

```
┌────────────┐
│    User    │
└─────┬──────┘
      │
      │ Writes code
      ▼
┌─────────────────────────────────────────┐
│          Monaco Editor                  │
│      (React Component)                  │
└─────────────┬───────────────────────────┘
              │
              │ Code string
              ▼
┌─────────────────────────────────────────┐
│         RunButton Component             │
│  (Triggers API call on click)           │
└─────────────┬───────────────────────────┘
              │
              │ HTTP POST /api/run
              │ { code: string }
              ▼
┌─────────────────────────────────────────┐
│       RunController (REST API)          │
│  @PostMapping("/run")                   │
└─────────────┬───────────────────────────┘
              │
              │ Calls service
              ▼
┌─────────────────────────────────────────┐
│     InterpreterService                  │
│  .executeCode(code)                     │
└─────────────┬───────────────────────────┘
              │
              │ Step 1: Lexing
              ▼
┌─────────────────────────────────────────┐
│            Lexer                        │
│  Input: Source code string              │
│  Output: List<Token>                    │
└─────────────┬───────────────────────────┘
              │
              │ Tokens
              ▼
┌─────────────────────────────────────────┐
│            Parser                       │
│  Input: List<Token>                     │
│  Output: ProgramNode (AST)              │
└─────────────┬───────────────────────────┘
              │
              │ AST
              ▼
┌─────────────────────────────────────────┐
│         Interpreter                     │
│  Input: ProgramNode                     │
│  Process:                               │
│    1. Build eventMap                    │
│    2. Auto-trigger "start"              │
│    3. Execute statements                │
│    4. Manage variables                  │
│  Output: String (result)                │
└─────────────┬───────────────────────────┘
              │
              │ Output string
              ▼
┌─────────────────────────────────────────┐
│     InterpreterService                  │
│  Returns result to controller           │
└─────────────┬───────────────────────────┘
              │
              │ ExecuteResponse JSON
              ▼
┌─────────────────────────────────────────┐
│         RunButton Component             │
│  Receives response                      │
└─────────────┬───────────────────────────┘
              │
              │ Updates state
              ▼
┌─────────────────────────────────────────┐
│        OutputConsole                    │
│  Displays output                        │
└─────────────┬───────────────────────────┘
              │
              │ Also triggers
              ▼
┌─────────────────────────────────────────┐
│     EventButtons Component              │
│  Creates buttons for each event         │
└─────────────┬───────────────────────────┘
              │
              ▼
┌────────────┐
│    User    │
│  Sees      │
│  output &  │
│  buttons   │
└────────────┘
```

---

## 🗂️ AST Structure Example

### Source Code
```eventra
start {
    say "Hello"
    input name
}

on click {
    say "Clicked!"
}
```

### Resulting AST

```
ProgramNode
 │
 ├── eventBlocks: List<EventBlockNode>
 │
 ├── EventBlockNode #1
 │   │ eventName: "start"
 │   │ statements:
 │   │
 │   ├── SayStatementNode
 │   │   │ value: "Hello"
 │   │   └── isVariable: false
 │   │
 │   └── InputStatementNode
 │       └── variableName: "name"
 │
 └── EventBlockNode #2
     │ eventName: "click"
     │ statements:
     │
     └── SayStatementNode
         │ value: "Clicked!"
         └── isVariable: false
```

---

## 🔑 Key Data Structures

### 1. Event Map (in Interpreter)

```java
Map<String, List<ASTNode>> eventMap = new HashMap<>();

// Example:
eventMap = {
  "start": [SayStatementNode, InputStatementNode],
  "click": [SayStatementNode],
  "login": [SayStatementNode, InputStatementNode]
}
```

### 2. Variables Map (in Interpreter)

```java
Map<String, String> variables = new HashMap<>();

// Example after user input:
variables = {
  "name": "John",
  "age": "25",
  "city": "New York"
}
```

### 3. Token Stream (from Lexer)

```
Source: start { say "Hello" }

Tokens:
[
  Token(START, "start", line:1),
  Token(LBRACE, "{", line:1),
  Token(SAY, "say", line:1),
  Token(STRING, "Hello", line:1),
  Token(RBRACE, "}", line:1),
  Token(EOF, "", line:1)
]
```

---

## 🎯 Execution States

### State Machine

```
┌─────────────┐
│   IDLE      │ ◄── Initial state
└──────┬──────┘
       │
       │ User clicks "Run"
       ▼
┌─────────────┐
│  RUNNING    │ ◄── Executing code
└──────┬──────┘
       │
       ├── Success ──► Show output
       │
       └── Error ────► Show error
       
       │
       │ User clicks event button
       ▼
┌─────────────┐
│  TRIGGERING │ ◄── Executing event
└──────┬──────┘
       │
       ├── Success ──► Append output
       │
       └── Error ────► Show error
```

---

## 🌐 Network Communication

### HTTP Requests

#### 1. Run Code
```http
POST http://localhost:8080/api/run
Content-Type: application/json

{
  "code": "start {\n  say \"Hello\"\n}"
```

**Response:**
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "output": "Event triggered: start\nHello\n",
  "success": true
}
```

#### 2. Trigger Event
```http
POST http://localhost:8080/api/trigger
Content-Type: application/json

{
  "eventName": "click",
  "code": "on click { say \"Clicked\" }"
```

**Response:**
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "output": "Event triggered: click\nClicked\n",
  "success": true
}
```

#### 3. Get Events
```http
POST http://localhost:8080/api/events
Content-Type: application/json

{
  "code": "start {} on click {} on login {}"
```

**Response:**
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "events": ["start", "click", "login"],
  "success": true
}
```

---

## 🛡️ Error Handling Flow

```
Error Occurs (e.g., syntax error)
 │
 ▼
Exception thrown in Lexer/Parser/Interpreter
 │
 ▼
Caught by InterpreterService
 │
 ▼
RuntimeException with message
 │
 ▼
Caught by RunController
 │
 ▼
Return ErrorResponse
{
  output: "",
  success: false,
  error: "Detailed message"
}
 │
 ▼
Frontend receives error
 │
 ▼
Display error message in UI
(red box with error details)
 │
 ▼
User sees friendly error
```

---

## 📊 Performance Characteristics

### Time Complexity

| Operation | Complexity | Notes |
|-----------|------------|-------|
| Lexing | O(n) | Linear scan of source |
| Parsing | O(n) | Single pass through tokens |
| Building eventMap | O(m) | m = number of events |
| Triggering event | O(k) | k = statements in event |
| Variable lookup | O(1) | HashMap access |

### Space Complexity

| Structure | Space | Notes |
|-----------|-------|-------|
| Tokens | O(n) | n = tokens |
| AST | O(n) | Proportional to tokens |
| eventMap | O(e*s) | e=events, s=avg statements |
| variables | O(v) | v = number of variables |

---

## 🏗️ Deployment Architecture

### Development

```
┌──────────────┐     ┌──────────────┐
│   React Dev  │────▶│ Spring Boot  │
│   Server     │◀────│   Server     │
│  :3000       │     │   :8080      │
└──────────────┘     └──────────────┘
```

### Production

```
┌─────────────────────────────────┐
│      Web Server (Nginx)         │
│         Port 80                 │
├─────────────────────────────────┤
│  Static Files (React Build)     │
│  + API Proxy to Spring Boot     │
└───────────────┬─────────────────┘
                │
                ▼
        ┌──────────────┐
        │ Spring Boot  │
        │   JAR        │
        │   :8080      │
        └──────────────┘
```

---

## 🎨 Design Patterns Used

### Backend Patterns

1. **Visitor Pattern** - AST traversal
2. **Interpreter Pattern** - Language execution
3. **Composite Pattern** - AST node structure
4. **Strategy Pattern** - Different statement types
5. **Factory Pattern** - Token creation

### Frontend Patterns

1. **Container Pattern** - App manages state
2. **Presentational Pattern** - Child components
3. **Higher-Order Component** - Theme wrapper
4. **Custom Hooks** - Reusable logic
5. **Observer Pattern** - State updates

---

## 📈 Scalability Considerations

### Current Architecture
- Single-threaded execution
- In-memory storage
- Synchronous processing
- Stateless backend

### Future Scaling Options

1. **Caching**
   - Cache parsed ASTs
   - Memoize interpretation results

2. **Concurrency**
   - Multi-threaded execution
   - Async event handling

3. **Persistence**
   - Database for programs
   - User accounts

4. **Microservices**
   - Separate lexer/parser services
   - Dedicated execution service

---

## 🔒 Security Considerations

### Current Implementation
✅ No file system access
✅ No network calls from backend
✅ Sandboxed execution
✅ Input validation
✅ CORS protection

### For Production
- Rate limiting
- Authentication
- Code execution limits
- Memory limits
- Timeout handling
- Sanitized error messages

---

## 📊 Summary

EVENTRA demonstrates a complete, well-architected system with:

✨ **Clean Separation**: Frontend ↔ Backend ↔ Language Core
✨ **Proper Layering**: Controller → Service → Domain
✨ **Design Patterns**: Visitor, Interpreter, Composite
✨ **Modern Stack**: React 18 + Spring Boot 3
✨ **Scalable Design**: Easy to extend and modify
✨ **Educational Value**: Clear examples of CS concepts

---

**This architecture diagram shows how all components work together seamlessly!**
