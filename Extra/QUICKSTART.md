# 🚀 EVENTRA - Quick Start Guide

Get up and running with EVENTRA in under 5 minutes!

---

## ⚡ Quick Installation

### Step 1: Install Dependencies

**Backend:**
```bash
cd backend
mvn clean install
```

**Frontend:**
```bash
cd frontend
npm install
```

### Step 2: Run the Application

**Terminal 1 (Backend):**
```bash
cd backend
mvn spring-boot:run
```

Wait for: `EVENTRA Backend Started Successfully!`

**Terminal 2 (Frontend):**
```bash
cd frontend
npm start
```

Browser will open automatically at: `http://localhost:3000`

---

## 🎯 Your First EVENTRA Program

### Try this simple program:

```eventra
start {
    say "Hello, World!"
    say "Welcome to EVENTRA!"
}
```

**Steps:**
1. Copy the code above
2. Paste into the code editor
3. Click **▶ Run Code** button
4. See output in console!

---

## 🎮 Interactive Example

Try this program with multiple events:

```eventra
start {
    say "Welcome!"
    input name
    say "Hello, " + name
}

on click {
    say "🖱️ You clicked the button!"
}

on greet {
    say "👋 Hi there, " + name
}
```

**What happens:**
1. Click **Run Code** → starts automatically
2. Enter your name when prompted
3. Click event buttons (**⚡ click**, **⚡ greet**) to trigger events

---

## 🎨 Theme Toggle

- Click **🌙 Dark Mode** or **☀️ Light Mode** button in header
- Dark mode is default (recommended for coding)

---

## 📝 Syntax Quick Reference

| Keyword | Purpose | Example |
|---------|---------|---------|
| `start { }` | Entry point (auto-runs) | `start { say "Hi" }` |
| `on event { }` | Define event handler | `on click { ... }` |
| `say` | Print output | `say "Hello"` |
| `input var` | Get user input | `input name` |

---

## 🔧 Troubleshooting

### Backend won't start?
```bash
# Check Java version (need Java 17+)
java -version

# Clean and rebuild
cd backend
mvn clean install
mvn spring-boot:run
```

### Frontend shows connection error?
- Ensure backend is running on port 8080
- Check browser console (F12) for errors
- Restart frontend: `npm start`

### Monaco Editor not loading?
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm start
```

---

## 💡 Pro Tips

1. **Start Simple**: Begin with basic `start { }` blocks
2. **Test Often**: Run code frequently to catch errors early
3. **Use Events**: Create multiple `on event { }` handlers for interactivity
4. **Check Console**: Output console shows execution logs
5. **Dark Mode**: Better for extended coding sessions

---

## 📚 Next Steps

After getting comfortable:

1. **Explore Sample Programs** - See `SAMPLE_PROGRAMS.md`
2. **Build Your Own** - Create custom programs
3. **Share Ideas** - Experiment with different event patterns

---

## 🎓 Learning Path

### Beginner (15 mins)
- ✅ Hello World program
- ✅ Input/output with variables
- ✅ Multiple events

### Intermediate (30 mins)
- ✅ Story builder game
- ✅ Quiz application
- ✅ Task manager

### Advanced (1 hour)
- ✅ Chat bot simulator
- ✅ Weather app mockup
- ✅ Multi-feature applications

---

## 🆘 Need Help?

- **Check README.md** - Full documentation
- **See SAMPLE_PROGRAMS.md** - More examples
- **Inspect Console** - Error messages shown in output

---

## 🎉 You're Ready!

Start building amazing event-driven applications with EVENTRA!

Happy Coding! 🚀
