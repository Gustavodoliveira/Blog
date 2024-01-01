import "dotenv/config"
import express from 'express';
import dBConnect from "./db/dbConnect";

const url = 'mongodb://127.0.0.1:27017/blog'

const connect = new dBConnect(url)



const app = express();

app.listen(process.env.PORT, () => {
  connect.Connect();
  console.log('SERVER START')
});
