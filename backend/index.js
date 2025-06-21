import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/db.js";
import productRouter from "./routers/product.router.js";
import partRouter from "./routers/part.router.js";
import contactRouter from "./routers/contact.router.js";


dotenv.config();
const app = express();
connectDB();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 4502;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/products", productRouter);
app.use("/parts", partRouter);
app.use("/contact", contactRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});