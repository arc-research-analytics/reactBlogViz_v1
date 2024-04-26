import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";

// Load environment variables from .env file
dotenv.config();

// create an instance of the Express server
const app = express();

// middleware functions to the Express application
app.use(cors());
app.use(express.json());

// MongoDB connection URL
const uri = process.env.MONGODB_URI;

// Connect to MongoDB
async function connectToDB() {
  try {
    const client = await MongoClient.connect(uri);
    const db = client.db("ARC_R&A");
    // console.log("Connected to MongoDB!");
    return db;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

// Define API endpoints
app.get("/api/data/:collectionName/:blogId", async (req, res) => {
  try {
    const db = await connectToDB();
    // example query: mongo-test?collectionName=Blog&id=FultonCounty_test
    const collection = db.collection(req.params.collectionName);
    const blogId = req.params.blogId;
    // Query collection and send response
    const data = await collection.find({ blogId }).toArray();
    if (data) {
      res.json(data);
    } else {
      res.status(404).json({ message: "Document not found" });
    }
  } catch (error) {
    console.error("Error fetching data from MongoDB:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
const PORT = process.env.PORT || 5001;
connectToDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Backend server running on Port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
    process.exit(1);
  });
