const { MongoClient } = require("mongodb");

// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb://localhost:27017";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("Successfully connected to server!");

    const database = client.db('fruitsDB');
    const fruits = database.collection('fruits');

    const fruitInfo = [
        { name: 'Apple', score: 8, review: 'Great fruit' },
        { name: 'Orange', score: 6, review: 'Kinda sour' },
        { name: 'Banana', score: 9, review: 'Great stuff!' }
      ];

    // This option prevents additional documents from being inserted if one fails
    const options = { ordered: true };
    
    const result = await fruits.insertMany(fruitInfo, options);
    console.log(`${result.insertedCount} documents were inserted.`);

    const cursor = fruits.find({});

    if ((await cursor.count()) === 0) {
        console.log("No documents found!");
    }

    await cursor.forEach((fruit) => {
        console.log(fruit);
    });

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);