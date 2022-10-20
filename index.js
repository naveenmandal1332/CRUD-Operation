const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./product");

// MongoDB Connection:
dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Db connected!");
  })
  .catch((err) => {
    console.log(err);
  });

//CRUD---> Operation:

//POST:
app.use(express.json());
app.post("/create", async (req, res) => {
  let data = new Product(req.body);
  let result = await data.save();
  res.send(result);
});

//GET
app.get("/list", async (req, res) => {
  let data = await Product.find();
  res.send(data);
});

//DELETE
app.delete("/delete/:_id", async (req, res) => {
  let data = await Product.deleteOne(req.params);
  res.send(data);
});

//UPDATE:
app.put("/updates/:_id", async (req, res) => {
  let data = await Product.updateOne(req.params, {
    $set: req.body
  });
  res.send(data);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("backend server is running");
});