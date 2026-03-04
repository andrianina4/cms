import express, { Request, Response } from "express";

const app = express();
const PORT = 8080;

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
    res.json({
        message: "🚀 Backend Express opérationnel !",
        port: PORT,
        timestamp: new Date().toISOString(),
    });
});

app.get("/health", (_req: Request, res: Response) => {
    res.json({ status: "ok" });
});

app.listen(PORT, () => {
    console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});
