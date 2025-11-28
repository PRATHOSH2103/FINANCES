const express = require("express");

const dataschema = require("./schema")

const cors = require("cors");

const dotenv = require("dotenv");

dotenv.config();

const mongoose = require("mongoose");

const app = express();

app.use(cors());

app.use(express.json());

mongoose.connect(process.env.DB)
    .then(() => {
        console.log("DB is connected successfull...!");

    })
    .catch(() => {
        console.log("DB Isn't connected");

    })


app.get("/readData", async (req, res) => {

    let getData = await dataschema.find();
    res.json(getData)

})

app.post("/postData", async (req, res) => {

    try {
          const createData = new dataschema({
           ...req.body,
      })

      let saveData = await createData.save();
      res.json({msg:"Msg Send Successfully", saveData})
        
    } catch (error) {
        
        res.json(error);
    }
        
        
});



app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);

})