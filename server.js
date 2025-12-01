import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";

const app = express();
app.use(cors());
app.use(express.json());

// LIMITADOR DE SEGURIDAD
app.use(rateLimit({
    windowMs: 1000, // 1 segundo
    max: 5,         // máximo 5 peticiones por segundo
}));

// ===== RUTA DE PRUEBA =====
app.get("/", (req, res) => {
    res.json({ ok: true, msg: "Servidor AladinBot funcionando 🔥" });
});

// ===== BINANCE TICKER =====
app.get("/binance/:symbol", async (req, res) => {
    try {
        const symbol = req.params.symbol.toUpperCase();
        const url = `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`;
        const r = await fetch(url);
        const data = await r.json();
        res.json(data);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// ===== MEXC TICKER =====
app.get("/mexc/:symbol", async (req, res) => {
    try {
        const symbol = req.params.symbol.toUpperCase();
        const url = `https://api.mexc.com/api/v3/ticker/price?symbol=${symbol}`;
        const r = await fetch(url);
        const data = await r.json();
        res.json(data);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("🔥 Servidor AladinBot ONLINE en el puerto " + PORT));
