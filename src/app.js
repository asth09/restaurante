import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from './routes/auth.routes.js';
import mesaRoutes from './routes/mesas.routes.js';
import menuRoutes from './routes/menus.routes.js';
import pedidoRoutes from './routes/pedido.routes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", mesaRoutes);
app.use("/api", menuRoutes);
app.use("/api", pedidoRoutes);


export default app;