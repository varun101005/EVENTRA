// ========================================
// EVENTRA Sample Programs
// Copy and paste these into the code editor
// ========================================

// SAMPLE 1: Hello World
// ======================
start {
    say "Hello, World!"
    say "Welcome to EVENTRA!"
    say "This is an event-driven programming language"
}


// SAMPLE 2: Interactive Greeting
// ===============================
start {
    say "=================================="
    say "Welcome to the Greeting Program!"
    say "=================================="
    input name
    say ""
    say "Nice to meet you, " + name
    say "I hope you enjoy using EVENTRA!"
}


// SAMPLE 3: Multiple Events Demo
// ===============================
start {
    say "Program Started!"
    say "Try clicking the event buttons below:"
    say "- click"
    say "- login"
    say "- logout"
}

on click {
    say "🖱️ Button clicked!"
    say "You triggered the click event"
}

on login {
    say "🔐 Login event triggered"
    say "User authentication successful"
}

on logout {
    say "👋 Logout event triggered"
    say "User session ended"
}


// SAMPLE 4: Story Builder
// ========================
start {
    say "✨ STORY BUILDER ✨"
    say "==================="
    say ""
    say "Let's create an adventure story!"
    say ""
    input hero
    say ""
    input villain
    say ""
    input place
    say ""
    say "📖 Once upon a time..."
    say "There was a brave hero named " + hero
    say "Who faced a dangerous villain: " + villain
    say "In a mystical land called: " + place
    say ""
    say "To be continued..."
}

on battle {
    say "⚔️ BATTLE SCENE TRIGGERED!"
    say hero + " fights against " + villain
    say "The battle is intense!"
}

on victory {
    say "🎉 VICTORY!"
    say hero + " defeats " + villain
    say "Peace returns to " + place
}


// SAMPLE 5: Simple Calculator
// ============================
start {
    say "🔢 SIMPLE CALCULATOR"
    say "===================="
    say ""
    say "Enter two numbers:"
    input num1
    input num2
    say ""
    say "Numbers stored: " + num1 + " and " + num2
    say "Click operation buttons below"
}

on add {
    say "➕ ADDITION"
    say "Result: " + num1 + " + " + num2 + " = ???"
    say "(Note: Arithmetic coming soon!)"
}

on subtract {
    say "➖ SUBTRACTION"
    say "Result: " + num1 + " - " + num2 + " = ???"
    say "(Note: Arithmetic coming soon!)"
}

on multiply {
    say "✖️ MULTIPLICATION"
    say "Result: " + num1 + " * " + num2 + " = ???"
    say "(Note: Arithmetic coming soon!)"
}


// SAMPLE 6: User Registration System
// ===================================
start {
    say "👤 USER REGISTRATION SYSTEM"
    say "==========================="
    say ""
    say "Please enter your details:"
    say ""
    input username
    input email
    input age
    say ""
    say "✅ Registration Complete!"
    say ""
    say "Profile Summary:"
    say "Username: " + username
    say "Email: " + email
    say "Age: " + age
}

on verify {
    say "🔍 Verifying user information..."
    say "Checking email format..."
    say "Validating age..."
    say "✅ Verification successful!"
}

on save {
    say "💾 Saving user data to database..."
    say "User " + username + " saved successfully!"
    say "Welcome aboard!"
}


// SAMPLE 7: Quiz Game
// ====================
start {
    say "🧠 QUIZ GAME"
    say "============"
    say ""
    say "Answer the following questions:"
    say ""
    input answer1
    say ""
    say "Question 2: What is the capital of France?"
    input answer2
    say ""
    say "Question 3: What is 5 + 3?"
    input answer3
    say ""
    say "📊 Results:"
    say "Answer 1: " + answer1
    say "Answer 2: " + answer2
    say "Answer 3: " + answer3
}

on showResults {
    say "📈 SHOWING RESULTS..."
    say "Calculating score..."
    say "Quiz completed!"
}

on reset {
    say "🔄 Resetting quiz..."
    say "All answers cleared"
    say "Ready for new attempt!"
}


// SAMPLE 8: Task Manager
// =======================
start {
    say "✅ TASK MANAGER"
    say "==============="
    say ""
    say "Enter a task:"
    input task
    say ""
    say "Task added: " + task
    say ""
    say "Use buttons below to manage tasks"
}

on complete {
    say "✓ Task marked as complete!"
    say "Great job!"
}

on delete {
    say "🗑️ Task deleted"
    say "Task removed from list"
}

on list {
    say "📋 CURRENT TASKS:"
    say "1. " + task
    say ""
    say "Total tasks: 1"
}


// SAMPLE 9: Weather App Simulation
// =================================
start {
    say "🌤️ WEATHER APP"
    say "=============="
    say ""
    say "Enter city name:"
    input city
    say ""
    say "Fetching weather for " + city + "..."
    say ""
    say "Weather Information:"
    say "City: " + city
    say "Temperature: 25°C"
    say "Condition: Sunny ☀️"
}

on refresh {
    say "🔄 Refreshing weather data..."
    say "Updating from satellite..."
    say "Weather updated successfully!"
}

on forecast {
    say "📅 7-DAY FORECAST"
    say "Monday: Sunny ☀️"
    say "Tuesday: Cloudy ⛅"
    say "Wednesday: Rainy 🌧️"
    say "Thursday: Sunny ☀️"
    say "Friday: Partly Cloudy ⛅"
}


// SAMPLE 10: Chat Bot Simulator
// ==============================
start {
    say "🤖 CHAT BOT"
    say "==========="
    say ""
    say "Bot: Hello! I'm EVENTRA Bot"
    say "Bot: What's your name?"
    input name
    say ""
    say "Bot: Nice to meet you, " + name
    say "Bot: How are you feeling today?"
    input mood
    say ""
    say "Bot: That's great that you're " + mood
    say "Bot: Want to chat more?"
}

on joke {
    say "🃏 Bot: Why did the programmer quit his job?"
    say "🃏 Bot: Because he didn't get arrays!"
    say "🃏 Bot: Haha! 😄"
}

on help {
    say "ℹ️ Bot: I can tell jokes, chat with you,"
    say "ℹ️ Bot: or just hang out!"
    say "ℹ️ Bot: Try the buttons below!"
}

on bye {
    say "👋 Bot: Goodbye, " + name
    say "👋 Bot: Have a great day!"
    say "👋 Bot: Come back soon!"
}


// ========================================
// END OF SAMPLE PROGRAMS
// Pick any sample and run it!
// ========================================
