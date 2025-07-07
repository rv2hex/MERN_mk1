import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimit from "./middleware/rateLimiter.js";
import cors from "cors"

dotenv.config();

console.log(process.env.MONGO_URI);  
const app = express();
const PORT = process.env.PORT || 5001;   


connectDB();

//middleware can be used for auth check and rate limiting!!
app.use(cors({
    origin:"http://localhost:5173",
})); 
app.use(express.json());
app.use(rateLimit)

app.use((req, res, next) => {
    console.log(`req method is ${req.method}& req URL is ${req.url}`);
    next();
})

app.use("/notes", notesRoutes);

app.listen(5001, () => {
    console.log("!! server is live !!");
});



//mongodb+srv://rv2xx699:QV8NCyTlVL7IBOYh@negacluster.dnvdhdc.mongodb.net/?retryWrites=true&w=majority&appName=NegaCluster