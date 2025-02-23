const express = require('express');
// const mongoose = require('mongoose');
const redis = require('redis');
const pg = require('pg');


const app = express();
app.use(express.json()); // Fix: Use express.json() middleware properly

// Database Credentials
// const DB_User = 'rahmasamy949';
// const DB_Password = 'vCCRVb6LbgucUIs7';
// const DB_Host = 'mongo'; // Use service name from docker-compose.yml
// const DB_Port = '27017'; // MongoDB runs on 27017 inside the container
// const DB_Name = 'mydatabase';

// Redis Configuration
const Redis_Port = 6379;
const Redis_Host = 'redis'; // Use service name from docker-compose.yml

// MongoDB Connection URL
// const mongoUrl = `mongodb://${DB_User}:${DB_Password}@${DB_Host}:${DB_Port}/${DB_Name}?authSource=admin`;

// // Connect to MongoDB
// mongoose
//   .connect(mongoUrl)

//   .then(() => {
//     console.log("✅ Connected to MongoDB inside Docker!");
//   })
//   .catch((err) => {
//     console.error("❌ MongoDB connection error:", err);
//   });

// Connect to Redis
const client = redis.createClient({
  socket: {
    host: Redis_Host,
    port: Redis_Port,
  },
});

client.on('error', (err) => console.error('❌ Redis Client Error:', err));
client.on('connect', () => console.log('✅ Redis Client connected...'));

client.connect();

// Routes
app.get('/', async (req, res) => {
  await client.set("hello_message", "Hello, Docker with Node.js!");
  res.send('Hello, Docker with Node.js using dockerhub!');
});

app.get('/data', async (req, res) => {
  const message = await client.get("hello_message");
  res.send("hello_message: " + message);
});


const { Client } = pg

const DB_User_ = 'sibadmin';
const DB_Password_ = 'NCgNf2zydojQq5fd';
const DB_Host_ = 'postgres'; // Use service name from docker-compose.yml
const DB_Port_ = '5432'; // MongoDB runs on 27017 inside the container
const DB_Name_ = 'itslib_s_v03';

const connectionString = `postgresql://${DB_User_}:${DB_Password_}@${DB_Host_}:${DB_Port_}/${DB_Name_}`;
const pgClient = new Client({
  connectionString
});



pgClient
	.connect()
	.then(() => {
		console.log('✅ Postgress Client connected...');
	})
	.catch((err) => {
		console.error('Error connecting to PostgreSQL database', err);
	});
  

// Start Server
app.listen(4000, '0.0.0.0', () => {
  console.log('Server is running on port 4000');
});
