const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;
const dotenv = require('dotenv');
const Entry = require('./schemas/entry.js');

dotenv.config();
mongoose.connect(`mongodb+srv://doadmin:${process.env.MONGO_PASSWORD}@db-budget-bdd84f18.mongo.ondigitalocean.com/admin?replicaSet=db-budget&tls=true&authSource=admin`);

app.use(cors());
app.use(express.json());

app.get('/api/hello/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/entries/', (req, res) => {
  Entry.find({}).then((entries) => {
    res.status(200).send(entries);
  }).catch((err) => {
    res.status(400).send(JSON.stringify(err));
  });
});

app.post('/api/entry/', (req, res) => {
  Entry.create({
    title: req.body.title,
    budget: req.body.budget
  }).then(() => {
    res.status(200).send("Entry created successfully");
  }).catch((err) => {
    res.status(400).send(JSON.stringify(err));
  });
});

app.listen(port, () => {
  console.log('Server started on port', port);
});