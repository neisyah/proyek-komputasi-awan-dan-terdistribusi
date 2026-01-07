const express = require("express");
const app = express();

app.use(express.json());

// ==== SIMPLE AUTH (demo) ====
const ADMIN_USER = "admin";
const ADMIN_PASS = "admin123";
const DEMO_TOKEN = "demo-token-123";

// ==== SIMPLE LOG STORAGE (in-memory) ====
const logs = [];

function addLog(entry) {
    logs.unshift(entry);
    // batasi 200 log biar tidak kebanyakan
    if (logs.length > 200) logs.pop();
}

// Health check
app.get("/health", (req, res) => res.json({ ok: true, service: "studentaccess-hub-api" }));

// Test access endpoint
app.post("/api/test", (req, res) => {
    const start = Date.now();
    // simulasi proses ringan
    const processMs = Math.floor(Math.random() * 50) + 10;

    setTimeout(() => {
        const ms = Date.now() - start;
        const entry = {
            time: new Date().toISOString(),
            path: "/api/test",
            status: 200,
            responseMs: ms,
            source: (req.body && req.body.source) || "unknown",
            containerHint: process.env.HOSTNAME || "unknown-container"
        };
        addLog(entry);
        res.json({ message: "OK", responseMs: ms, servedBy: entry.containerHint });
    }, processMs);
});

// Admin login
app.post("/api/login", (req, res) => {
    const { username, password } = req.body || {};
    if (username === ADMIN_USER && password === ADMIN_PASS) {
        addLog({ time: new Date().toISOString(), path: "/api/login", status: 200, responseMs: 1, source: "admin", containerHint: process.env.HOSTNAME });
        return res.json({ ok: true, token: DEMO_TOKEN });
    }
    addLog({ time: new Date().toISOString(), path: "/api/login", status: 401, responseMs: 1, source: "admin-fail", containerHint: process.env.HOSTNAME });
    return res.status(401).json({ ok: false, message: "Invalid credentials" });
});

// Auth middleware for admin endpoints
function requireAuth(req, res, next) {
    const h = req.headers.authorization || "";
    if (h === `Bearer ${DEMO_TOKEN}`) return next();
    return res.status(401).json({ ok: false, message: "Unauthorized" });
}

// Get logs (admin)
app.get("/api/logs", requireAuth, (req, res) => {
    res.json({ total: logs.length, logs: logs.slice(0, 50) });
});

// Export CSV (admin but dibuat public untuk demo mudah; kalau mau stricter, tambahkan requireAuth)
app.get("/api/export", (req, res) => {
    const header = "time,path,status,responseMs,source,servedBy\n";
    const rows = logs.map(l => `${l.time},${l.path},${l.status},${l.responseMs},${l.source},${l.containerHint}`).join("\n");
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=studentaccess_logs.csv");
    res.send(header + rows);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));
