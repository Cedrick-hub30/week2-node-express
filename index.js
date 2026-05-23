// ============================================
// PART 1: Setup — Load tools we need
// ============================================

// dotenv reads your .env file and makes PORT=3000 available in your code
require('dotenv').config();

// Express is the framework that helps us build the API easily
const express = require('express');

// This creates your actual app/server
const app = express();


// ============================================
// PART 2: Middleware
// ============================================
// Middleware = code that runs on EVERY request before it reaches your routes
// Think of it like a security check at an airport — every passenger (request)
// goes through it before reaching their gate (route)

// MIDDLEWARE 1: JSON Parser
// When someone sends data to your API (like name and email),
// they send it as JSON text. This middleware converts that text
// into a real JavaScript object your code can use.
app.use(express.json());

// MIDDLEWARE 2: Custom Request Logger (Bonus requirement!)
// This runs on every single request and prints it to your terminal
// so you can see what's happening in real time
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  // req = the incoming request, res = the response we'll send back
  // next() = "okay, done here, move on to the actual route"
  next();
});

// MIDDLEWARE 3: Static File Server
// This tells Express: "if someone visits a URL that matches a file
// in the 'public' folder, just send that file"
// So visiting / will automatically serve public/index.html
app.use(express.static('public'));


// ============================================
// PART 3: Routes (the actual API endpoints)
// ============================================
// A route = a URL path + what to do when someone visits it
// req = request (what came in), res = response (what we send back)

// ROUTE 1: GET /
// When someone visits http://localhost:3000/ they get the HTML page
// (handled automatically by express.static above)
// But if they call /api they get a text message
app.get('/api', (req, res) => {
  res.send('My Week 2 API!');
});

// ROUTE 2: POST /user
// POST means "I'm sending you data"
// This route expects the user to send { name, email } in the request body
app.post('/user', (req, res) => {
  
  // req.body contains the data the user sent
  // We "destructure" it to get name and email directly
  const { name, email } = req.body;

  // Error handling: if name OR email is missing, stop and send a 400 error
  // 400 means "Bad Request" — the user sent incomplete data
  if (!name || !email) {
    return res.status(400).json({ error: 'Missing name or email' });
  }

  // If everything is fine, send back a greeting
  res.json({ message: `Hello, ${name}!` });
});

// ROUTE 3: GET /user/:id
// The :id is a "URL parameter" — it's a variable in the URL
// So /user/42 means id = 42, /user/alice means id = alice
app.get('/user/:id', (req, res) => {
  const { id } = req.params; // req.params holds URL parameters like :id
  res.json({ message: `User ${id} profile` });
});


// ============================================
// PART 4: Start the server
// ============================================

// Read PORT from .env file (process.env.PORT = 3000)
// If for some reason .env doesn't load, default to 3000
const PORT = process.env.PORT || 3000;

// .listen() starts the server and keeps it running
// The callback function runs once when the server successfully starts
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});