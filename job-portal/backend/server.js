require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jobportal', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB Connection Error:', err));

const User = require('./models/User'); 

// Passport Configuration
passport.use(new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  try {
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      return done(null, false, { message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return done(null, false, { message: 'Invalid credentials' });
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/jobportal'
  }),
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  }
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({ 
    success: true, 
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      profileCompletion: req.user.profileCompletion
    }
  });
});

app.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ error: 'Logout failed' });
    res.json({ success: true });
  });
});

app.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ 
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        profileCompletion: req.user.profileCompletion
      }
    });
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});


app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    
    const user = await User.create({ name, email, password });
    

    req.login(user, (err) => {
      if (err) throw err;
      res.status(201).json({
        message: 'Registration successful',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          profileCompletion: user.profileCompletion
        }
      });
    });
    
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.get('/jobs', (req, res) => {
  const jobs = [
    { id: 1, title: 'Frontend Developer', company: 'Tech Corp', location: 'Remote', salary: '$80k - $100k' },
    { id: 2, title: 'Backend Engineer', company: 'Data Systems', location: 'New York', salary: '$90k - $120k' },
    { id: 3, title: 'UX Designer', company: 'Creative Agency', location: 'San Francisco', salary: '$75k - $95k' }
  ];
  res.json(jobs);
});

app.listen(5000, () => console.log('Server running on port 5000'));
