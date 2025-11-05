// import express from "express";
// import dotenv from "dotenv";
// import { connectDB } from "./lib/db.js";
// import cookieParser from "cookie-parser";

// import authRoutes from "./routes/auth.route.js";
// import userRoutes from "./routes/user.route.js";
// import chatRoutes from "./routes/chat.route.js";
// import cors from "cors";
// import path from "path";
// dotenv.config();
// const app = express()
// const PORT = process.env.PORT;

// const __dirname = path.resolve();

// app.use('/api/auth', authRoutes);
// // app.use(cors({
// //     origin: "http:/localhost:5173",
// //     credentials: true   // allow send cookies
// // }));
// // app.use(cors({
// //     origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
// //     methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
// //     // "Access-Control-Allow-Credentials": true,
// //     credentials: true
// // }));
// // app.use((req, res, next) => {
// //     res.header("Access-Control-Allow-Credentials", "true");
// //     next();
// // });

// // ✅ FIX CORS HERE
// // === 1. CORS & Middleware Setup FIRST ===
// const allowedOrigins = ["http://localhost:5173", "http://127.0.0.1:5173"];

// app.use(
//     cors({
//         origin: (origin, callback) => {
//             // Allow requests with no origin (like mobile apps or curl)
//             if (!origin || allowedOrigins.includes(origin)) {
//                 callback(null, true);
//             } else {
//                 callback(new Error("Not allowed by CORS"));
//             }
//         },
//         credentials: true, // ← THIS IS CRITICAL
//         methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//         allowedHeaders: ["Content-Type", "Authorization"],
//     })
// );
// // app.use(express.json());
// // app.options('*', cors());
// // app.use(cookieParser());
// app.options("*", cors());
// app.use(express.json());
// app.use(cookieParser());

// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/chat", chatRoutes);


// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname, "../frontend/dist")));

//     app.get("*", (req, res) => {
//         res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
//     });
// }

// app.listen(PORT, () => {
//     console.log(`Server is running on this port ${PORT} `);
//     connectDB();
// })



import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

// === 1. CORS FIRST ===
const allowedOrigins = ["http://localhost:5173", "http://127.0.0.1:5173"];

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true, // This sends Access-Control-Allow-Credentials: true
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// === 2. Body & Cookie Parsers ===
app.use(express.json());
app.use(cookieParser());

// === 3. NOW define routes ===
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

// === 4. Production static files ===
if (process.env.NODE_ENV === "production") {
    const frontendPath = path.join(__dirname, "../frontend/dist");
    app.use(express.static(frontendPath));

    app.get("*", (req, res) => {
        res.sendFile(path.join(frontendPath, "index.html"));
    });
}

// === 5. Start server ===
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDB();
});