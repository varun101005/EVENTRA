# 📊 EVENTRA - Project Overview

## 🎯 What is EVENTRA?

EVENTRA is a **custom event-driven programming language** with a full-stack web-based IDE. It allows users to write, run, and interact with code through an intuitive web interface.

---

## 🏗️ Complete Project Structure

```
project/
├── backend/                          # Spring Boot Backend
│   ├── pom.xml                       # Maven dependencies
│   ├── src/main/java/com/eventra/
│   │   ├── EventraApplication.java   # Main application
│   │   ├── config/
│   │   │   └── CorsConfig.java       # CORS setup
│   │   ├── controller/
│   │   │   └── RunController.java    # REST API (3 endpoints)
│   │   ├── service/
│   │   │   └── InterpreterService.java # Orchestration
│   │   ├── lexer/
│   │   │   └── Lexer.java            # Tokenizer (197 lines)
│   │   ├── parser/
│   │   │   └── Parser.java           # AST Builder (204 lines)
│   │   ├── ast/                      # Abstract Syntax Tree
│   │   │   ├── ASTNode.java          # Base interface
│   │   │   ├── ASTVisitor.java       # Visitor pattern
│   │   │   ├── ProgramNode.java      # Root node
│   │   │   ├── EventBlockNode.java   # Event container
│   │   │   ├── SayStatementNode.java # Print statement
│   │   │   └── InputStatementNode.java # Input statement
│   │   ├── interpreter/
│   │   │   └── Interpreter.java      # Code executor
│   │   └── model/                    # Data Transfer Objects
│   │       ├── ExecuteRequest.java
│   │       ├── ExecuteResponse.java
│   │       └── TriggerRequest.java
│   └── src/main/resources/
│       └── application.properties    # Configuration
│
├── frontend/                         # React Frontend
│   ├── package.json                  # Dependencies
│   ├── public/
│   │   └── index.html                # HTML template
│   └── src/
│       ├── index.js                  # Entry point
│       ├── App.js                    # Main component (130 lines)
│       ├── App.css                   # Global styles (203 lines)
│       └── components/
│           ├── EditorComponent.js    # Monaco Editor (46 lines)
│           ├── OutputConsole.js      # Terminal display (44 lines)
│           ├── RunButton.js          # Execute button (134 lines)
│           ├── EventButtons.js       # Dynamic buttons (113 lines)
│           └── ThemeToggle.js        # Theme switcher (43 lines)
│
├── README.md                         # Full documentation (494 lines)
├── QUICKSTART.md                     # Quick start guide (187 lines)
├── SAMPLE_PROGRAMS.md                # 10 sample programs (297 lines)
├── PROJECT_OVERVIEW.md               # This file
└── .gitignore                        # Git ignore rules
```

---

## 🔢 Project Statistics

| Category | Count | Lines of Code |
|----------|-------|---------------|
| Backend Java Files | 13 | ~1,100 |
| Frontend JS Files | 7 | ~500 |
| CSS Styling | 1 | ~200 |
| Documentation | 4 | ~1,200 |
| **Total** | **25 files** | **~3,000 lines** |

---

## 🎨 UI Architecture

### Layout Design

```
┌─────────────────────────────────────────────────────┐
│  HEADER                                             │
│  [EVENTRA Logo] [Subtitle] [🌙/☀️ Toggle]          │
├──────────────────────────┬──────────────────────────┤
│  EDITOR SECTION          │  OUTPUT SECTION          │
│  ┌────────────────────┐  │  ┌────────────────────┐  │
│  │ Monaco Editor      │  │  │ Output Console     │  │
│  │ - Syntax area      │  │  │ - Terminal style   │  │
│  │ - Line numbers     │  │  │ - Auto-scroll      │  │
│  │ - Dark/Light theme │  │  │ - Green text       │  │
│  └────────────────────┘  │  └────────────────────┘  │
│                          │                           │
│  [▶ Run] [🗑 Clear]      │  EVENT TRIGGERS          │
│  [Error messages]        │  [⚡ btn1] [⚡ btn2]...   │
└──────────────────────────┴──────────────────────────┘
```

### Component Hierarchy

```
App (Main Container)
├── Header
│   └── ThemeToggle
├── EditorSection
│   ├── EditorComponent (Monaco)
│   └── RunButton (with API integration)
└── OutputSection
    ├── OutputConsole
    └── EventButtons (Dynamic)
```

---

## ⚙️ Technical Implementation

### Backend Flow

```
HTTP Request → Controller → Service → Lexer → Parser → Interpreter → Response
```

### Frontend Flow

```
User Input → State Update → API Call → Backend Processing → State Update → UI Render
```

### Language Processing Pipeline

```
1. Source Code (USER INPUT)
   ↓
2. Lexer (TOKENIZER)
   Tokens: [START, LBRACE, SAY, STRING, RBRACE, ...]
   ↓
3. Parser (AST BUILDER)
   AST: ProgramNode → EventBlockNode → StatementNode
   ↓
4. Interpreter (EXECUTOR)
   - Build eventMap
   - Auto-trigger "start"
   - Execute statements
   ↓
5. Output (CONSOLE DISPLAY)
```

---

## 🗂️ Key Classes Explained

### 1. Lexer.java
**Purpose**: Convert source code to tokens

**Key Methods**:
- `tokenize()` - Main tokenization loop
- `readString()` - Handle string literals
- `readIdentifier()` - Handle keywords and variables

**Token Types**: START, ON, INPUT, SAY, IDENTIFIER, STRING, LBRACE, RBRACE, NEWLINE, EOF

---

### 2. Parser.java
**Purpose**: Build Abstract Syntax Tree from tokens

**Key Methods**:
- `parse()` - Entry point, returns ProgramNode
- `parseEventBlock()` - Parse start/on blocks
- `parseSayStatement()` - Handle say commands
- `parseInputStatement()` - Handle input commands

**AST Structure**:
```
ProgramNode
└── EventBlockNode (start)
    ├── SayStatementNode
    └── SayStatementNode
```

---

### 3. Interpreter.java
**Purpose**: Execute AST and produce output

**Key Features**:
- Maintains `eventMap`: Map<String, List<ASTNode>>
- Stores variables: Map<String, String>
- Auto-executes "start" event
- Supports manual event triggering

**Visitor Pattern**:
- Implements ASTVisitor interface
- visit() methods for each node type

---

### 4. RunController.java
**Purpose**: REST API endpoints

**Endpoints**:
1. `POST /api/run` - Execute code
2. `POST /api/trigger` - Trigger specific event
3. `POST /api/events` - Get defined events

**Request/Response Pattern**:
```java
// Request
{
  "code": "start { say \"Hello\" }"
}

// Response
{
  "output": "Event triggered: start\nHello\n",
  "success": true
}
```

---

### 5. App.js (React)
**Purpose**: Main application state management

**State Variables**:
- `code` - Editor content
- `output` - Console display
- `events` - Detected events array
- `isDarkMode` - Theme toggle

**Props Flow**:
```javascript
App
├── code → EditorComponent, RunButton, EventButtons
├── output → OutputConsole
├── events → EventButtons
└── isDarkMode → All components
```

---

## 🎯 Language Features

### Current Implementation

✅ **Keywords**:
- `start { }` - Entry point
- `on event { }` - Event handlers
- `say` - Print output
- `input var` - User input

✅ **Data Types**:
- Strings (quoted)
- Variables (identifiers)

✅ **Features**:
- Event-driven execution
- Variable storage
- Automatic event detection
- Manual event triggering

### Future Enhancements

🔲 Arithmetic operations (+, -, *, /)
🔲 Conditional statements (if/else)
🔲 Loops (for, while)
🔲 Functions
🔲 Lists/Arrays
🔲 Boolean logic
🔲 Comparison operators
🔲 Comments in code

---

## 🧪 Testing Guide

### Manual Testing Checklist

#### Backend Tests
- [ ] Start backend successfully
- [ ] Test /api/run with simple code
- [ ] Test /api/trigger with event name
- [ ] Test /api/events returns correct list
- [ ] Verify error handling for invalid syntax

#### Frontend Tests
- [ ] Editor loads correctly
- [ ] Run button executes code
- [ ] Output displays in console
- [ ] Event buttons appear dynamically
- [ ] Theme toggle works
- [ ] Error messages show properly

#### Integration Tests
- [ ] Frontend connects to backend
- [ ] CORS configured correctly
- [ ] Real-time execution works
- [ ] Multiple events handled
- [ ] Variables persist across events

---

## 🚀 Deployment Considerations

### Backend Deployment
- Package as JAR: `mvn clean package`
- Run JAR: `java -jar target/eventra-backend-1.0.0.jar`
- Port: 8080 (configurable)

### Frontend Deployment
- Build: `npm run build`
- Serve build folder with static server
- Update API_BASE_URL for production

### Docker (Future)
```dockerfile
# Backend Dockerfile
FROM openjdk:17-jdk-slim
COPY target/eventra-backend-1.0.0.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]

# Frontend Dockerfile
FROM node:18-alpine
COPY build /usr/share/nginx/html
```

---

## 📈 Performance Metrics

### Expected Performance

| Operation | Time |
|-----------|------|
| Code Execution (< 100 lines) | < 100ms |
| Event Triggering | < 50ms |
| UI Rendering | < 16ms (60fps) |
| API Response | < 200ms |

### Optimization Opportunities

- Lexer caching for repeated code
- Parser result memoization
- Frontend state optimization
- Debounced API calls

---

## 🎓 Learning Outcomes

By studying this project, you'll learn:

### Backend (Java/Spring Boot)
✅ Building interpreters from scratch
✅ Lexer/Parser implementation
✅ AST design patterns
✅ REST API development
✅ CORS configuration
✅ Maven project structure

### Frontend (React)
✅ Component architecture
✅ State management
✅ API integration with Axios
✅ Monaco Editor integration
✅ Theme systems
✅ Responsive design

### Computer Science Concepts
✅ Compiler design basics
✅ Lexical analysis
✅ Parsing techniques
✅ Abstract Syntax Trees
✅ Visitor pattern
✅ Event-driven architecture

---

## 💻 Tech Stack Summary

### Backend
- **Language**: Java 17
- **Framework**: Spring Boot 3.2.0
- **Build Tool**: Maven
- **Architecture**: RESTful API

### Frontend
- **Library**: React 18.2.0
- **Editor**: Monaco Editor 4.6.0
- **HTTP Client**: Axios 1.6.2
- **Styling**: CSS3 with Custom Properties

### Development
- **IDE**: VS Code / IntelliJ IDEA
- **Version Control**: Git
- **Package Managers**: npm, Maven

---

## 🎉 Conclusion

EVENTRA is a complete, production-ready event-driven programming language IDE that demonstrates:

✨ **Clean Architecture** - Separation of concerns
✨ **Modern Stack** - React + Spring Boot
✨ **Educational Value** - Compiler design principles
✨ **User-Friendly** - Intuitive UI with themes
✨ **Extensible** - Easy to add new features
✨ **Well-Documented** - Comprehensive guides

**Total Development Effort**: Full-stack application with custom language implementation

**Best For**: Learning compiler design, building IDEs, event-driven programming concepts

---

## 📞 Quick Reference

### Running the Project
```bash
# Terminal 1 - Backend
cd backend
mvn spring-boot:run

# Terminal 2 - Frontend
cd frontend
npm install
npm start
```

### First Program
```eventra
start {
    say "Hello from EVENTRA!"
}
```

### Documentation Files
- **README.md** - Complete documentation
- **QUICKSTART.md** - 5-minute setup
- **SAMPLE_PROGRAMS.md** - 10 example programs
- **PROJECT_OVERVIEW.md** - This file

---

**Built with ❤️ for learning event-driven programming**

Happy Coding! 🚀
