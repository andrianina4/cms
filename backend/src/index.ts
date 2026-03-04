import express, { Request, Response } from "express";
import { config } from "./config";
import articleRoutes from "./routes/article.routes";

const app = express();
const PORT = config.port;

app.use(express.json());

app.use("/api/articles", articleRoutes);

app.get("/health", (_req: Request, res: Response) => {
    res.json({ status: "ok" });
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur 0.0.0.0:${PORT}`);
});
