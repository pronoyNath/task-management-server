// user: taskManagement
// pass: $94gasA$$!32Vm2
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config()

// middlewares
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    // "https://grand-hotel-daa65.web.app",
    // "https://grand-hotel-daa65.firebaseapp.com"
  ],
  credentials: true
}));
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jxzfy8n.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const database = client.db("taskManagementDB");
    // products Collection
    // const roomsCollection = database.collection("rooms");
    // const bookRooms = database.collection("bookRooms")
    // const userReviewCollection = database.collection("userReviewCollection")
    const usersCollection = database.collection("userInfo")



    // user info api 
    app.post('/user-info', async (req, res) => {
        const user = req.body;
        console.log("user-info:", user);
        const result = await usersCollection.insertOne(user)
        res.send(result)
    })
    // Get user info
    app.get('/user/:email', async (req, res) => {
        const email = req.params.email
        const result = await usersCollection.findOne({ email })
        res.send(result)
      })



    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);






app.get('/', (req, res) => {
    res.send("Running onnn....")
  })
  
  app.listen(port, () => {
    console.log(`task management server is running on port ${port}`);
  })