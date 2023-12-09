// Packages
import compression from "compression";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv"
import jsonwebtoken from "jsonwebtoken";
import bcrpyt from "bcrypt";

// Schemas
import User from "./schemas/user.js";
import Entry from "./schemas/entry.js";

// Load environment variables
dotenv.config();

// Define app and port
const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(`mongodb+srv://doadmin:j0FQB9IE5X7341v8@db-budget-bdd84f18.mongo.ondigitalocean.com/admin?tls=true&authSource=admin&replicaSet=db-budget`);

// Middleware
app.use(compression());
app.use(cors());
app.use(express.json());

// Get routes ---------------------------------------------------------------

/* 
 * /api/hello - Returns "Hello World!" for testing purposes
 */
app.get('/api/hello/', (req, res) => {
  res.send('Hello World!');
});

/* 
 * /api/entries - Returns all entries in the database for the logged in user
 */
app.get('/api/entries/', authenticateToken, (req, res) => {

  User.findOne({email: req.user.email}).then((user) => {
    if (user === null) {
      res.status(400).send("Invalid user");
      return;
    }

    Entry.find({userId: new mongoose.Types.ObjectId(user._id)}).then((entries) => {
      res.status(200).send(entries);
    }).catch((err) => {
      res.status(400).send(JSON.stringify(err));
    });

  }).catch((err) => {
    res.status(400).send(JSON.stringify(err));
  });

});

// Post routes ---------------------------------------------------------------

/*
 * /api/register/ - Registers a new user
 */
app.post('/api/register/', (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  if (username === undefined) {
    res.status(400).end("Username not provided");
    return;
  }

  if (email === undefined) {
    res.status(400).end("Email not provided");
    return;
  }

  if (password === undefined) {
    res.status(400).end("Password not provided");
    return;
  }

  const encryptedPassword = encryptPassword(password);

  User.findOne({email: email}).then((user) => {
    if (user !== null) {
      res.status(400).end("Email already in use");
      return;
    }

    User.create({
      username: username,
      email: email,
      password: encryptedPassword
    }).then(() => {
      const token = generateAccessToken(email);
      res.status(200).end(token);
    }).catch((err) => {
      res.status(400).end(JSON.stringify(err));
    });

  }).catch((err) => {
    res.status(400).end(JSON.stringify(err));
  });
});

/*
* /api/login/ - Logs in a user
*/
app.post('/api/login/', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (email === undefined || password === undefined) {
    res.status(400).end("Email or password not provided");
    return;
  }

  User.findOne({email: email}).then((user) => {
    if (user === null) {
      res.status(400).end("Invalid email");
      return;
    }

    if (!comparePassword(password, user.password)) {
      res.status(400).end("Invalid password");
      return;
    }

    const token = generateAccessToken(email);
    res.status(200).json(token);
  }).catch((err) => {
    res.status(400).send(JSON.stringify(err));
  });
});


/* 
 * /api/entry/ - Creates a new entry in the database
 */
app.post('/api/entry/', authenticateToken, (req, res) => {

  // Find user from email
  User.findOne({
    email: req.user.email
  }).then((user) => {

    if (user === null) {
      res.status(400).send("Invalid user");
      return;
    }

    // Create entry
    Entry.create({
      title: req.body.title,
      budget: req.body.budget,
      userId: user._id
    }).then((entry) => {
      
      // Add entry to user
      User.findOne({
        email: req.user.email
      }).then((user) => {

        user.entries.push(entry._id);
        user.save();
        res.status(200).send("Entry created");

      }).catch((err) => {
        res.status(400).send(JSON.stringify(err));
      });
  
    }).catch((err) => {
      res.status(400).send(JSON.stringify(err));
    });

  }).catch((err) => {
    res.status(400).send(JSON.stringify(err));
  });
  
});

// Start server ---------------------------------------------------------------

app.listen(port, () => {
  console.log('Server started on port', port);
});

// Helper functions ---------------------------------------------------------------

function generateAccessToken(email) {
  const token = jsonwebtoken.sign({
    email: email
  }, process.env.JWT_TOKEN, { expiresIn: '10m' });

  return token;
}

function authenticateToken(req, res, next){
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token === undefined) {
    res.status(401).send("No token provided");
    return;
  }

  jsonwebtoken.verify(token, process.env.JWT_TOKEN, (err, user) => {
    if (err) {
      res.status(403).send("Invalid token");
      return;
    }

    req.user = user;
    next();
  });
}

function encryptPassword(password) {
  const salt = bcrpyt.genSaltSync(10);
  const hash = bcrpyt.hashSync(password, salt);
  return hash;
}

function comparePassword(password, hash) {
  return bcrpyt.compareSync(password, hash);
}