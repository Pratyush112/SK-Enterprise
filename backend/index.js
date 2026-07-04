import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import connectDB from "./db/db.js";
import productRouter from "./routers/product.router.js";
import partRouter from "./routers/part.router.js";
import contactRouter from "./routers/contact.router.js";
import sitemapRouter from "./routers/sitemap.router.js";

dotenv.config();
const app = express();

connectDB();

// Security Middleware: HTTP Headers
app.use(helmet());

// Security Middleware: CORS Origin Restriction
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(",") 
  : ["https://www.skenterprisesluicegate.com", "http://localhost:5173", "http://localhost:3000"];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests in dev)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// Body parser with size limits to prevent DoS
app.use(express.json({ limit: "10kb" }));

// Security Middleware: Global Rate Limiting
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { error: "Too many requests from this IP, please try again after 15 minutes" },
  standardHeaders: true,
  legacyHeaders: false
});
app.use(globalLimiter);

// Stricter Rate Limiting for Contact Form
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // limit each IP to 10 contact submissions per hour
  message: { error: "Too many contact inquiries from this IP, please try again later" }
});

const port = process.env.PORT || 4502;

app.get("/", (req, res) => {
  res.send("SK Enterprise API Server Running");
});

app.use("/products", productRouter);
app.use("/parts", partRouter);
app.use("/contact", contactLimiter, contactRouter);
app.use("/sitemap.xml", sitemapRouter);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});