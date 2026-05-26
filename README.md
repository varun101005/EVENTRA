# EVENTRA - Event-Driven Programming Language

A full-stack web-based event-driven programming language with an interpreter built in Java (Spring Boot) and React frontend.

![EVENTRA](https://img.shields.io/badge/version-1.0.0-blue)
![Java](https://img.shields.io/badge/Java-17-orange)
![React](https://img.shields.io/badge/React-18-blue)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2-brightgreen)

---

## 🌟 Features

- **Code Editor**: Monaco Editor-based IDE for writing EVENTRA code
- **Real-time Execution**: Run code and see output instantly
- **Event System**: Define and trigger events dynamically
- **Theme Support**: Dark mode (default) and Light mode
- **Interactive Console**: Terminal-like output display
- **Event Trigger UI**: Auto-generated buttons for events
- **Variable Support**: Input/output with variable storage
- **Error Handling**: Graceful error messages

---

## 📋 Prerequisites

### Backend:
- Java 17 or higher
- Maven 3.6+

### Frontend:
- Node.js 16 or higher
- npm 8 or higher

---

## 🚀 Installation & Setup

### Step 1: Clone or Download the Project

Navigate to the project directory:
```bash
cd project
```

### Step 2: Setup Backend

```bash
cd backend

# Install dependencies
mvn clean install

# Run Spring Boot application
mvn spring-boot:run
```

The backend will start on **http://localhost:8080**

### Step 3: Setup Frontend

Open a new terminal:
```bash
cd frontend

# Install dependencies
npm install

# Start React development server
npm start
```

The frontend will open on **http://localhost:3000**

---

## 🎯 LANGUAGE SYNTAX

### Basic Structure

```eventra
start {
    say "Hello, World!"
}

on eventName {
    // statements
}
```

### Keywords

| Keyword | Description | Example |
|---------|-------------|---------|
| `start` | Entry point event (auto-executes) | `start { ... }` |
| `on` | Define an event handler | `on click { ... }` |
| `say` | Print output | `say "Hello"` |
| `input` | Get user input | `input name` |

### Variables

Variables are dynamically typed and stored as strings:

```eventra
start {
    input username
    say "Hello, " + username
}
```

---

## 📝 Sample Programs

### 1. Hello World

```eventra
start {
    say "Hello, World!"
    say "Welcome to EVENTRA!"
}
```

**Output:**
```
Event triggered: start
Hello, World!
Welcome to EVENTRA!
```

---

### 2. Interactive Greeting

```eventra
start {
    say "What is your name?"
    input name
    say "Nice to meet you, " + name
}
```

**Output:**
```
Event triggered: start
What is your name?
Waiting for input: name
Nice to meet you, [name]
```

---

### 3. Multiple Events

```eventra
start {
    say "Program started!"
    say "Click buttons below to trigger events"
}

on click {
    say "Button clicked!"
}

on login {
    say "User logged in successfully"
}

on logout {
    say "User logged out"
}
```

---

### 4. Simple Calculator

```eventra
start {
    say "Simple Calculator"
    input num1
    input num2
    say "Numbers stored!"
}

on add {
    say "Addition operation"
}

on subtract {
    say "Subtraction operation"
}
```

---

### 5. Story Builder

```eventra
start {
    say "Let's create a story!"
    input character
    input place
    say "Once upon a time..."
    say "A brave hero named " + character
    say "ventured into " + place
}

on adventure {
    say "The adventure begins!"
}

on ending {
    say "And they lived happily ever after!"
}
```

---

## 🖥️ UI Layout

```
┌─────────────────────────────────────────────────────┐
│  EVENTRA                        [Dark/Light Toggle] │
│  Event-Driven Programming Language                  │
├──────────────────────────┬──────────────────────────┤
│  Code Editor             │  Output Console          │
│  ┌────────────────────┐  │  ┌────────────────────┐  │
│  │ start {            │  │  │ Event triggered:   │  │
│  │   say "Hello"      │  │  │ start              │  │
│  │ }                  │  │  │ Hello              │  │
│  │                    │  │  │                    │  │
│  │ on click {         │  │  │                    │  │
│  │   say "Clicked!"   │  │  │                    │  │
│  │ }                  │  │  │                    │  │
│  └────────────────────┘  │  └────────────────────┘  │
│                          │                           │
│  [▶ Run] [🗑 Clear]      │  Event Triggers           │
│                          │  [⚡ click] [⚡ login]     │
└──────────────────────────┴──────────────────────────┘
```

---

## 🔧 API Endpoints

### POST /api/run
Execute EVENTRA code

**Request:**
```json
{
  "code": "start { say \"Hello\" }"
}
```

**Response:**
```json
{
  "output": "Event triggered: start\nHello\n",
  "success": true
}
```

### POST /api/trigger
Trigger a specific event

**Request:**
```json
{
  "eventName": "click",
  "code": "on click { say \"Clicked\" }"
}
```

**Response:**
```json
{
  "output": "Event triggered: click\nClicked\n",
  "success": true
}
```

### POST /api/events
Get all defined events

**Request:**
```json
{
  "code": "start {} on click {} on login {}"
}
```

**Response:**
```json
{
  "events": ["start", "click", "login"],
  "success": true
}
```

---

## 🏗️ Architecture

### Backend (Spring Boot)

```
com.eventra/
├── EventraApplication.java    # Main Spring Boot app
├── config/
│   └── CorsConfig.java        # CORS configuration
├── controller/
│   └── RunController.java     # REST API endpoints
├── service/
│   └── InterpreterService.java # Orchestration layer
├── lexer/
│   └── Lexer.java             # Tokenizer
├── parser/
│   └── Parser.java            # AST builder
├── ast/
│   ├── ASTNode.java           # Base interface
│   ├── ASTVisitor.java        # Visitor pattern
│   ├── ProgramNode.java       # Root AST node
│   ├── EventBlockNode.java    # Event block
│   ├── SayStatementNode.java  # Say statement
│   └── InputStatementNode.java # Input statement
├── interpreter/
│   └── Interpreter.java       # AST executor
└── model/
    ├── ExecuteRequest.java    # Run request DTO
    ├── ExecuteResponse.java   # Run response DTO
    └── TriggerRequest.java    # Trigger request DTO
```

### Frontend (React)

```
src/
├── index.js                   # React entry point
├── App.js                     # Main component
├── App.css                    # Global styles
└── components/
    ├── EditorComponent.js     # Monaco Editor wrapper
    ├── OutputConsole.js       # Terminal display
    ├── RunButton.js           # Execute button
    ├── EventButtons.js        # Dynamic event buttons
    └── ThemeToggle.js         # Dark/Light toggle
```

---

## 🎨 Theme System

### Dark Mode (Default)
- Background: `#1e1e2e`
- Accent: `#7aa2f7`
- Text: `#ffffff`
- Console: `#1a1a2e`

### Light Mode
- Background: `#f5f5f5`
- Accent: `#4a6fa5`
- Text: `#1a1a2e`
- Console: `#f0f0f0`

---

## 🐛 Error Handling

The interpreter handles errors gracefully:

1. **Syntax Errors**: Invalid keywords or structure
2. **Runtime Errors**: Unknown events or variables
3. **Network Errors**: Backend connection issues

Example error message:
```
Error: Expected '{' after event name at line 1
```

---

## 🧪 Testing

### Test the Backend

```bash
cd backend
mvn test
```

### Test the Frontend

```bash
cd frontend
npm test
```

---

## 📚 How It Works

### Execution Flow

1. **User writes code** in Monaco Editor
2. **Frontend sends code** to backend via `/api/run`
3. **Backend processes**:
   - Lexer tokenizes the code
   - Parser builds AST from tokens
   - Interpreter executes AST
4. **Output returned** and displayed in console
5. **Events detected** and buttons created dynamically
6. **User clicks event button** → triggers `/api/trigger`

### Interpreter Process

```
Source Code → Lexer → Tokens → Parser → AST → Interpreter → Output
```

### Event Map

The interpreter maintains an event map:
```java
Map<String, List<ASTNode>> eventMap
```

- Key: Event name (e.g., "start", "click")
- Value: List of statements to execute

---

## 💡 Tips

1. **Always include a `start` block** for initial execution
2. **Use meaningful event names** (e.g., `onClick`, `onLogin`)
3. **Test incrementally** - run small code snippets first
4. **Check the console** for error messages
5. **Use dark mode** for reduced eye strain (recommended)

---

## 🔮 Future Enhancements

- [ ] Syntax highlighting for EVENTRA language
- [ ] Auto-complete suggestions
- [ ] Debugging tools (breakpoints, step-through)
- [ ] Save/load programs
- [ ] Export programs as files
- [ ] More data types (numbers, booleans)
- [ ] Arithmetic operations
- [ ] Conditional statements (if/else)
- [ ] Loops
- [ ] Functions

---

## 📄 License

MIT License - Feel free to use and modify!

---

## 👨‍💻 Author

Built with ❤️ using React & Spring Boot

---

## 🆘 Troubleshooting

### Backend won't start
- Ensure Java 17 is installed: `java -version`
- Check if port 8080 is available
- Run: `mvn clean install` first

### Frontend won't connect
- Ensure backend is running on port 8080
- Check browser console for CORS errors
- Verify `API_BASE_URL` in components

### Monaco Editor not loading
- Run `npm install` in frontend directory
- Clear node_modules and reinstall

---

## 📞 Support

For issues or questions, check the code comments for detailed explanations of each component.

Happy Coding with EVENTRA! 🎉
