import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import { config } from "./config";
import articleRoutes from "./routes/article.routes";
import categoryRoutes from "./routes/category.routes";
import networkRoutes from "./routes/network.routes";
import importRoutes from "./routes/import.routes";
import notificationRoutes from "./routes/notification.routes";

const app = express();
const PORT = config.port;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/articles", articleRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/networks", networkRoutes);
app.use("/api/import", importRoutes);
app.use("/api/notifications", notificationRoutes);

app.get("/health", (_req: Request, res: Response) => {
    res.json({ status: "ok" });
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur 0.0.0.0:${PORT}`);
});
