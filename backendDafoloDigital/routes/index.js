var express = require('express');
var router = express.Router();

const { MongoClient } = require('mongodb');

const connectionString = 'mongodb+srv://Matti5:Matti12345hmh@cluster0.qaxcq.mongodb.net/?retryWrites=true&w=majority'; // Replace with your actual connection string
const app = express();
var rateLimit = require('express-rate-limit');


MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then((client) => {
    console.log('Connected to MongoDB Atlas');
    const db = client.db(); // Access your database using the client object

    // ... Define your routes and middleware here ...

    // Start the server

const mailLimit = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 1, // Limit each IP to 65 requests per `window` (here, per 15 minutes)
      standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
      legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

 router.get('/team', async function(req,res,next) {
  const team =await db.collection("team").find().toArray();
  
  res.json(team)
})

router.get('/technologies', async function(req,res,next) {
  const team =await db.collection("technologies").find().toArray();
  
  res.json(team)
})

router.post('/mail', mailLimit, async function(req,res,next) {
  const data = req.body; // Assuming you're sending JSON data in the request body

  // Insert the data into the collection
  db.collection("mail")
    .insertOne(data)
    .then(() => {
      res.status(200).send('Data saved to MongoDB');
    })
    .catch((error) => {
      console.error('Error saving data to MongoDB:', error);
      res.status(500).send('Error saving data to MongoDB');
    });
})

})

module.exports = router;
