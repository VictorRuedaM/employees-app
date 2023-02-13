import express from "express";
import morgan from "morgan";
import { routes } from "./routes/index.routes.js";

export const app = express();

// Settings
app.use(express.json());
app.use(morgan('dev'));


// Routes
routes(app);
