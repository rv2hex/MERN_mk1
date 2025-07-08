import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimit from "./middleware/rateLimiter.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables
dotenv.config();

// ESM-compatible __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5001;

// Connect to MongoDB
connectDB();

// CORS configuration
if (process.env.NODE_ENV !== "production") {
    app.use(cors({
        origin: "http://localhost:5173",
    }));
} else {
    app.use(cors({
        origin: "https://yourdomain.com", // 🔁 Replace with your frontend production domain
    }));
}

// Middleware
app.use(express.json());           // Parse JSON bodies
app.use(rateLimit);                // Rate limiting
app.use((req, res, next) => {      // Request logger
    console.log(`req method is ${req.method} & req URL is ${req.url}`);
    next();
});

// API Routes
app.use("/notes", notesRoutes);

// Serve static frontend in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
    });
}

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
