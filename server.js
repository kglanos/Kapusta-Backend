const app = require('./app')

const mongoose = require("mongoose");
const DB_URL = process.env.DB_HOST;
const PORT = process.env.PORT

const dbConnection = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("Database connection successful");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
dbConnection();



app.listen(PORT, () => {
  console.log("Server running. Use our API on port: 3000")
})