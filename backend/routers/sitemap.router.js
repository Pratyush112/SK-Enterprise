import express from "express";
import { SitemapStream, streamToPromise } from "sitemap";
import Product from "../models/product.model.js";
import Part from "../models/part.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const smStream = new SitemapStream({ hostname: "https://www.skenterprize.com" });

    // Static pages
    smStream.write({ url: "/", changefreq: "weekly", priority: 1.0 });
    smStream.write({ url: "/about", changefreq: "monthly", priority: 0.7 });
    smStream.write({ url: "/contactus", changefreq: "monthly", priority: 0.7 });
    smStream.write({ url: "/products", changefreq: "weekly", priority: 0.8 });
    smStream.write({ url: "/parts", changefreq: "weekly", priority: 0.8 });

    // Fetch dynamic products
    const products = await Product.find({});
    products.forEach((product) => {
      smStream.write({ url: `/products/${product._id}`, changefreq: "monthly", priority: 0.8 });
    });

    // Fetch dynamic parts
    const parts = await Part.find({});
    parts.forEach((part) => {
      smStream.write({ url: `/parts/${part._id}`, changefreq: "monthly", priority: 0.8 });
    });

    smStream.end();

    const sitemapOutput = (await streamToPromise(smStream)).toString();
    res.header("Content-Type", "application/xml");
    res.send(sitemapOutput);
  } catch (error) {
    console.error("Error generating sitemap:", error);
    res.status(500).end();
  }
});

export default router;
