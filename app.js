const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const axios = require('axios')
// const welcomeRoutes = require('./welcome'); // Import the routes from welcome.js
require('dotenv').config()
const { sendMessage, getTextMessageInput } = require("./messageHelper");

const app = express()

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')
// app.use('/welcome', welcomeRoutes); // Use the welcome routes

mongoose.connect("mongodb://localhost:27017/reminder_db")

const customerSchema = new mongoose.Schema({
    name: String,
    email: String,
    policy_expiry_date: Date
})

const Customer = mongoose.model("Customer", customerSchema)

app.get("/", function(req, res) {
    // res.sendFile(__dirname + "/index.html")
    res.render("index")
})

app.post("/", function(req, res) {
    const new_customer = new Customer({
        name: req.body.name,
        email: req.body.email,
        policy_expiry_date: req.body.expiry_date
    });
    new_customer.save(function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("New customer saved successfully.")
        }
    })
})

app.get("/customer-data", function(req, res) {
    Customer.find({}, function(err, customers) {
        if(err) {
            console.log(err);
        } else {
            res.render("customer-data", {customers: customers})
        }
    })
    // res.sendFile(__dirname + "/customer-data.html")
})

app.get("/update", function(req, res) {
    Customer.updateOne({name:"Sam"}, {email:"sam@email.com"}, function(err) {
        if(err) {
            console.log(err);
        } else {
            res.send("Document updated successfully.")
        }
    })
})

app.get("/delete", function(req, res) {
    Customer.deleteOne({name:"Sahil Mhatre"}, function(err) {
        if(err) {
            console.log(err);
        } else {
            res.send("Entry deleted successfully.")
        }
    })
})

app.get("/send-message", function(req, res) {
    var apiUrl = 'http://localhost:3000/message'
    axios.post(apiUrl, {}).then((res) => {
        console.log("Welcome API called successfully")
    }).catch((err) => {
        console.log("Error while calling welcome API", err)
    })
})

app.post('/message', async function(req, res, next) {
    var data = getTextMessageInput(process.env.RECIPIENT_WAID, 'Welcome to the Movie Ticket Demo App for Node.js!');
    console.log("data", data)
    // sendMessage(data)
    //   .then(function (response) {
    //   //   res.redirect('/catalog');
    //     console.log("Message sent successfully")
    //     return;
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //     return;
    //   });

    const apiUrl = `https://graph.facebook.com/${process.env.VERSION}/${process.env.PHONE_NUMBER_ID}/messages`;
  try {
    const response = await axios.post(apiUrl, data, {
      headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    const result = response.data
    console.log("Result", result)
    return res.status(200).json(result)
  } catch (error) {
    console.log("Error >>", error);
  }
  });


app.listen(3000, function() {
    console.log("Server started on port 3000")
})