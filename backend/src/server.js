import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimit from "./middleware/rateLimiter.js";
import cors from "cors"
import path from 'path'

dotenv.config();

console.log(process.env.MONGO_URI);  
const app = express();
const PORT = process.env.PORT || 5001;   
const __dirname =path.resolve()

connectDB();

//middleware can be used for auth check and rate limiting!!

if(process.env.NODE_ENV !== "production"){

    app.use(cors({
        origin:"http://localhost:5173",
    })); 
    
}

app.use(express.json());
app.use(rateLimit)

app.use((req, res, next) => {
    console.log(`req method is ${req.method}& req URL is ${req.url}`);
    next();
})

app.use("/notes", notesRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

    app.get("*",(req, res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
});

}

app.listen(5001, () => {
    console.log("!! server is live !!");
});
