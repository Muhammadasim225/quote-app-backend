import dotenv from 'dotenv';
dotenv.config(); // MUST be at the top before accessing process.env

import { connect } from "mongoose";

console.log("MONGOD_URI:", process.env.MONGOD_URI); // Should now show the actual URI

const conn = connect(process.env.MONGOD_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.log("Error connecting MongoDB", err);
  });

export default conn;
