import express from "express";
import "dotenv/config";
import cors from "cors";
import dbconnect from "./config/db.js";
import foodRouter from "./routes/food.route.js";

const app = express();

const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

dbconnect();

app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("API IS WORKING");
});

app.listen(port, () => {
  console.log(`Server is live on http://localhost:${port}`);
});
