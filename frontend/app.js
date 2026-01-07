async function api(path, options = {}) {
    const res = await fetch(path, {
        headers: { "Content-Type": "application/json" },
        ...options,
    });
    const txt = await res.text();
    try { return { ok: res.ok, data: JSON.parse(txt) }; }
    catch { return { ok: res.ok, data: txt }; }
}

const btnTest = document.getElementById("btnTest");
if (btnTest) {
    btnTest.onclick = async () => {
        const out = document.getElementById("out");
        out.textContent = "Mengirim request...";
        const r = await api("/api/test", { method: "POST", body: JSON.stringify({ source: "access-test" }) });
        out.textContent = JSON.stringify(r.data, null, 2);
    };
}

const btnLogin = document.getElementById("btnLogin");
if (btnLogin) {
    btnLogin.onclick = async () => {
        const out = document.getElementById("out");
        const u = document.getElementById("u").value;
        const p = document.getElementById("p").value;
        out.textContent = "Login...";
        const r = await api("/api/login", { method: "POST", body: JSON.stringify({ username: u, password: p }) });
        out.textContent = JSON.stringify(r.data, null, 2);
        if (r.ok && r.data && r.data.token) {
            localStorage.setItem("token", r.data.token);
            window.location.href = "/admin-dashboard.html";
        }
    };
}

const btnRefresh = document.getElementById("btnRefresh");
if (btnRefresh) {
    btnRefresh.onclick = async () => {
        const logs = document.getElementById("logs");
        const token = localStorage.getItem("token") || "";
        logs.textContent = "Mengambil logs...";
        const res = await fetch("/api/logs", { headers: { "Authorization": `Bearer ${token}` } });
        const data = await res.json();
        logs.textContent = JSON.stringify(data, null, 2);
    };
    // auto refresh once
    btnRefresh.click();
}
