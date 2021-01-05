const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const industri = require("./routes/industri")
const transaksi = require("./routes/transaksi");
const user = require("./routes/user");


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/more", { useUnifiedTopology: true, useNewUrlParser: true,})
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
  
app.use(cors());
app.use('/industri', industri);
app.use('/transaksi', transaksi);
app.use('/user', user);

const port = process.env.PORT || 2000;
app.listen(port, () => {
  console.log(`app running on ${port}`)
})
