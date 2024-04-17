const express = require('express');
const app = express();
const cors=require("cors");
const mongoose=require('mongoose')
const uri = "mongodb+srv://chibhiraj:Chibhiraj@mydb.uzc7ogf.mongodb.net/userdb"
const port = 3001;

app.use(cors());
app.use(express.json());


mongoose.connect( uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const dbConn = mongoose.connection;

dbConn.on("error" , console.error.bind(console, "Connection Error"));
dbConn.on("open", function(){
  console.log("DB Connection succesful");
})

var userSchema=mongoose.Schema({
  ml:String,
  ps:String
});

const user=mongoose.model("user",userSchema);

app.post('/', async (req, res) => {
  console.log("enter");
  try {
    const { ml, ps } = req.body;
    const newUser = new user({ ml, ps });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port , () => console.log(`Example app listening on port ${port}!`));













