const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const Stripe = require('stripe');

const app = express();
app.use(cors());
// app.use(express.json());
app.use(express.json({ limit: '100mb' }));


const PORT = process.env.PORT || 8080;

// MongoDB connection
console.log(process.env.MONGODB_URL);
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
  });

// Schema
const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true
  },
  password: String,
  confirmPassword: String,
  image: String,
});

// Model
const userModel = mongoose.model("user", userSchema);

// API Sign up
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.post("/signup", async (req, res) => {
  console.log(req.body);
  const { email } = req.body;

  try {
    const result = await userModel.findOne({ email: email }).exec();

    if (result) {
      res.status(400).json({ message: "Email id is already registered", alert: false });
    } else {
      // Create a new user and save it to the database
      const data = new userModel(req.body);
      await data.save();
      res.status(201).json({ message: 'Successfully signed up', alert: true });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//API Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await userModel.findOne({ email, password }).exec();

    if (result) {
      const dataSend = {
        _id: result._id,
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
        image: result.image
      }
      console.log(dataSend);
      res.status(200).json({ message: "Logged in successfully", alert: true, data: dataSend });
    } else {
      res.status(401).json({ message: "Invalid email or password", alert: false });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//---------------------product section--------------------------------
const schemaProduct = mongoose.Schema({
  name: String,
  category: String,
  image: String,
  price: String,
  description: String
});
const productModel = mongoose.model("product", schemaProduct);

//API save product in database
app.post("/uploadProduct", async (req, res) => {
  console.log(req.body);
  const data = await productModel(req.body);
  const datasave = await data.save();

  res.send({ message: "Uploaded successfully" });
});

//API to fetch all stored data
app.get("/product", async (req, res) => {
  const data = await productModel.find({});
  res.send(JSON.stringify(data));
});

//Payment Gateway

console.log(process.env.STRIPE_SECRET_KEY);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
app.post("/checkout-payment", async (req, res) => {
  // console.log(req.body);

  // res.send({message : "payment gateway", success : true});

  try {
    const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ['card'],
      // billing_address_collection: "auto",
      billing_address_collection: "required",
      // shipping_options: [{ shipping_rate: "shr_1PCfe5SAYZBZ2LKhtf77NvfI" }],
      line_items: req.body.map((item) => {
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: item.name,
              // images : [item.image]
            },
            unit_amount: item.price * 100,
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: item.qty
        }
      }),

      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`
    }

    const session = await stripe.checkout.sessions.create(params);
    // console.log(session);
    res.status(200).json(session.id);
  }
  catch (err) {
    res.status(err.statusCode || 500).json(err.message);
  }
});

app.listen(PORT, () => console.log("Server is running at port : " + PORT));
