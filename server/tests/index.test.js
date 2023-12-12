const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

describe('insert', () => {
  let connection;
  let db;

  beforeAll(async () => {

    dotenv.config();

    connection = await MongoClient.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db();
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should insert a doc into collection', async () => {
    const users = db.collection('users');
    const test_id = new mongoose.Types.ObjectId();

    const testUser = {
      _id: test_id, 
      username: 'John',
      email: 'John@Doe.com',
      password: '$2b$10$e7pXIQuQNviuYqowd1Dsq.rGzNKJpKPNXdWza2YwtWvF04JPK1aUA',
      entries: [],
      created: new Date(),
    };
    await users.insertOne(testUser);

    const insertedUser = await users.findOne({_id: test_id});
    expect(insertedUser).toEqual(testUser);
  });
});

