
const mongoose = require('mongoose');
const keys = require('../config/keys');


const uri = `mongodb+srv://${keys.mongoDB.user}:${keys.mongoDB.mongoClusterPassword}@${keys.mongoDB.user}.xdrsx1s.mongodb.net/?retryWrites=true&w=majority&appName=transyltoonia`

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await mongoose.disconnect();
  }
}
run().catch(console.dir);

//3rmM5eYFiVJNN9R